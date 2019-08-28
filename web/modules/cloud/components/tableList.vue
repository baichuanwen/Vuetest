<template>
<div>
  <Table stripe :columns="columns4" :data="data1"  @on-selection-change="show">
    <template slot-scope="{ row, index }" slot="fullName" >
      <div class="pull-left img-box mar-right-10" v-show="row.type != 1" style="cursor: pointer" @click="goSub(row)">
        <img :src="row.src" v-show="showType(row).isImg" style="height: 30px; width: 30px;">
        <img src="../cad.png" v-show="showType(row).isCad">
        <img src="../excel.png" v-show="showType(row).isExcel">
        <img src="../pdf.png" v-show="showType(row).isPdf">
        <img src="../ppt.png" v-show="showType(row).isPpt">
        <img src="../word.png" v-show="showType(row).isWord">
        <img src="../unknown.png" v-show="showType(row).isOther">
      </div>
      <img class="pull-left " src="../file.png" style="cursor: pointer" v-show="row.type == 1" @click="goSub(row)">
      <span v-show="!row.showEdit" @click="goSub(row)" class="mar-left-5" style="cursor: pointer">{{row.fullName}}</span>
      <form class="rename pull-left" v-show="row.showEdit">
        <input type="text" class="form-control" v-model="row.subName" :maxlength="row.type == 1? 60 : 250">
        <span class="text-primary mar-left-5 cursor-pot" @click="confirmRename(row)">确定</span>
        <span class="col-grey mar-left-5 cursor-pot" @click="row.showEdit = false;">取消</span>
      </form>
    </template>
    <template slot-scope="{ row, index }" slot="shareSize">
      <span class="cursor-pot" v-show="row.shareType !=1 && row.type == 1" ng-click="showEmployee(item)">{{row.shareSize}}</span>
      <span v-show="row.shareType == 1 && row.type == 1">全体成员</span>
      <span v-show="row.type != 1">-</span>
    </template>
    <template slot-scope="{ row, index }" slot="createTime">
      <span class="cursor-pot" >{{row.createTime|YYYYMMDDHHMM}}</span>
    </template>
    <template slot-scope="{ row, index }" slot="opt">
      <Dropdown trigger="click" style="margin-left: 20px">
        <p style="color: #248bfe; cursor: pointer; font-size: 20px;">
          <img src="../more.png" alt="">
          <Icon type="arrow-down-b"></Icon>
        </p>
        <Dropdown-menu slot="list">
          <Dropdown-item v-show="row.canEdit" @click.native="delete2([row.id]);" >删除</Dropdown-item>
          <Dropdown-item  v-show="row.canEdit" @click.native="rename(row);">重命名</Dropdown-item>
          <copyModal :title="title" :item="row" @childSearch="childSearch()" ref="copyModal"></copyModal>
          <Dropdown-item v-show="row.canEdit&&index!=0" @click.native="setTop(row);">置顶</Dropdown-item>
          <Dropdown-item v-show="row.canEdit&&index==0" @click.native="cancelTop(row);">取消置顶</Dropdown-item>
          <Dropdown-item>共享</Dropdown-item>
          <Dropdown-item v-show="row.canEdit" @click.native="copy(row);">复制</Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
    </template>
  </Table>
</div>
</template>

