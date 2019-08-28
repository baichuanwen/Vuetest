<template>
  <div class="animated fadeIn">
    <Row>
      <i-col span="24">首页</i-col>
    </Row>
    <Row style="margin-bottom: 20px;">
      <i-col span="4"><i-button type="primary"  @click="createFloder()">创建共享</i-button> <i-button type="error" @click="delete2()">删除</i-button></i-col>
      <i-col span="15"> &nbsp; &nbsp;</i-col>
      <i-col span="4" ><i-input icon="ios-clock-outline" placeholder="请输入..." v-model="pagesInfo.condition"  style="width: 200px" @click.native="searchList(true)"></i-input></i-col>
    </Row>
    <Row>
      <tableList ref="tableList" @searchList="searchList()" :data1="data1"></tableList>
    </Row>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total" :current="pagesInfo.pageNo" @on-change="changePage"></Page>
      </div>
    </div>
        <sharePubModal ref="sharePubModal" @createShare="createShare"></sharePubModal>
  </div>
</template>
<script>
  import cloud from '../module';
  import sharePubModal from '../components/sharePubModal';
  import tableList from '../components/tableList';
  export default {
    data() {
      return {
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
          "folderId":null,
          "orderType":2,
          "orderField":"createTime"
        },
        data1: []
      }
    },
    components:{
      sharePubModal,
      tableList
    },
  methods:{
    createFloder(){
      this.$refs.sharePubModal.open()
    },
    createShare(shareName){
      this.createFileParam.name=shareName;
      cloud.api.createFile(this.createFileParam).then((res)=>{
        this.searchList();
        this.$gcb.tooltip.open({
          message: "文件创建成功",
          timeout: 2000
        });
      })

    },
    delete2(){
      this.$refs.tableList.delete2()
    },
    //分页
    changePage(value) {
      this.pagesInfo.pageNo=value;
      this.searchList()
    },
    searchList(isSearch){
      if(isSearch){
        this.pagesInfo.pageNo=1;
      }
      let param=this.pagesInfo;
      cloud.api.myFileSearch(param).then( res=>{
        console.log(res.page.records)
        this.data1=res.page.records;
        this.total=res.page.total;
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
