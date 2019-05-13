<template>
    <div  v-show="items.length">
        <div class="items" v-for="(item,$index) in items" @click="showDetail(item.id)"  @mouseover="active = $index" @mouseleave="active = null">
          <div class="icon btn-info" v-show="item.workReportType == 1"><span>日报</span></div>
          <div class="icon btn-success" v-show="item.workReportType == 2"><span>周报</span></div>
          <div class="icon btn-primary" v-show="item.workReportType == 3"><span>月报</span></div>
          <div v-if="isReportList" class="user"><div>{{item.reportDate}}</div></div>
          <div class="user-review" v-else >
            <div>{{item.employeeName}}</div>
            <div>{{item.reportDate}}</div>
          </div>
          <div class="report-content mar-top-20">
            <div class="items-title font-16">{{item.projectName}}</div>
            <div class="items-content">{{item.content}}</div>
            <div class="items-bottom mar-top-20">
              <span class="col-grey">编写时间：{{item.createTime}}</span>
              <label  class="fa fa-thumbs-up text-primary" :class="{'col-grey-unlike':!item.isPraised}"></label><span class="text-primary" @click="like($event,item)">赞 {{item.praiseNum}}</span>
              <label  class="fa fa-commenting-o col-grey"></label><span class="col-grey">评论 {{item.commentNum}}</span>
              <label  class="fa fa-eye col-grey"></label><span class="text-primary" @click.stop="createReadModal(item.id)">浏览 {{item.browseNum}}</span>
              <label  class="fa fa-chain-broken col-grey"></label><span class="col-grey">附件 {{item.attachmentNum}}</span>
              <div class="items-bottom-right" v-show="active == $index&&isReportList">
                <span class="col-grey" @click.stop="edit(item.id)" :class="{'text-them':currentEdit == $index}" @mouseover="currentEdit = $index"  @mouseleave="currentEdit = null">编辑</span>
                <span class="col-grey" @click.stop="deleteItem($event,item.id)">删除</span>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
  import report from '../module';
    export default {
      name: "report-items-list",
      data(){
        return{
          currentEdit:0,
          active:null
        }
      },
      props:{
        items:{
          type :Array,
          required:true,
        },
        isReportList:{
          type:Boolean,
          default:true,
        }

      },
      methods:{
        createReadModal(item){
          let self=this;
          let postData={workReportId: item, employeeNameLike: null}
          report.api.report.browseSearch(postData).then((res)=>{
            this.$gcb.gcbReadRecord.open({datas:res, type: 'report'});
          })
        },
        //点赞
        like($event, item) {
          this.$set(item,"isPraised",!item.isPraised)
          if (item.isPraised) {
            report.api.report.createLike({ workReportId: item.id }).then(()=> {
              item.praiseNum += 1;
            })
          } else {
            report.api.report.cancelLike({workReportId: item.id }).then(()=> {
              item.praiseNum -= 1;
            })
          }
        },
        deleteItem($event,userId) {
          let self=this;
          this.$gcb.gcbModal.open({
            content:"确定删除该条工作汇报吗",
            icon: "danger",
          }).then(()=>{
            report.api.report.deleteReport({ id: userId }).then(function() {
              self.$gcb.tooltip.open({
                message:"删除成功",
              })
              self.$emit("listSearch");
            });
          })
        },
        //编辑
        edit(id) {
          this.$router.push({name:'reportEdit', params:{id:id}})
        },
        // 跳转详情
        showDetail (userId){
          this.$emit("showDetail2",userId)
        }
      },
    }
</script>

<style lang="less" scoped>
  .col-grey{
    color: #939BA4;
  }
  .col-grey-unlike{
    color: #939BA4!important;
  }
  button{
    width: 90px;
  }
  .btn-info {
    background-color: #8c9eff;
    border-color: transparent;
  }
  .mar-top-20 {
    margin-top: 20px;
  }
  /*内容*/
  .main .icon{
    width:50px;
    height:50px;
    border-radius:25px;
    /*background-color: #838EFD;*/
    color: #ffffff;
    font-weight: bolder;
    float: left;
  }
  .main .icon span{
    height: 100%;
    width: 100%;
    display: block;
    text-align: center;
    line-height: 50px;
    /*padding-left: 11px;*/
    font-size: 16px;
  }
  .user{
    height: 50px;
    padding-left:65px;
    div{
      line-height:50px;
      font-size: 20px;
    }
  }
  .items{
    padding: 30px;
    background-color: white;
    border-bottom: 1px solid #f5f5f5;
    &:hover{
      cursor:pointer ;
      background-color: #F1F1F1;
      .user>div{
        color: #0093dd;
      }
    }
    .text-them {
      color: #248bfe;
    }
    .items-title{
      font-size: 16px;
      margin: 5px 0;
    }
    .report-content {
      padding-left: 65px;
    }
    .items-content{
      line-height: 21px;
      max-height: 63px;
      overflow: hidden;
    }
  }
  .user-review{
    height: 50px;
    padding-left: 65px;
    div{
      line-height:25px;
      margin: 2px 0;
      font-size: 20px;
    }
    div:first-child{
      color: #1b56a5;
    }
  }
  .font-16{
    font-size: 16px;
  }
  .items-bottom span{
    /*color: gray;*/
    width: 100px;
    /*line-height:95px;*/
  }
  .items-bottom-left{
    float: left;
    width: 200px;
    margin-top: 30px;
    border-right: 1px solid #f1f1f1;
  }
  .items-bottom-left input:first-child{
    margin-right: 16px;
  }
  .items-bottom label{
    /*color: gray;*/
    padding:0px 16px 0px 30px;
  }
  .items-bottom label:first-of-type{
    padding: 0 16px 0 50px;
  }
  .items-bottom-right{
    float: right;
  }

  .items-bottom-right span{
    padding-right: 20px;
  }
  .items-bottom-right span:last-child {
    padding-right: 20px;
  }
</style>
