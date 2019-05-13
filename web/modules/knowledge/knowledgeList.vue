<template>
  <div class="animated fadeIn">
    <div class="knowledge-list">
      <div class="header">
        <div class="line clearfix" v-for=" (item,index) in knowledgeClassifys ">
            <span>
                <div class="title">{{item.categroyName}}：</div>
                <div class="ceils" style="height: 50px;">
                    <div class="ceil point" :class="{'checked':chosenClassifyIds.indexOf(v.id)>=0}" @click="chooseClassifys(v,item)" v-for="v in item.childs">{{v.categroyName}}</div>
                </div>
            </span>
        </div>
        <div class="text-primary down" v-if="!showMore&&toggleButton" @click="toggleShowMore()">展开&nbsp;<i class="fa fa-angle-down"></i></div>
        <div class="text-primary down" v-if="showMore&&toggleButton" @click="toggleShowMore()">收起&nbsp;<i class="fa fa-angle-up"></i></div>
      </div>
      <div class="middle" v-if="chosenClassify.length>0">
        <div class="line clearfix">
          <div class="title">筛选条件：</div>
          <div class="ceils">
            <div class="ceil" v-for="(chosen,index) in chosenClassify">{{chosen.categroyName}}&nbsp;&nbsp;<i class="fa fa-close colReb point" @click="removeClassify(chosen)"></i></div>
          </div>
        </div>
      </div>
      <div class="main1" v-if="knowDetails.records.length>0">
        <div class="item point" :class='{"noborder": index==knowDetails.records.length-1 }' v-for="(record,index) in knowDetails.records" @click="knowledgeDetail(record.id)" >
          <div class="title">
            {{record.title}}
          </div>
          <div class="content">{{record.content}}</div>
          <div class="footer clearfix">
            <div class="editor">编辑人：<span style="color: #333;">{{record.employeeName}}</span></div>
            <div class="time">发布时间：{{record.createTime}}</div>
          </div>
        </div>
      </div>
      <br>
      <Page class="gcb-page"   :total="total" :current="pagesInfo.page" @on-change="changePage" show-total show-elevator ></Page>
      <div v-if="knowDetails.records.length==0" class="gcb-data-null">
        <img src="../../../static/img/data-null.png" alt="">
        <p>暂无数据</p>
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
    name: 'knowledge-list',
    data() {
      return {
        // 知识分类
        knowledgeClassifys:[],
        knowledgeClassify:[],
        toggleButton:true,
        showMore:true,
        pagesInfo:{
          page: 1,
          pageSize: 10,

        },
        subParams:{
          page: null,
          pageSize: null,
          mainId: null,
          ids: null,

        },
        knowDetails:{
          records:[],
          total:0
        },
        chosenClassify:[],
        chosenClassifyIds:[],
        //fenye
        total:0,

      }
    },
    computed:{},
    methods: {
      async getKnowList() {
        let self=this;
        self.subParams.page=self.pagesInfo.page;
        self.subParams.pageSize=self.pagesInfo.pageSize;
        let result= await knowledge.api.knowledgeList(this.subParams);
        result.records.forEach(function(kitem, index) {
          kitem.content = kitem.content.replace(/<[^>]+>/g, '');
          kitem.content = kitem.content.replace(/&nbsp;/g, '');
        });
        self.knowDetails = result;
        self.total=result.total;
      },
      //获取知识分类
      async getClassifyList(){
        let result= await knowledge.api.classifyList({});
        result = result.length > 0 ? result : [];
        result.forEach(function(r) {
          r.childs = r.childs || [];
          r.childs.forEach(function(value) {
            value.checked = false;
          })
        });
        this.knowledgeClassify=result;
        if (this.knowledgeClassify.length <= 3) {
          this.toggleButton = false;
        }
        this.showMore = false;
        this.knowledgeClassifys = this.knowledgeClassify.slice(0, 3);

      },
      //获取session数据
      getSessionData(){
        // todo
        let session= JSON.parse(sessionStorage.getItem("knowListParams"))
        if (session&&session.pagesInfo) {
          this.chosenClassify = session.chosenClassify;
          this.chosenClassifyIds = session.chosenClassifyIds;
          this.pagesInfo = session.pagesInfo;
          this.subParams.mainId = session.mainId || null;
          this.subParams.ids = session.ids || null;
        } else {
          // 分类
          this.chosenClassify = [];
          this.chosenClassifyIds = [];
          this.pagesInfo = {
              pageSize: 10,
              page: 1
          };
          this.subParams.mainId = null;
          this.subParams.ids = null;
        }
      },
      // 选择分类
      chooseClassifys(child, parent){
        this.chosenClassify = [];
        this.chosenClassifyIds = [];
        this.chosenClassify.push(parent);
        this.chosenClassify.push(child);
        this.chosenClassify=this.chosenClassify.slice(0,2)
        this.chosenClassifyIds.push(parent.id);
        this.chosenClassifyIds.push(child.id);
        this.pagesInfo.page=1;
        this.subParams.ids = [child.id];
        this.subParams.mainId = parent.id || null;
        this.getKnowList(this.subParams);

      },
      //移除分类
      removeClassify(item) {
        if (item.childs === undefined) {
          this.subParams.ids = null;
        } else {
          this.subParams.mainId = null;
        }
        var index;
        for (var i = 0; i < this.chosenClassify.length; i++) {
          if (item == this.chosenClassify[i]) {
            index = i;
          }
        }
        this.chosenClassify.splice(index, 1);
        this.chosenClassifyIds.splice(index, 1);
        this.pagesInfo.page = 1;
        this.getKnowList();
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
          chosenClassify: self.chosenClassify,
          chosenClassifyIds: self.chosenClassifyIds,
          pagesInfo: self.pagesInfo,
          mainId:self.subParams.mainId,
          ids: self.subParams.ids
        };
        //todo
        sessionStorage.setItem("knowListParams",JSON.stringify(p));

      }
    },
    beforeRouteLeave (to, from, next) {
      this.saveParms();
      next();
    },
    mounted: function() {
      this.getSessionData();
      this.getClassifyList({});
      this.getKnowList();

    },

  }
