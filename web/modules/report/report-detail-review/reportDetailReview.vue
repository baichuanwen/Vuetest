<template>
  <div class="animated fadeIn" ref="reportDetial">
      <div ng-show="isLoadSuccess">
      <div class="header">
        <span class="font-16 pull-left">汇报详情</span>
        <div class="pull-right">
          <Button type="success" class="btn-success" v-show="!item.isAttention && item.isMayAttention" size="large" @click="focus()">关注TA</Button>
          <Button type="error" class="btn-success" v-show="item.isAttention && item.isMayAttention" size="large" @click="focus()">取消关注</Button>
          <Button type="primary" class="btn-width-90" size="large" v-show="!item.isPraised" @click="like()">点赞</Button>
          <Button type="default" class="btn-width-90" style="background-color: rgb(221, 221, 221);" size="large" v-show="item.isPraised" @click="like()">取消点赞</Button>
          <Dropdown trigger="click" size="large" placement="bottom-start" style="margin-left: 20px">
            <Button type="primary">
              导出<Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem><p @click="export1(1)">Word</p></DropdownItem>
              <DropdownItem><p @click="export1(2)">PDF</p></DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button type="default" size="large" @click="goList">返回</Button>
        </div>
      </div>
        <!--内容-->
      <div class="items-box">
        <span class="topicon-day" v-show="item.workReportType == 1"></span>
        <span class="topicon-week" v-show="item.workReportType == 2"></span>
        <span class="topicon-month" v-show="item.workReportType == 3"></span>
        <!--控制按钮-->
        <div class="controls">
          <span class="pre pull-left fa fa-chevron-left" @click="pre()"></span>
          <span class="next pull-right fa fa-chevron-right" @click="next()"></span>
        </div>
        <!--主体-->
        <div class="items">
          <!--头部信息-->
          <div class="top-info">
            <div class="avatar-box">
              <span v-show="!item.headImg">{{lastName}}</span>
              <img error-src :src="avatar" v-show="item.headImg">
            </div>
            <div class="detail-info clearfix">
              <div class="pull-left">
                <p class="font-18">{{item.employeeName}}</p>
                <p class="col-grey">编写时间：{{item.createTime}}</p>
                <p>
                  <span class="fa fa-thumbs-o-up col-grey"></span>
                  <span class="text-primary cursor-pot" @click="createLikeModal(item.id)">谁赞过我 {{item.praiseNum}}</span>
                  <span class="fa fa-eye col-grey mar-lf"></span>
                  <span class="text-primary cursor-pot" @click="createReadModal(item.id)">浏览 {{item.browseNum}}</span>
                </p>
              </div>
              <div class="data-info pull-right">
                <h1 class="pull-left col-grey">{{item.reportDate}}</h1>
                <span class="col-grey">{{ item.week }}</span>
                <span class="col-grey mar-left-5">/{{item.year}}</span>
              </div>
            </div>
          </div>
          <!--汇报内容-->
          <div class="content">
            <div class="content-item">
              <h3 class="font-16">{{item.projectName}}</h3>
            </div>
            <div class="content-item" ng-show="item.plans.length != 0">
              <h3 class="font-16">工作计划</h3>
              <pre>{{item.plans[0]}}</pre>
            </div>
            <div class="content-item" ng-show="item.records.length != 0">
              <h3 class="font-16">工作记录</h3>
              <pre>{{item.records[0]}}</pre>
            </div>
            <div class="content-item" ng-show="item.summaries.length != 0">
              <h3 class="font-16">工作总结</h3>
              <pre>{{item.summaries[0]}}</pre>
            </div>
          </div>
        </div>
        <!--附件-->
        <gcbUploadDetail :attachments="attachments"></gcbUploadDetail>
      </div>
        <!--评阅-->
      <div class="comment">
        <div class="comment-header">
          <h3 class="font-16">评阅&nbsp;</h3>
          <span class="col-grey">共{{totalPage}}条</span>
        </div>
        <!--用户回复-->
        <div class="userInfo clearfix">
          <div class="avatar-box">
            <div class="avatar">
              <span v-if="!userInfo.iconUuid">{{selfLastName}}</span>
              <img error-src :src="buildDownloadUrl(userInfo.iconUuid)" v-if="userInfo.iconUuid">
            </div>
            <p class="text-center mar-top-10">{{userInfo.employeeName}}</p>
          </div>
          <div class="userInfo-text clearfix">
            <textarea class="form-control" placeholder="发表你的看法吧" maxlength="300" v-model="commentContent"></textarea>
            <span class="textNum col-grey pull-right">{{commentContent.length || 0}}/300</span>
          </div>
          <Button  type="primary" class="btn-width-90 pull-right" @click="addComment({page:1})">发表评论</Button>
        </div>
        <!--评论主体-->
        <div class="comment-body" v-show="comments.length">
          <div class="comment-item" v-for="(comment,index) in comments" :key="index" >
            <div class="avatar-box">
              <div class="avatar">
                <span v-show="!comment.employeeHeadImg">{{comment.employeeName.charAt(comment.employeeName.length - 1, 1)}}</span>
                <img error-src :src="buildDownloadUrl(comment.employeeHeadImg)" v-show="comment.employeeHeadImg">
              </div>
            </div>
            <div class="content-box">
              <!--回复父级-->
              <div class="parent-box clearfix">
                <p>{{comment.employeeName}}</p>
                <pre>{{comment.content}}</pre>
                <p class="clearfix">
                  <span class="pull-left col-grey font-12">{{comment.createTime}}</span>
                  <span class="pull-right col-grey font-12 cursor-pot" v-show="comment.employeeId == userInfo.id" @click="deleteParent(comment.id)">删除</span>
                  <span class="pull-right col-grey recover font-12 cursor-pot" @click="showParent(comment.id);parentContent =''">回复</span>
                </p>
                <div class="replyParent mar-top-10 clearfix" v-show="currentParent == comment.id">
                  <div class="clearfix">
                    <textarea class="form-control" maxlength="300" v-model="parentContent" placeholder="回复"></textarea>
                    <span class="font-12 col-grey pull-right">{{parentContent.length|| 0}}/300</span>
                  </div>
                  <p class="pull-right sub-replay">
                    <button class="btn cancel btn-width-90" @click="cancelParent();parentContent=''">取消</button>
                    <Button type="primary" class="btn-width-90 mar-left-5" @click="replyParent(comment.id,comment.employeeId,comment.employeeName,parentContent,index);parentContent = ''">回复</Button>
                  </p>
                </div>
              </div>
              <!--回复子级-->
              <div class="child-box" v-for="(child,iindex) in comment.replies" ng-init="getIcon(child)">
                <div class="child-item">
                  <div class="avatar-box">
                    <div class="avatar">
                      <span v-show="!child.employeeHeadImg">{{child.employeeName.charAt(child.employeeName.length - 1, 1)}}</span>
                      <img error-src :src="buildDownloadUrl(child.employeeHeadImg)" v-show="child.employeeHeadImg">
                    </div>
                  </div>
                  <div class="child-item-content">
                    <p>
                      <span>{{child.employeeName}}&nbsp;</span>
                      <span class="col-grey">回复{{child.replyEmployeeName}}</span>
                    </p>
                    <pre>{{child.content}}</pre>
                    <p class="clearfix">
                      <span class="pull-left col-grey font-12">{{child.createTime}}</span>
                      <span class="pull-right col-grey font-12 cursor-pot" v-show="child.employeeId == userInfo.id" @click="deleteChild(index,iindex,child.id)">删除</span>
                      <span class="pull-right col-grey recover font-12 cursor-pot" @click="showChild(child.id);childContent = ''">回复</span>
                    </p>
                    <div class="replyChild  mar-top-10 clearfix" v-show="currentChild == child.id">
                      <div class="clearfix">
                        <textarea class="form-control"  maxlength="300" v-model="childContent"></textarea>
                        <span class="font-12 col-grey pull-right">{{childContent.length || 0}}/300</span>
                      </div>
                      <p class="pull-right sub-replay">
                        <button class="btn cancel btn-width-90" @click="cancelChild();childContent=''">取消</button>
                        <Button type="primary" class="btn-width-90 mar-left-5" @click="replyChild(comment.id,child.employeeId,child.employeeName,childContent,index)">回复</Button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-default pull-right fa fa-arrow-up" @click="goTop()"></button>
        </div>
        <button class="btn btn-primary btn-radius btn-basic load" @click="commentSearch()" v-show="comments.length != 0 && comments.length !=totalPage && totalPage-pagesInfo.pageSize > 0">显示更多评论</button>
        <span class="load col-grey" v-show="totalPage-pagesInfo.pageSize <= 0 || comments.length == totalPage">无更多评论</span>
      </div>
    </div>
    <!--<div v-show="!isLoadSuccess">
      <button class="btn btn-default btn-width-90 pull-right mar-top-20" @click="goBackByHistory()">返回</button>
      <div class="data-null text-center">
        <img src="/client/framework/images/data-null.png" alt="">
        <p>暂无数据</p>
      </div>
  </div>-->
    <likeModal  ref="gcbReadModal" ></likeModal>
  </div>
