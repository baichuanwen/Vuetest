<template>
  <div class="animated fadeIn" ref="knowledgeDdetail">
    <div class="knowledge-detail">
      <div class="header clearfix">
        <div class="pull-right">
          <Button type="primary"  style="width: 90px; color:#fff;margin-right:5px" size="large" v-if="hasPermission"  @click="pageTransition()">编辑</Button>
          <Button class="danger" style="background:#ea1c0d;width: 90px; color:#fff;margin-right:5px" size="large" v-if="hasPermission" @click="createDeleteModal()">删除</Button>
          <Button  class="btn-default w90" style="border: 1px solid #ccc;margin-right: 20px;" @click="back()">返回</Button>
        </div>
      </div>
      <div class="main1">
        <div class="title">
          {{result.title}}
        </div>
        <div class="small clearfix">
          <div class="time">发布时间：{{result.createTime}}</div>
          <div class="editor">编辑人：<span class="text-primary">{{result.employeeName}}</span></div>
          <div class="visit"><i class="fa fa-eye"></i> <span class="text-primary point" @click="createBrowseModal">浏览{{browser.isBrowse.length}}</span></div>
        </div>
        <pre class="content" v-html="result.content"></pre>
        <!--附件-->
        <div class="attachment" v-show="appendix.length>0">
          <div class="attach-title">
            <span class="font-16">附件</span>
            <span>(<span class="text-primary">{{files.length + imgs.length}}</span>/9)</span>
          </div>
          <div class="text-box">
            <p v-for="item in files" class="mb-10">
              <img src="../../../static/img/cad.png" v-show="showType(item).isCad">
              <img src="../../../static/img/excel.png" v-show="showType(item).isExcel">
              <img src="../../../static/img/pdf.png" v-show="showType(item).isPdf">
              <img src="../../../static/img/ppt.png" v-show="showType(item).isPpt">
              <img src="../../../static/img/word.png" v-show="showType(item).isWord">
              <img src="../../../static/img/unknown.png" v-show="showType(item).isOther">
              <span class="mar-left-5">{{item.fileName}}</span>
              <span class="file-size col-grey">{{item.fileSize | getFileSize}}</span>
              <a class="text-primary download" :href="item.src">下载</a>
            </p>
          </div>
          <div class="img-box" v-for="item in imgs" :style="{ 'background-image': 'url(' + item.src + ')','background-position': 'center center','background-repeat':'no-repeat','background-size':'cover' }"></div>
        </div>
    </div>
  </div>

  </div>
</template>
<script>
    import Vue from "vue"
    import readModal from './browseModal.vue'
    import knowledge from './module';
    import store from '@/store'
    import {
      getWeek,
      buildDownloadUrl,
      getFileType,
      hasPermission,
      getFileSize
    } from "@/libs/tools";
    export default {
        name: 'knowledge-list',
        components:{readModal},
        data() {
            return {
              queryId:'',
              hasPermission:false,
              result:{
                browseNum:null,
                companyId:null,
                content:"",
                createTime:"",
                employeeId:null,
                employeeName:'',
                id:'',
                title:"",
                updateTime:'',
              },
              browser:{
                allBrowse:[],
                isBrowse:[],
                noBrowse:[]
              },
              appendix:[],
              imgs:[],
              files:[],
              filesType: {},
              attachment:[],
              modalShow:false,
              item: {},
              gcbReadModal:{}
            }
        },
        computed:{},
        methods: {
            async getDetail(id){
                let self=this;
                this.queryId = this.$route.params.id;
                this.result=  await knowledge.api.knowledgeDetails({ id:self.queryId });
                this.result.attachment =this.result.attachment || [];
                this.result.attachment.forEach(function(v) {
                    self.appendix.push(v.uuid);
                    v.src = buildDownloadUrl(v.uuid, v.fileName);
                    if (getFileType(v).isImg) {
                      self.imgs.push(v);
                    } else {
                      self.files.push(v);
                    }
                });
                self.hasManagePermission(this.result)
                // 浏览
                self.browser= await knowledge.api.knowledgeBrowse({ id: self.queryId });
                const Modal = Vue.extend(readModal)
                this.gcbReadModal = new Modal({
                  data() {
                    return {
                        datas:null,
                        searchText:null,
                        isRead:null,
                        queryId:self.queryId,
                    }
                  }
              })
              const component = this.gcbReadModal.$mount();
              this.$refs.knowledgeDdetail.appendChild(component.$el);
            },
            hasManagePermission(result){
                this.loginId= store.state.user.employee.id;
                if(this.loginId==result.employeeId){
                  this.hasPermission=true; return;
                }
                this.hasPermission=  hasPermission(115);

            },
            showType(file){
               return getFileType(file)
            },
            pageTransition(){
              this.queryId = this.$route.params.id;
              this.$router.push({name:"knowledgeEdit",params:{id: this.queryId}})
            },
            createDeleteModal(){
                this.$gcb.gcbModal.open({
                    title: "提示",
                    content: "确定删除吗？",
                    subMessage: "删除后不可恢复",
                    icon: "danger",
                }).then(()=>{
                    knowledge.api.deleteKnowledge({ id: this.queryId }).then((result)=> {
                       this.$router.push({name:"knowledgeList"})
                    });
                })
            },
            back(){
              this.$router.go(-1);
            },

            // 查看浏览人
            createBrowseModal () {
              this.gcbReadModal.open()
            }
        },
        mounted: function() {
            this.getDetail();
        },
    }