</script>
<style lang="less">
  .container-fluid{
    padding-bottom: 150px;
  }
  .knowledge-list{
    padding-bottom: 150px;
    .colReb{
      color: red;
    }
    .point{
      cursor: pointer;
    }
    /*头部*/
    .header{
      background-color: #fff;
      margin-top:10px;
      padding:30px 80px 10px 20px;
      position: relative;
      min-height: 190px;
    }
    .line .title{
      float: left;
      height: 100%;
      line-height: 30px;
      font-size: 16px;
    }
    .line .ceils{
      overflow: hidden;
    }
    .line .ceil{
      float: left;
      background-color: #F8F8F8;
      color: #666;
      padding:0 10px;
      border-radius: 30px;
      height: 30px;
      line-height: 30px;
      margin-left:20px;
      margin-bottom:20px;
    }
    .line .ceil:hover{
      background-color: #F0F8FF;
    }

    .down{
      position: absolute;
      right:20px;
      bottom:40px;
      cursor: pointer;
      color: #248bfe!important;
    }
    .line .checked{
      color: #248BFE;
    }
    /*中间*/
    .middle{
      background-color: #fff;
      margin-top:10px;
      padding:20px 20px 0 20px;
    }
    .middle .line .title{
      float: left;
      height: 100%;
      line-height: 30px;
      font-size: 18px;
    }
    .middle .line .ceils{
      overflow: hidden;
    }
    .middle .line .ceil{
      float: left;
      background-color: #f8f8f8;
      color: #666;
      padding:0 10px;
      border-radius: 10px;
      height: 30px;
      line-height: 30px;
      margin-left:20px;
      margin-bottom:20px;
    }
    /*内容*/
    .main1 {
      margin-top: 10px;
      margin-bottom: 20px;
      padding: 0 20px;
      background-color: #fff;

      .item {
        border-bottom: 1px solid #e2e4e8;
        padding: 20px 0;
      }
      .noborder {
        border-bottom: none;
      }
      .item .title {
        font-size: 18px;
      }
      .item .content {
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin: 10px 0;
        max-height: 40px;
      }
      .footer {
        color: #bdc7d2;
        font-size: 14px;
      }
      .footer .editor {
        width: 200px;
        float: left;
      }
      .footer .time {
        float: left;
      }
    }
  }

</style>