</template>
<script>
  import report from '../module';
  import Vue from "vue"
  import likeModal from '../components/likeModal'
  import  {buildDownloadUrl} from "../../../libs/tools";
  export default {
    data() {
      return {
        avatar: "",
        authorId: "",
        userId: "",
        lastName: "",
        item: {
          plans:[''],
          records:[''],
          summaries:['']
        },
        datas: [],
        attachments: [],
        // 评论
        totalPage: 0,
        commentContent:[""] ,
        userInfo: {employeeName: null,},
        pagesInfo :{workReportId: null, pageSize: 3, page: 1},
        parentContent:"",
        comments:[],
        listIds: [],
        index: null,
        currentParent: '',
        currentChild:"",
        childContent:'',
      }
    },
    components: {likeModal},
    methods: {
      goEdit(){
        this.$router.push({name:"reportEdit",param:{id: this.userId, request: this.request}})
      },
      goList(){
        this.$router.push({name:"reportList",param:{id: this.userId, request: this.request}})
      },
      // 删除
      deleteReport () {
      this.$gcb.gcbModal.open({
        title:"提示",
        icon:"danger",
        content:"确定删除工作汇报？",
      }).then(()=>{
        report.api.report.deleteReport({id:this.userId}).then(() =>{
            this.$gcb.tooltip.open({
              message:"删除成功",
              timeout:2000
            });
            this.goList();
          })
      })
    },
      // 导出
     export1 (type) {
      if (type == 1) {
        report.api.report.exportDetailWord({ id: this.userId, isWeb: true }).then(()=> {
          this.$gcb.tooltip.open({
            message: "导出成功"
          })
        })
      } else {
        report.api.report.exportDetailPdf({ id: this.userId, isWeb: true }).then(()=>{
          this.$gcb.tooltip.open({
            message: "导出成功"
          })
        })
      }
    },
      // 点赞
      like() {
        let $scope=this;
        $scope.item.isPraised = ! $scope.item.isPraised;
          if( $scope.item.isPraised){
            report.api.report.createLike({workReportId:$scope.userId}).then( ()=> {
            this.$gcb.tooltip.open({
              message:"点赞成功",
              timeout:2000
            });
            $scope.detailSearch($scope.userId);
          })
        }else {
            report.api.report.cancelLike({workReportId:$scope.userId}).then( ()=> {
            this.$gcb.tooltip.open({
              message:"取消点赞成功",
              timeout:2000
            });
            $scope.detailSearch($scope.userId);
          })
        }
      },
      // 关注
      focus() {
        let $scope=this;
        $scope.item.isAttention = ! $scope.item.isAttention;
        if( $scope.item.isAttention){
          report.api.report.createFocus({attentionEmployeeId:$scope.item.employeeId}).then( ()=> {
            this.$gcb.tooltip.open({
              message:"关注成功",
              timeout:2000
            });
          })
        }else {
          report.api.report.cancelFocus({attentionEmployeeId:$scope.item.employeeId}).success( ()=> {
            this.$gcb.tooltip.open({
              message:"取消关注成功",
              timeout:2000
            });
          })
        }
    },
      detailSearch() {
        report.api.report.detailSearch({id: this.userId}).then((result) => {
          this.avatar = buildDownloadUrl(result.headImg);
          this.lastName = result.employeeName.charAt(result.employeeName.length - 1, 1);
          this.authorId = result.employeeId;
          this.userId = result.id;
          this.pagesInfo.workReportId=result.id;
          if (result.workReportAttachments) {
            this.attachments = result.workReportAttachments
          } else {
            this.attachments = [];
          }
          this.item = result;
          // 调评论 `
          this.isLoadSuccess = true;
          this.pagesInfo.page=1;
          this.commentSearch();
        })
      },
      addComment() {
        if (!this.commentContent) {
          this.$gcb.tooltip.open({
            icon: "warning",
            message: "请输入评论内容",
            timeout: 2000
          });
          return;
        }
        report.api.report.addComment({
          workReportId: this.userId,
          content: this.commentContent,
          replyEmployeeId: this.authorId
        })
          .then(() => {
            this.commentContent = "";
            this.comments = [];
            this.currentChild = '';
            this.currentParent = '';
            this.pagesInfo.page=1;
            this.commentSearch();
            this.$gcb.tooltip.open({
              message: "评论发表成功",
              timeout: 2000
            });
          })
      },
      replyParent(commentId,employeeId,employeeName,content,index){
        if(!content){
            this.$gcb.tooltip.open({
              icon:"warning",
              message:"请输入回复内容",
              timeout:2000
            });
            return;
          }
        report.api.report.replyComment({workReportId:this.userId,content:content,replyEmployeeId:employeeId,parentId:commentId}).then( (result)=> {
          this.comments[index].replies.push(result);
          this.currentParent = "";
        })
      },
      replyChild(commentId,employeeId,employeeName,content,index) {
        if(!content){
          this.$gcb.tooltip.open({
            icon:"warning",
            message:"请输入回复内容",
            timeout:2000
          });
          return;
        }
        report.api.report.replyComment({workReportId:this.userId,content:content,replyEmployeeId:employeeId,parentId:commentId}).then((result)=> {
          this.comments[index].replies.push(result);
        this.currentChild = '';
      })
    },
      deleteParent(id){
        this.$gcb.gcbModal.open({
          title:"提示",
          icon:"danger",
          content:"确定删除该评论吗？",
        }).then(()=>{
          report.api.report.deleteComment({id:id}).then(()=> {
            this.$gcb.tooltip.open({
              message:"删除评论成功",
              timeout:2000
            });
            this.comments = [];
            this.commentSearch({page:1});
          })

        })
      },
      deleteChild (outIndex,index,id) {
        this.$gcb.gcbModal.open({
          title:"提示",
          icon:"danger",
          content:"确定删除该回复吗？",
        }).then(()=>{
          report.api.report.deleteComment({id:id}).
            then(()=>{
              this.$gcb.tooltip.open({
                message:"删除回复成功",
                timeout:2000
              });
              this.comments[outIndex].replies.splice(index,1);
            })
        })
      },
      buildDownloadUrl(uuid) {
        return buildDownloadUrl(uuid)
      },
      getSelfIcon() {
        this.userInfo = this.$store.state.user.employee;
      },
      createReadModal(item) {
        let postData = {workReportId: item, employeeNameLike: null}
        report.api.report.browseSearch(postData).then((res) => {
          this.$gcb.gcbReadRecord.open({datas: res, type: 'report'});
        })
      },
      createLikeModal(item) {
        let request = {workReportId: item, employeeNameLike: null};
        report.api.report.praiseSearch(request).then((result) => {
          this.datas = result;
          this.$refs.gcbReadModal.open(result, item)
        })
      },
      getListIdIndex(){
        let $scope = this;
        if (!this.listIds) return;
        if (this.listIds) {
          this.index = this.listIds.indexOf(parseFloat($scope.userId));
        }
      },
      pre() {
        this.getListIdIndex();
        if(this.index == 0){
          this.$gcb.tooltip.open({
            icon:"warning",
            message:"无上一篇！",
            timeout:2000
          });
          return;
        }
        this.index--;
        this.detailSearch(this.listIds[this.index]);
        this.comments = [];
        this.pagesInfo.workReportId=this.listIds[this.index];
        this.pagesInfo.page=1
        this.commentSearch();
      },
      next() {
        this.getListIdIndex();
        if(this.index == this.listIds.length-1 ){
          this.$gcb.tooltip.open({
            icon:"warning",
            message:"无下一篇！",
            timeout:2000
          });
          return;
        }
        this.index++;
        this.detailSearch(this.listIds[this.index]);
        this.comments = [];
        this.pagesInfo.workReportId=this.listIds[this.index];
        this.pagesInfo.page=1
        this.commentSearch();
      },
      // 评论
      commentSearch(SearchRequest) {
        if(SearchRequest){
          for(var k in SearchRequest){
            this.pagesInfo[k] = SearchRequest[k];
          }
        };
        report.api.report.commentSearch(this.pagesInfo).then((result) => {
          this.totalPage = result.total;
          this.comments = this.comments.concat(result.records);
          this.pagesInfo.page++;
        });
      },
      // 返回顶部
      goTop(){
        scrollTo(0,0);
      },
      goback(){
        this.$router.go(-1)
      },
      showParent  (index) {
        this.currentParent = index;
      },
      showChild (index) {
        this.currentChild = index;
      },
      cancelParent() {
        this.currentParent = "";
      },
      cancelChild() {
        this.currentChild = "";
      },
    },
    computed: {
       selfLastName: function () {
         return  this.userInfo.employeeName? this.userInfo.employeeName.charAt(this.userInfo.employeeName.length - 1, 1):""
       }
    },
    mounted() {
      this.userId=this.$route.params.id;
     this.listIds = this.$route.params.listIds;
     this.getSelfIcon();
     this.detailSearch();
    }

  }