<script>
  import cloud from '../module';
  import copyModal from '../copyModal';
  import {
    buildDownloadUrl,
    getFileType,
    hasPermission,
    getFileSize
  } from "@/libs/tools";
  export default {
    components:{
      copyModal,
    },
   data(){
     return{
       ids:[],
       item:null,
       curItem:null,
       columns4: [
         {
           type: 'selection',
           width: 60,
           align: 'center',
           sortable: true
         },
         {
           title: '文件名',
           key: 'fullName',
           slot:"fullName"
         },
         {
           title: '创建者',
           key: 'employeeName'
         },
         {
           title: '大小',
           key: 'sizeToString',
           sortable: true
         }, {
           title: '共享成员数',
           slot: 'shareSize'
         },
         {
           title: '创建时间',

           sortable: true,
           slot: 'createTime'
         },
         {
           title: '操作',
           key: 'opt',
           slot:"opt"
         }
       ],
     }
   },
    props:{
      data1:{
        type: Array
      },
      isSub:{
        type:Boolean
      },
      value:{
        default:null,
      },
    },
    computed:{
      title:function () {
        return this.$route.meta.title;
      }
    },
    methods:{
      show(index){
        this.ids=index.map(item=>item.id);
      },
      showType(file) {
        return getFileType(file);
      },
      delete2(ids){
        if(ids){
          this.ids=ids;
        }
        this.$gcb.gcbModal
          .open({
            content: "您确定删除 "+ this.ids.length+ "吗",
            icon: "danger"
          })
          .then(() => {
            cloud.api.deleteFile({ids:this.ids}).then(()=>{
              this.$gcb.tooltip.open({
                message: "删除成功！",
                timeout: 2000
              });
            this.$emit("searchList")
            })
          });
      },
      rename(row){
        this.$set(row, 'showEdit', true);
        row.subName=row.fullName;
      },
      confirmRename(item){
        if (item.fullName == item.subName) {
          item.showEdit = false;
          return;
        }
        if (!item.subName) {
          this.$gcb.tooltip.open({
            icon: "warning",
            message: "请输入文件或文件夹名称！",
            timeout: 2000
          });
          return;
        }
        cloud.api.renameFile({
          id: item.id,
          name: item.subName
        }).then( () =>{
          this.$gcb.tooltip.open({
            message: "修改成功",
            timeout: 2000
          });
          this.$emit("searchList")
          item.showEdit = false;
        })

      },
      childSearch(){
        this.$emit("searchList")
      },
      // 置顶
      setTop(item) {
        cloud.api.setTop({
          id: item.id
        }).then( () =>{
          this.$emit("searchList")
        })
      },
      // 置顶
      cancelTop(item) {
        cloud.api.cancelTop({
          id: item.id
        }).then( () =>{
          this.$emit("searchList")
        })
      },
      copy(item){
        this.item=item;
        this.$refs.copyModal.open(item);
        this.$refs.copyModal.searchFloder({
          fileSubjectionType: 1,
          condition: null,
          fileType: 1,
          folderId: null
        })

      },
      // 查看大图
      showImg(index, img) {
        let imagsArray =[];
        let src=buildDownloadUrl(img.attachmentUuid);
        imagsArray.push(src);
       this.$gcb.gcbImgViewer.show({images: imagsArray, index: index});
      },
      onLineFile(uuid) {
        cloud.api.getOnlineUrl({uuid: uuid}).then(res => {
          if(res.error){
            this.$gcb.tooltip.open({message:res.error.message,icon:"warning"})
          }else{
            window.open(res);
          }
        })
      },

      // 点击进入二级
      goSub(item) {
        if (item.type != 1) {
          if(this.showType(item).isImg){
              this.showImg(0,item)
          }else{
            this.onLineFile(item.attachmentUuid);
          }
          return;
        };

        if(this.isSub){
           this.$store.commit("setBreads",item);
            this.$emit("searchList",JSON.stringify(item))
        }else{
          this.$router.push({name:"cloudEnterpriseSub", params:{id: item.id}});
          this.$store.commit("setBreads",item);
        }

      },
    },
    mounted(){

    }
  }
</script>
<style lang="less" scoped >
  .ivu-table,.ivu-table-wrapper{
    overflow: inherit !important;
  }

  .mar-left-10{
    margin-left: 10px;
  }
  .mar-left-5{
    margin-left: 5px;
  }
  .width-200{
    width: 200px;
  }
  .header .operation {
    margin-top: 15px;
  }
  .mar-right-5 {
    margin-right: 5px;
  }
  .mar-5 {
    margin-top: 5px;
    margin-right: 10px;
  }
  .col-grey {
    color: #939BA4;
  }
  .header .title {
    font-size: 16px;
    margin-bottom: 20px;
    /*color: #666666;*/
  }
  /*表格*/
  .table label {
    margin: 0;
  }

  .table tbody .rename {
    display: inline-block;
  }

  .table tbody .rename input {
    display: inline-block;
    width: auto;
  }

  .table tbody .img-box {
    display: inline-block;
    height: 30px;
    width: 30px;
  }

  .table tbody .img-box img {
    height: 100%;
    width: 100%;
  }

  .table tbody tr td {
    line-height: 30px;
    border-top: none;
  }

  .table tbody tr td:nth-child(1), .table thead tr th:nth-child(1) {
    width: 50px;
  }

  .table tbody tr td:nth-child(2), .table thead tr th:nth-child(2) {
    padding-left: 15px;
  }

  .table tbody tr td:nth-child(3), .table thead tr th:nth-child(3) {
    padding-left: 25px;
  }

  .date-img {
    margin-left: 5px;
  }
  /*操作选项ui调整4.0*/
  .handle-wrap {
    position: relative;
  }

  .handle-wrap div {
    display: inline-block;
  }

  .handle-wrap .more img {
    z-index: -1;
  }

  .handle-wrap .download {
    padding-right: 10px;
  }

  .handle-wrap .handle {
    position: absolute;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
  .handle-wrap .handle {
    text-align: center;
    width: 100px;
    /*padding: 5px 30px;*/
    z-index: 999;
    border-radius: 5px;
    border: 1px solid #e2e4e9;
  }
  .position {
    margin-left: 37px;
  }
  .text-primary:hover {
    /*display: inline-block;*/
    /*text-decoration: underline;*/
    background-color: #edf0f5;
    color: #248bfe;
  }
  .isShow{
    visibility: hidden;
  }

</style>
