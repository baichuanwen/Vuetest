<template>
  <div class="animated fadeIn">
    <div class="knowledge-my">
      <div class="main1">
        <div class="header clearfix">
          <div class="header-item">
            <span>知识分类：</span>
            <Input type="text" style="width: 180px" readonly  @on-focus="createChooseTypeModal()"  v-model="categroyName" placeholder="请选择分类"/>
          </div>
          <div class="header-item pl20">
            <span>标题：</span>
            <div class="searchBox">
              <Input v-model="title" icon="ios-search" placeholder="请输入关键字" @click.native="getKnowList()" @keyup.native.enter="getKnowList()"></Input>
            </div>
          </div>
        </div>
        <div class="list clearfix" v-if="knowledges.length>0">

          <table class="gcb-table gcb-table-hover gcb-table-striped">
            <thead>
              <tr>
                <th>知识标题</th>
                <th>知识分类</th>
                <th>可见范围</th>
                <th>更新时间</th>
                <th class="text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(knowledge,index) in knowledges " >
                <td @click="pageToDetail(knowledge.id)"><div>{{knowledge.title}}</div></td>
                <td  @click="pageToDetail(knowledge.id)">{{knowledge.mainCategoryName||"--"}}<span v-if="knowledge.knowledgeCategoryName">—{{knowledge.knowledgeCategoryName}}</span></td>
                <td @click="pageToDetail(knowledge.id)"><div><span v-if="knowledge.viewNumber>0">{{knowledge.viewNumber}}</span><span v-if="!(knowledge.viewNumber>0)">全体人员</span></div></td>
                <td  @click="pageToDetail(knowledge.id)"><div>{{knowledge.updateTime | parseTime}}</div></td>
                <td class="text-center"><span class="borderLeft">
                  <span class="text-primary" @click="pageTransition(knowledge.id)">编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="text-danger" @click="createDeleteKnowledgeModal(knowledge.id)">删除</span></span>
                </td>
              </tr>
            </tbody>
          </table>
          <Page class="gcb-page" :total="total" :current="pagesInfo.page" @on-change="changePage" show-total show-elevator ></Page>
        </div>
      </div>
      <div class="gcb-data-null" v-if="knowledges.length ==0||!knowledges">
        <div class="data-null text-center">
          <img src="./images/data-null.png" alt="">
          <p>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import knowledge from './module'
  import {
    storage
  } from '@/libs/tools'
  export default {
    name: 'knowledge-my',
    data() {
        return {
            categroyName:'',
            title:null,
            chosenTypeId:'',
            knowledges:[],
            subParams :{
              page:null,
              title:null,
              pageSize:null,
              knowledgeCategoryId:null,
              mainCategoryId:null,
            },
            pagesInfo:{
              page: 1,
              pageSize: 10,
            },
            chosenTypes:[],
            total:0,
        }
    },
    computed:{},
    methods: {
      async getKnowList() {
        let self=this;
        self.subParams.title=self.title;
        self.subParams.page=self.pagesInfo.page;
        self.subParams.pageSize=self.pagesInfo.pageSize;
        let result= await knowledge.api.myKnowledgeList(this.subParams);
        result.records.forEach(function(knowledge, index) {
            knowledge.updateTime = new Date(knowledge.updateTime);
        });
        self.knowledges=result.records;
        self.total=result.total;
      },
      //获取知识分类
      async createDeleteKnowledgeModal(id){
          await this.$gcb.gcbModal.open({
              title:"提示",
              content:"确定删除吗？ 删除后不可恢复",
              subMessage:"删除后不可恢复",
              icon:"danger",
          })
          await knowledge.api.deleteKnowledge({id:id});
          await this.getKnowList();
      },
      // 选择类型
      async createChooseTypeModal() {
         this.chosenTypes= await knowledge.api.classifyList({});
          this.showTypes = await this.$gcb.gcbKnowledgeType.open({datas: this.chosenTypes,knowledgeCategoryId:this.chosenTypeId});
          if(!this.showTypes.length){
            this.categroyName="";
            this.chosenTypeId=null;
            return;
          }
          this.showTypes.forEach(element => {
            if(element.isChild){
              this.subParams.knowledgeCategoryId=element.id;
              this.subParams.mainCategoryId=null;
            }else{
              this.subParams.mainCategoryId=element.id;
              this.subParams.knowledgeCategoryId=null;
            }
            this.chosenTypeId=element.id;
            this.categroyName =element.categroyName;
          });
          this.getKnowList();
      },
      pageToDetail(id){
        this.$router.push({name:"knowledgeDetail",params:{id:id}})
      },
      pageTransition(id){
         this.$router.push({name:"knowledgeEdit",params:{id:id}})
      },
      //获取session数据
      getSessionData(){
        // todo
        let session=JSON.parse(sessionStorage.getItem("myKnowledgeParams"));
        if (session&&session.pagesInfo) {
          this.categroyName = session.categroyName;
          this.chosenTypeId = session.chosenTypeId||null;
          this.subParams.mainCategoryId=session.mainCategoryId||null,
          this.subParams.knowledgeCategoryId=session.knowledgeCategoryId||null,
          this.title = session.title;
          this.pagesInfo = session.pagesInfo || null;
        } else {
          // 分类
          this.pagesInfo = {
            pageSize: 10,
            page: 1
          };
        }
      },
      //分页
      changePage(value) {
        this.pagesInfo.page=value;
        this.getKnowList()
      },
      // 显示隐藏知识分类
      toggleShowMore() {
        this.showMore = this.showMore == false ? true : false;
        if (!this.showMore) {
          this.knowledgeClassifys = this.knowledgeClassify.slice(0, 3);
        } else if (this.showMore) {
          this.knowledgeClassifys = this.knowledgeClassify;
        }
      },
      //分页
      changePage(value) {
        this.pagesInfo.page=value;
        this.getKnowList()
      },
      knowledgeDetail(id) {
        this.$router.push({name:'knowledgeDetail', params:{id:id}})
      },
      saveParms() {
        let self =this;
        var p = {
            chosenTypeId: self.chosenTypeId,
            knowledgeCategoryId:self.subParams.knowledgeCategoryId,
            mainCategoryId:self.subParams.mainCategoryId,
            categroyName: self.categroyName,
            title: self.title,
            pagesInfo: self.pagesInfo,
        };
        //todo
        sessionStorage.setItem("myKnowledgeParams", JSON.stringify(p));
      }
    },
    beforeRouteLeave (to, from, next) {
      this.saveParms();
      next();
    },
    mounted: function() {
      this.getSessionData();
      this.getKnowList();
    },
  }
</script>
<style lang="less" scoped>
  .gcb-page {
    margin-top: 20px;
    text-align: center;
    padding-bottom: 20px;
  }
  .container-fluid{
    padding-bottom: 150px;
  }
  .knowledge-my {
    .main1 {
      width: 100%;
      padding: 15px 0 0 20px;
      background-color: #fff;
    }
    .header-item span {
      margin-right: 5px;
    }
    .header {
      height: 34px;
    }
    .header-item {
      display: inline-block;
    }
    .searchBox {
      position: relative;
      display: inline-block;
    }
    .point {
      cursor: pointer;
    }
    .pl20 {
      padding-left: 20px;
    }
    .cursorDefault {
      cursor: default;
    }
    .list {
      width: 100%;
      background-color: #fff;
      padding-top: 40px;
    }
    .gcb-table thead tr th,
    .gcb-table tbody tr td {
      padding: 8px 5px 8px 30px;
      border-top: 1px solid #ddd;
    }
    .borderLeft {
      border-left: 1px solid #ddd;
      width: 100%;
      display: inline-block;
    }
  }
</style>