</script>
<style lang="less"  scoped>
  .col-grey{
    color: #939BA4;
  }
  .mar-lf{
    margin-left: 15px;
  }
  button {
    width: 90px;
  }
  .header{
    height: 70px;
    line-height: 70px;
  }

  .header button:last-of-type{
    margin-left: 25px;
  }

  .items-box{
    position: relative;
  }

  .items-box .topicon-day{
    height: 87px;
    width: 87px;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    background: url("/client/business/report/images/day.png") center no-repeat;
  }

  .items-box .topicon-week{
    height: 87px;
    width: 87px;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    background: url("/client/business/report/images/week.png") center no-repeat
  }

  .items-box .topicon-month{
    height: 87px;
    width: 87px;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    background: url("/client/business/report/images/month.png") center no-repeat
  }

  /*主体*/
  .items{
    padding: 30px 60px;
    background-color: white;
  }

  .items .top-info{
    border-bottom: 1px solid #f1f1f1;
    /*padding:15px 0;*/
    padding-left: 85px;
    padding-bottom: 30px;
    padding-right: 100px;
    position: relative;
  }

  .items .top-info p{
    margin-bottom: 5px;
  }

  .items .detail-info{
    width: 100%;
  }

  .avatar-box{
    height: 70px;
    width: 70px;
    border-radius: 35px;
    overflow: hidden;
    position: absolute;
    left: 0;
    top:0;
  }

  .avatar-box img{
    width: 100%;
    height: 100%;
    display: block;
  }

  .avatar-box span{
    height: 100%;
    width: 100%;
    display: block;
    line-height: 70px;
    text-align: center;
    font-size: 20px;
    background-color: #248bfe;
    color: white;
  }

  .controls{
    width: 100%;
    height: 54px;
    position: absolute;
    top:50%;
    margin-top: -27px;
  }

  .controls .pre,.controls .next{
    height: 54px;
    line-height: 56px;
    width: 30px;
    color: white;
    display: block;
    background-color: #c0c0c0;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    font-size: 18px;
  }

  .data-info{
    margin-top: 15px;
    position: relative;
  }

  .data-info h1{
    padding: 0;
    margin: 0;
  }

  .data-info span:first-of-type{
    position: absolute;
    top: -2px;
    right: -55px;
    font-size: 12px;
  }

  .data-info span:last-of-type{
    position: absolute;
    bottom: -3px;
    right: -58px;
    font-size: 18px;
  }

  .content{
    margin-top: 30px;
  }

  .content h3{
    margin-top: 0;
    margin-bottom: 15px;
  }

  .content .content-item:nth-child(-n+3){
    margin-bottom: 40px;
  }

  .content .content-item p{
    line-height: 21px;
  }

  /*附件*/
  .attachment{
    padding: 30px 40px;
    padding-top: 10px;
    background-color: white;
  }

  .img-box{
    height: 80px;
    width: 80px;
    display: inline-block;
    margin-right: 10px;
    position: relative;
  }

  .img-box:hover{
    cursor: pointer;
  }

  .img-box img{
    height: 100%;
    width: 100%;
    display: block;
  }

  .text-box{
    margin: 15px 0;
    position: relative;
    z-index: 10;
  }

  .file-size{
    margin-left: 15px;
  }
  .font-16 {
    font-size: 16px;
  }
  .download{
    margin-left: 15px;
  }
  pre {
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-family: "Microsoft Yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 0;
    margin: 0;
  }

  /*评论*/
  .comment h3{
    padding: 0;
    margin: 0;
    margin-bottom: 20px;
    display: inline-block;
  }

  .comment{
    margin-top: 15px;
    padding: 30px 40px;
    background-color: white;
  }

  .comment .userInfo{
    position: relative;
    padding-left: 60px;
    margin-bottom: 20px;
  }

  .comment .avatar-box{
    width: 60px;
    position: absolute;
    overflow: visible;
    top: 0;
    left: 0;
  }

  .comment .avatar{
    height: 60px;
    width: 60px;
    border-radius: 30px;
    overflow: hidden;
  }

  .comment .avatar img{
    height: 100%;
    width: 100%;
    display: block;
  }

  .comment .avatar span{
    height: 100%;
    width: 100%;
    display: block;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    background-color: #248bfe;
    color: white;
  }

  .comment .userInfo-text{
    width: 100%;
    /*height: 180px;*/
    padding-left: 20px;
    position: relative;
  }

  .comment .userInfo-text textarea{
    height: 100px;
    width: 100%;
    resize: none;
  }

  .comment .userInfo-text .textNum{
    font-size: 12px;
  }

  .comment .userInfo button{
    margin-top: 15px;
  }

  .comment .comment-body{
    padding-bottom: 80px;
    border-bottom: 1px solid #f5f5f5;
  }

  .comment .comment-body .comment-item{
    padding-left: 60px;
    margin-bottom: 10px;
    position: relative;
  }

  .comment .comment-body .content-box{
    width: 100%;
    padding-left: 20px;
    padding-bottom: 20px;
  }

  .comment .comment-body .content-box p{
    line-height: 25px;
  }

  .comment .comment-body .content-box .recover{
    margin-right: 15px;
  }

  .comment .load{
    display: block;
    margin: 0 auto;
    margin-top: 20px;
    width: 170px;
    padding-left: 0;
    padding-right: 0;
  }
  .comment .comment-body .content-box .child-box{
    padding: 20px;
    background-color: #f5f5f5;
  }
  .comment .comment-body .content-box .child-item-content > p:last-of-type{
    margin: 0;
  }
  .comment .comment-body .content-box .child-item{
    position: relative;
    padding-left: 80px;
  }
  .comment .comment-body .content-box .child-item-content{
    width: 100%;
  }
  .comment .replyParent textarea,.replyChild textarea{
    resize: none;
    height: 100px;
  }
  .comment .replyParent button,.replyChild button{
    margin-bottom: 15px;
  }

  .comment .sub-replay{
    margin-top: 15px;
  }
  .comment .cancel{
    color: #939BA4;
    background-color: transparent;
    border: 1px solid transparent;
  }
</style>

