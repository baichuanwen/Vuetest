<template>
  <div class="animated fadeIn" id="inspectionDetail">
    <Row class="inspection-detail-top header">
      <Col span="12"  class="font-16" style="margin-left: 15px;width: 48%">查看巡检</Col>
      <Col span="12" style="padding-left: 10%">
      <Dropdown trigger="click" size="large"  style="margin-left: 20px">
        <Button type="primary" style="font-size: 14px">
          导出<Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list" style="top: 51px; left: 200px;">
          <DropdownItem> <p @click="export1(1)">Word</p></DropdownItem>
          <DropdownItem><p @click="export1(2)">PDF</p></DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button size="large" style="background:#4aa55d;color:#fff" @click="edit()">编辑</Button>
      <Button size="large" style="background:#ea1c0d;color:#fff;margin-right:25px" @click="createDeleteModal()">删除</Button>
      <Button size="large" @click="cancel()">返回</Button>
      </Col>
    </Row>
    <span class="topicon"> </span>
    <Row class="inspection-detail-center items-box">
      <div class="items">
        <div class="font-18" style="font-weight: bold">{{datas.projectName}}
        <div class="pull-right" style="width:150px;">
          <img v-show="datas.isChanged == 0" src="../../inspection/images/noChanged.png">
          <img v-show="datas.isChanged == 1" src="../../inspection/images/changed.png">
          <img v-show="datas.isNotice == 0" src="../../inspection/images/noNotice.png">
          <img v-show="datas.isNotice == 1" src="../../inspection/images/notice.png">
        </div>
        </div>
        <div class="info clearfix" style="background-color: #F8F8F8;padding: 20px 20px;">
          <div class="pull-left ">

            <span style="margin-right:0px" class="col-939">
              <img src="../../inspection/images/icon1.png" />
              检查人：</span>{{datas.employeeName}}
            <span style="margin-right:0px; margin-left: 40px;" class="col-939">
              <img src="../../inspection/images/icon2.png" />
              巡检时间：</span>{{datas.createTime | parseTime}}
            <div>
              <span style="margin-right:0px" class="col-939">
                <img src="../../inspection/images/icon3.png" />
                抄送人：</span>{{copyEmployee}}
            </div>
          </div>
        </div>
        <span>巡检内容</span>
        <div class="content" id="divContent" v-html="datas.content"></div>
      </div>
    </Row>
    <!--附件-->
    <div class="attachment" v-show="datas.attachmentNum != 0">
      <div class="attach-title">
        <span class="font-16">附件</span>
        <span>(<span class="text-primary">{{datas.attachmentNum}}</span>/9)</span>
      </div>

      <div class="text-box">
        <p v-for="item in files" class="margin-10">
          <img src="../../../../static/img/cad.png" v-show="showType(item).isCad">
          <img src="../../../../static/img/excel.png" v-show="showType(item).isExcel">
          <img src="../../../../static/img/pdf.png" v-show="showType(item).isPdf">
          <img src="../../../../static/img/ppt.png" v-show="showType(item).isPpt">
          <img src="../../../../static/img/word.png" v-show="showType(item).isWord">
          <img src="../../../../static/img/unknown.png" v-show="showType(item).isOther">
          <span @click="onLineFile(item.uuid)" class="mar-left-5">{{item.fileName}}</span>
          <span class="file-size col-grey">{{item.fileSize | getFileSize}}</span>
          <a class="text-primary download" :href="item.src">下载</a>
        </p>
      </div>
      <div class="img-box" v-for="(item, index) in imgs" v-bind:style="{ 'background-image': 'url(' + item.src + ')','background-position': 'center center','background-repeat':'no-repeat','background-size':'cover' }" @click="showImg(index, imgs)"></div>
    </div>
    <!--评论-->
    <div class="comment">
      <div class="comment-header">
        <h3 class="font-16">评论&nbsp;</h3>
        <span class="col-grey">共{{datas.commentNum}}条</span>
      </div>
      <!--用户回复-->
      <div class="userInfo clearfix">
        <div class="pull-left avatar-box" >
          <div class="icon btn-success lastName" style="float: none;background-color: #248bfe;border-color: #248bfe;border-radius: 25px;margin-bottom: 8px;">
            <span v-if="!userInfo.iconUuid">{{selfLastName}}</span>
            <img error-src :src="buildDownloadUrl(userInfo.iconUuid)" v-if="userInfo.iconUuid">
          </div>
          <p style="text-align: center;">{{userInfo.employeeName}}</p>
        </div>
        <div class="userInfo-text clearfix">
          <textarea class="form-control" placeholder="发表你的看法吧" maxlength="300" v-model="commentContent"></textarea>
          <span class="textNum col-grey pull-right">{{commentContent.length || 0}}/300</span>
        </div>
        <Button type="primary" class="btn-width-90 pull-right" @click="addComment()">发表评论</Button>
      </div>
      <!--评论主体-->
      <div class="comment-body" >
        <div class="comment-item" v-for="(comment,index) in comments" :key="index">
          <div class="avatar-box">
            <div class="avatar">
              <span>{{selfLastName}}</span>
            </div>
          </div>
          <div class="content-box">
            <!--回复父级-->
            <div class="parent-box clearfix">
              <pre class="pre1" style="font-size: 14px; margin-bottom:5px">{{comment.employeeName}}</pre>
              <pre class="pre1" style="font-size: 14px">{{comment.content}}</pre>
              <p class="clearfix">
                <span class="pull-left pre1 col-grey font-12">{{comment.createTime}}</span>
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
            <div class="child-box" v-for="(child,iindex) in comment.replays">
              <div class="child-item">
                <div class="avatar-box">
                  <div class="avatar">
                    <span>{{selfLastName}}</span>
                  </div>
                </div>
                <div class="child-item-content">
                  <p>
                    <span>{{child.employeeName}}&nbsp;</span>
                    <span class="col-grey">回复{{child.commentedEmployeeName }}</span>
                  </p>
                  <pre class="pre2" style="font-size: 14px">{{child.content}}</pre>
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
                      <Button class="btn cancel btn-width-90" @click="cancelChild();childContent=''">取消</Button>
                      <Button type="primary" class="btn-width-90 mar-left-5" @click="replyChild(comment.id,child.employeeId,child.employeeName,childContent,index);childContent=''">回复</Button>
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
</template>