</script>
<style lang="less">
  .container-fluid{
    padding-bottom: 150px;
  }
   .knowledge-detail{
     .header{
      margin-bottom: 15px;
     }
     .w90{
       width: 90px;
     }
     .mb15{
       margin-bottom: 15px;
     }
     .mb-10{
       margin-bottom: 10px;
     }
     .main1{
       background-color: #fff;
       padding:30px;
     }
     pre{
       white-space: pre-wrap;       /* css-3 */
       white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
       white-space: -o-pre-wrap;    /* Opera 7 */
       word-wrap: break-word;       /* Internet Explorer 5.5+ */
       word-break:break-all;
       overflow:hidden;
       background-color: transparent;
       border: none;
       font-size: 14px;
       font-family: "Microsoft Yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;
       padding: 0;
       margin: 0;
     }
     .title{
       font-size: 18px;
     }
     .small{
       color: #939BA4;
       font-size: 14px;
       margin:10px 0 20px;
     }
     .small div{
       float: left;
       margin-right:30px;
     }
     .content{
       font-size: 14px;
       margin-bottom:40px;
     }
     .point{
       cursor: pointer;
       color: #007bff !important;
     }
     .appendixImgBox{
       width: 80px;
       height: 80px;
       line-height: 80px;
       float: left;
       margin-right: 10px;
       text-align: center;
       background-size: cover;
     }
     .appendixImg{
       max-width: 100%;
       max-height: 100%;
       margin-top: -2px;
     }
     .appendix .mb0{
       margin-bottom: 0;
     }
     .appendixImg{
       width: 80px;
       height: 80px;
       margin-right: 10px;
     }
     .browseModal .title{
       text-align: center;
       padding:15px 0;
     }
     .browseModal .searchBox{
       width: 100%;
       padding:10px 20px;
       background-color: #FAFAFA;
       border-top:1px solid #F2F2F2;
       border-bottom:1px solid #F2F2F2;
       position: relative;
       display: inline-block;
     }
     .browseModal .searchBox .form-control{
       width: 100%;
     }
     .browseModal .searchBox .colGrey{
       position: absolute;
       top: 10px;
       right: 15px;
       height: 34px;
       line-height: 34px;
       width: 40px;
       text-align: center;
       cursor: pointer;
       color: #ddd;
     }
     .browseModal .btns{
       width: 330px;
       margin: 0 auto;
     }
     .browseModal .btns .btn{
       margin:0 10px;
     }
     .browseModal .bthGrey{
       background-color: #f9f9f9;
       border-color: #F2F2F2;
     }
     .browseModal .bthActive{
       color: #fff;
       background-color: #0193DE;
       border-color: #0193DE;
     }
     .browseModal .myTable{
       border:1px solid #ddd;
       margin-top:20px;
       width: 100%;
     }
     .browseModal .myTable .tableHead{
       background-color: #E6E6E6;
       font-weight:700;
     }
     .browseModal .myTable .myCeil{
       display: inline-block;
       width: 30%;
     }
     .browseModal .myTable .tableBody{
       height: 390px;
       overflow: auto;
     }
     .browseModal .bgc{
       background-color: #F7F7F7;
     }
     .browseModal .firstCeil{
       padding: 8px 5px 8px 15px;
     }
     .browseModal .ceilPad{
       padding: 8px 5px;
     }
     .attachment {
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
   }
</style>
