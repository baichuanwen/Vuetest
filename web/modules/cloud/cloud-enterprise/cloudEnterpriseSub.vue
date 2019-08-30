<template>
  <div class="animated fadeIn">
    <Row  :gutter="16" style="margin-bottom: 10px">
      <Col >
          <bread  @searchList="searchList"></bread>
      </Col>
    </Row>
    <Row style="margin-bottom: 20px;">
      <i-col span="4"><i-button type="primary"  @click="createFloder()">新建文件夹</i-button> <i-button type="error" @click="delete2()">删除</i-button></i-col>
      <i-col span="4">
        <Upload multiple :show-upload-list="false" with-credentials :on-success="upload" action="https://a.gcb365.com/api/web/file/upload">
          <Button type="primary" size="large"> 上传附件 </Button>
        </Upload>
      </i-col>
      <i-col span="11"> &nbsp; &nbsp;</i-col>
      <i-col span="4" ><i-input icon="ios-clock-outline" placeholder="请输入..." v-model="pagesInfo.condition"  style="width: 200px" @click.native="searchList(true)"></i-input></i-col>
    </Row>
    <Row>
      <tableList ref="tableList" @searchList="searchList" :isSub="isSub" :data1="data1"></tableList>
    </Row>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="pagesInfo.pageNo" @on-change="changePage"></Page>
      </div>
    </div>
    <createFileModal ref="sharePubModal"  @createShare="createShare"></createFileModal>
    <uploadModal :data1="files"  @searchList="searchList" ref="uploadModal" ></uploadModal>
  </div>
</template>
<script>
  import cloud from '../module';
  import createFileModal from '../components/createFileModal';
  import uploadModal from '../components/uploadModal';
  import tableList from '../components/tableList';
  import bread from '../components/bread';
  import {
    getWeek,
    buildDownloadUrl,
    getFileType,
    hasPermission,
    getFileSize
  } from "@/libs/tools";
  export default {

    data() {
      return {
        files:[],
        createFileParam :{
          name: null,
          parentId: null,
          shares: [],
          fileSubjectionType: 1
        },
        total:0,
        pagesInfo:{
          "fileSubjectionType":1,
          "pageNo":1,
          "pageSize":10,
          "condition":null,
          "folderId":this.$route.params.id,
          "orderType":2,
          "orderField":"createTime"
        },
        data1: [],
        isSub:true,
      }
    },

    components:{
      createFileModal,
      uploadModal,
      tableList,
      bread
    },

    methods:{
      searchFloder(reqeust){
        let resq=Object.assign(this.request,reqeust);
        cloud.api.myFileSearch(resq).then((res)=>{
          this.datas=res.page.records;

          this.containUpload=res.containUpload;
        })
      },
      createFloder(){
        this.$nextTick(_=>{
          this.$refs.sharePubModal.open()
        })
      },
      delete2(){
        this.$nextTick(_=>{
          this.$refs.tableList.delete2()
        })

      },
      createShare(shareName){
        this.createFileParam.name=shareName;
       this.createFileParam.parentId= this.$store.state.cloud.curItem.id;
        cloud.api.createFile(this.createFileParam).then((res)=>{
          this.searchList();
          this.$gcb.tooltip.open({
            message: "文件创建成功",
            timeout: 2000
          });
        })
      },
      upload(res, file, $files) {
        cloud.api.uploadSuccess({
           attachmentId: res.body.id,
           folderId: this.$store.state.cloud.curItem.id
         }).then((res)=>{
           let uploadItem={
             name:file.name,
             status:file.status,
             size:file.size,
             opt:this.$store.state.cloud.curItem.fullName,
           }
           this.files.push(uploadItem);
          this.$nextTick(_=>{
            this.$refs.uploadModal.open();
          })


         })
      },
      //分页
      changePage(value) {
        this.pagesInfo.pageNo=value;
        this.searchList()
      },
      searchList(item){
        let param = this.pagesInfo;
        if (item) {
          item=JSON.parse(item)
          param.folderId = item.id;
          if(item.type&&item.type!=1)return;
        }
        cloud.api.myFileSearch(param).then(res => {
          this.data1 = res.page.records;
          this.total=res.page.total;
          this.data1.map((item, index) => {
            item.src = buildDownloadUrl(item.attachmentUuid);
          })
        })
      },
    },

    created(){
    },

    mounted(){
      this.searchList();
    },
  }
</script>