<script>
  import inspection from "../module";
  import {
    getWeek,
    buildDownloadUrl,
    getFileType,
    hasPermission,
    getFileSize
  }from "@/libs/tools";
  export default {
    name: "inspection-detail",
    data() {
      return {
        userInfo: {
          employeeName: null,
        },
        item: {
          employee: {
            employeeName: ''
          },
        },
        datas: [],
        pagesInfo: {
          id: null,
          pageSize: 3,
          page: 1,
        },
        userId: "",
        files: [],
        imgs: [],
        filesType: {},
        params: {},
        index: 0,
        listIds: [],
        copyEmployee: "",
        commentContent: "",
        parentContent: "",
        childContent: "",
        currentParent: null,
        currentChild: null,
        totalPage: 0,
        comments: [],
        commentedEmployeeId: null
      }
    },
    methods: {
      showType(file) {
        return getFileType(file);
      },
      // 删除
      createDeleteModal() {
        this.$gcb.gcbModal
          .open({
            title: "提示",
            content: "确定删除这条巡检吗？",
            icon: "danger"
          })
          .then(() => {
            inspection.api.inspection
              .deleteInspection({ id: this.$route.params.id})
              .then(result => {
                this.$gcb.tooltip.open({
                  message: "删除成功!"
                });
                this.$router.push("/inspection/list");
              });
          });
      },
      // 编辑
      edit() {
        this.$router.push({
          name: "inspectionEdit",
          params: { id: this.$route.params.id}
        });
      },
      // 导出
      export1 (type) {
        if (type == 1) {
          inspection.api.inspection.exportWord({ id: this.userId}).then(()=> {
            this.$gcb.tooltip.open({
              message: "导出成功"
            })
          })
        } else {
          inspection.api.inspection.exportDetailPdf({ id: this.userId}).then(()=> {
            this.$gcb.tooltip.open({
              message: "导出成功"
            })
          })
        }
      },
      // 取消
      cancel() {
        this.$router.go(-1);
      },
      //新增评论
      addComment() {
        if (!this.commentContent) {
          this.$gcb.tooltip.open({
            icon: "warning",
            message: "请输入评论内容",
            timeout: 2000
          });
          return;
        }
        inspection.api.inspection.addComment({
          commentedEmployeeId: this.commentedEmployeeId,
          content: this.commentContent,
          dailyPatrolId: this.userId,
        }).then(() => {
          this.commentContent = "";
          this.comments = [];
          this.pagesInfo.page = 1;
          this.commentSearch();
          this.currentChild = '';
          this.currentParent = '';
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
        inspection.api.inspection.replyComment({
          commentedEmployeeId: employeeId,
          content: content,
          dailyPatrolId: this.userId,
          parentId: commentId,
        }).then( (result)=> {
          this.comments[index].replays.push(result);
          this.comments = [];
          this.currentParent = "";
          this.pagesInfo.page= 1;
          this.commentSearch();
          this.$gcb.tooltip.open({
            message: "评论发表成功",
            timeout: 2000
          });
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
        inspection.api.inspection.replyComment({
          commentedEmployeeId: employeeId,
          content: content,
          dailyPatrolId: this.userId,
          parentId: commentId,
        }).then((result)=> {
          this.comments[index].replays.push(result);
          this.comments = [];
          this.currentChild = '';
          this.pagesInfo.page= 1;
          this.commentSearch();
          this.$gcb.tooltip.open({
            message: "评论发表成功",
            timeout: 2000
          });
        })
      },
      deleteParent(id){
        this.$gcb.gcbModal.open({
          title:"提示",
          icon:"danger",
          content:"确定删除该评论吗？",
        }).then(()=>{
          inspection.api.inspection.deleteComment({id:id}).then(()=> {
            this.$gcb.tooltip.open({
              message:"删除评论成功",
              timeout:2000
            });
            this.comments = [];
            this.pagesInfo.page= 1;
            this.commentSearch();
          })

        })
      },
      deleteChild (outIndex,index,id) {
        this.$gcb.gcbModal.open({
          title:"提示",
          icon:"danger",
          content:"确定删除该回复吗？",
        }).then(()=>{
          inspection.api.inspection.deleteComment({id:id}).
          then(()=>{
            this.$gcb.tooltip.open({
              message:"删除回复成功",
              timeout:2000
            });
            this.comments[outIndex].replays.splice(index,1);
          })
        })
      },
      buildDownloadUrl(uuid) {
        return buildDownloadUrl(uuid)
      },
      // 评论
      commentSearch() {
        this.pagesInfo.id=this.userId;
        inspection.api.inspection.commentSearch(this.pagesInfo).then((result) => {
          this.totalPage = result.total;
          this.comments = this.comments.concat(result.records);
          this.pagesInfo.page++;
        });
      },
      // 返回顶部
      goTop(){
        scrollTo(0,0);
      },
      // 查看大图
      showImg(index, imgs) {
        let imagsArray = [];
        imgs.forEach(function(v, i) {
          imagsArray[i] = v.src;
        })
        this.$gcb.gcbImgViewer.show({images: imagsArray,index: index});
      },
      showParent(index){
        this.currentParent = index;
      },
      showChild(index) {
      this.currentChild = index;
      },
      cancelParent() {
        this.currentParent = null;
      },
      cancelChild() {
        this.currentChild = null;
      },
      getSelfIcon() {
        this.userInfo = this.$store.state.user.employee;
      },
      detailSearch(id) {
        let that = this;
        inspection.api.inspection.detailInspection({id: id}).then(res => {
          if (res.error) {
            this.$gcb.tooltip.open({
              message: res.error.message,
              icon: "warning"
            })
          } else {
            if (res.attachment) {
              res.attachment.forEach(function(v) {
                v.src = buildDownloadUrl(v.uuid, v.fileName);
                if (getFileType(v).isImg) {
                  that.imgs.push(v);
                } else {
                  that.files.push(v);
                }
              });
            }
            if (res.copyEmployeeList) {
              res.copyEmployeeList.forEach(function(v, i) {
                that.copyEmployee += i == res.copyEmployeeList.length - 1 ? v.employeeName : v.employeeName + ",";
              })
            }
            that.datas = res;
            that.commentedEmployeeId = res.employeeId;
          }
          // 调评论 `
          this.isLoadSuccess = true;
          this.pagesInfo.page=1;
          this.commentSearch();
        })
      },
    },
    computed: {
      selfLastName: function () {
        return  this.userInfo.employeeName? this.userInfo.employeeName.charAt(this.userInfo.employeeName.length - 1, 1):""
      }
    },
    mounted: function() {
      this.userId = this.$route.params.id;
      this.request = this.$route.params.request;
      this.getSelfIcon();
      this.detailSearch(this.userId);
    }
  };
</script>

<style lang="less" slot-scope="true">
  .font-16{
    font-size:16px;
  }
  .app-body .main {
    padding-top: 0;
  }
  #inspectionDetail {
    .font-18 {
      font-size: 18px;
    }
    .mar-left-5 {
      margin-left: 5px;
    }
    .margin-10 {
      margin: 0 0 10px;
    }
    .col-f1 {
      color: #cccccc;
    }
    .col-939 {
      color: #939ba4;
    }
    .col-248 {
      color: #248bfe;
    }
    .scan {
      position: relative;
      z-index: 10;
      cursor: pointer;
      margin-right: 8px;
    }
    .inspection-detail-top {
      font-size: 16px;
      height: 60px;
      line-height: 60px;
      button {
        width: 90px;
      }
      div:last-child {
        text-align: right;
      }
    }
    .header {
      height: 70px;
      line-height: 70px;
    }

    .header button:last-of-type {
      margin-left: 25px;
    }

    .topicon {
      margin-top: 57px;
      height: 87px;
      width: 87px;
      display: block;
      position: absolute;
      z-index: 10;
      top: 0;
      right: 0;
      background: url("/client/business/announce/images/Istop.png") center no-repeat;
    }
    .items {
      padding: 30px 20px;
      background-color: #ffffff;
      margin: 20px
    }

    .items .info {
      margin: 20px 0px 25px 0px;
    }

    .items .content {
      text-indent: 2em;
      line-height: 25px;
      margin-bottom: 15px;
      overflow: auto;
    }

    .items .info > div > span:first-of-type,
    .items .info-person > span:first-of-type {
      margin-right: 5px;
    }
    .inspection-detail-center {
      position: relative;
    }
    .controls {
      width: 100%;
      height: 54px;
      position: absolute;
      top: 50%;
      margin-top: -27px;
    }

    .controls .pre,
    .controls .next {
      height: 54px;
      line-height: 56px;
      width: 30px;
      color: white;
      display: block;
      background-color: #c0c0c0;
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
    }
    .attachment {
      padding: 30px 40px;
      padding-top: 10px;
      background-color: white;
    }

    .img-box {
      height: 80px;
      width: 80px;
      display: inline-block;
      margin-right: 10px;
      position: relative;
    }

    .img-box img {
      height: 100%;
      width: 100%;
      display: block;
    }

    .text-box {
      margin: 15px 0;
      .text-primary {
        color: #248bfe !important;
      }
    }

    .file-size {
      margin-left: 15px;
    }

    .download {
      margin-left: 15px;
    }
    li {
      display: list-item;
      text-align: -webkit-match-parent;
    }
    .lastName {
      height: 100%;
      width: 100%;
      display: block;
      line-height: 60px;
      text-align: center;
      font-size: 20px;
      background-color: #248bfe;
      color: white;
    }
    .icon {
      width: 50px;
      height: 50px;
      border-radius: 25px;
      /*background-color: #838EFD;*/
      color: #ffffff;
      font-weight: bolder;
      float: left;
    }
    .icon span {
      height: 100%;
      width: 100%;
      display: block;
      text-align: center;
      line-height: 50px;
      /*padding-left: 11px;*/
      font-size: 16px;
    }
    /*评论*/
    .comment h3 {
      padding: 0;
      margin: 0;
      margin-bottom: 20px;
      display: inline-block;
    }

    .comment {
      margin-top: 15px;
      padding: 30px 40px;
      background-color: white;
    }
    .col-grey{
      color: #939BA4;
    }
    .comment .userInfo {
      position: relative;
      padding-left: 60px;
      margin-bottom: 20px;
    }

    .comment .avatar-box {
      width: 60px;
      position: absolute;
      overflow: visible;
      top: 0;
      left: 0;
    }

    .comment .avatar {
      height: 60px;
      width: 60px;
      border-radius: 30px;
      overflow: hidden;
    }

    .comment .avatar img {
      height: 100%;
      width: 100%;
      display: block;
    }

    .comment .avatar span {
      height: 100%;
      width: 100%;
      display: block;
      line-height: 60px;
      text-align: center;
      font-size: 20px;
      background-color: #248bfe;
      color: white;
    }

    .comment .userInfo-text {
      width: 100%;
      /*height: 180px;*/
      padding-left: 20px;
      position: relative;
    }

    .comment .userInfo-text textarea {
      height: 100px;
      width: 100%;
      resize: none;
    }

    .comment .userInfo-text .textNum {
      font-size: 12px;
    }

    .comment .userInfo button {
      margin-top: 15px;
    }

    .comment .comment-body {
      padding-bottom: 80px;
      border-bottom: 1px solid #f5f5f5;
    }

    .comment .comment-body .comment-item {
      padding-left: 60px;
      margin-bottom: 10px;
      position: relative;
    }

    .comment .comment-body .content-box {
      width: 100%;
      padding-left: 20px;
      padding-bottom: 20px;
    }

    .comment .comment-body .content-box p {
      line-height: 25px;
    }

    .comment .comment-body .content-box .recover {
      margin-right: 15px;
    }

    .comment .load {
      display: block;
      margin: 0 auto;
      margin-top: 20px;
      width: 170px;
      padding-left: 0;
      padding-right: 0;
    }
    .comment .comment-body .content-box .child-box {
      padding: 20px;
      background-color: #f5f5f5;
    }
    .comment .comment-body .content-box .child-item-content > p:last-of-type {
      margin: 0;
    }
    .comment .comment-body .content-box .child-item {
      position: relative;
      padding-left: 80px;
    }
    .comment .comment-body .content-box .child-item-content {
      width: 100%;
    }
    .comment .replyParent textarea, .replyChild textarea {
      resize: none;
      height: 100px;
    }
    .comment .replyParent button, .replyChild button {
      margin-bottom: 15px;
    }

    .comment .sub-replay {
      margin-top: 15px;
    }
    .comment .cancel {
      color: #939BA4;
      background-color: transparent;
      border: 1px solid transparent;
    }
    .pre1{
      margin-bottom: 0px;
      padding: 0px;
      background-color: white;
      padding-left: 20px;
    }
    .pre2{
      margin-bottom: 0px;
      padding: 0px;
      background-color: #f5f5f5;
    }
  }
</style>
