<template>
  <div>
    <b-modal class="" size="lg" ref="gcbModal">
      <div slot="modal-header" class="text-left">选择目标文件夹</div>
      <Row  :gutter="16">
        <Col >
          <Breadcrumb style="cursor: pointer">
            <Breadcrumb-item @click.native="breads=[]; searchFloder({folderId:null,fileType:1})">{{title}}</Breadcrumb-item>
            <Breadcrumb-item  v-for="(item,index) in breads" :key="index" @click.native="gobreadFloader(item)" >{{item.name}}</Breadcrumb-item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row :gutter="16">
        <Col class="content">
          <div  style="height:420px; overflow-y: auto">
            <table  class="table table-Modal table-hover table-sub">
              <tr v-for="(item,index) in datas" @click="gosubFloader(item)">
                <td>
                  <img class="pull-left mar-5" src="./file.png">
                  <span class="pull-left" ng-class="{'cursor-pot':item.type == 1}" :title="item.fullName" style="max-width:250px;text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">{{item.fullName}}</span>
                </td>
              </tr>
            </table>
          </div>
        </Col>
      </Row>
      <div slot="modal-footer">
        <Button type="primary" @click="copy(item)" style="margin-right: 8px;" size="large">确定</Button>
        <Button type="default" size="large" @click="close">取消</Button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import cloud from "./module"
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      item:{
        type: Object
      },
    },
    data() {
      return {
        request :{
          fileSubjectionType: 1,
          condition: null,
          fileType: 1,
          folderId: null
        },
        curItem:null,
        fromFloderId:null,//复制res复制来源id
        containUpload:null,//quanxian
        breads:[],
        datas:[],
      }
    },
    methods: {
      searchFloder(reqeust){
        let resq=Object.assign(this.request,reqeust);
        cloud.api.myFileSearch(resq).then((res)=>{
         this.datas=res.page.records;
         this.containUpload=res.containUpload;
        })
      },
      gobreadFloader(item){
        this.curItem=item;
        this.breads.forEach((iitem,index)=>{
          if(iitem.id==item.id){
            this.breads.splice(index + 1);
            this.searchFloder({
              folderId: item.id,
              fileType: 1
            })
          }
        })
      },
      gosubFloader(item){
        if(this.curItem.id==item.parentId){
          this.breads.push({
            name: item.fullName,
            id: item.id
          })
        }else{
          this.breads=[{
            name: item.fullName,
            id: item.id
          }]
        }
          this.curItem=item;

        this.searchFloder({
          folderId: item.id,
          fileType: 1
        })
      },
      copy(item){
        if (!this.containUpload) {
          this.$gcb.tooltip.open({
            title: "提示",
            icon: "warning",
            message: "对不起，您没有上传权限，请联系管理人员赋予权限",
            timeout: 2000
          });
          return;
        };
        if(!this.fromFloderId) {alert(1);return;}
        if (item.type == 1) {
          let copeval = {
            folderId: this.fromFloderId,
            targetFolderId:this.curItem.id,
            moveWay: 1
          }
          cloud.api.fileCopy(copeval).then( (result) =>{
            this.close();
            this.$gcb.tooltip.open({
              message: "文件夹复制成功",
              timeout: 2000
            })
            this.$emit("childSearch")
          })
        }else {
          let removal = {
            folderId:this.curItem.id ,
            ids: [this.fromFloderId],
            moveWay: 1
          }
          cloud.api.fileRemoval(removal).then( (result) =>{
            this.close();
            this.$gcb.tooltip.open({
              message: "复制成功",
              timeout: 2000
            })
            this.$emit("childSearch")
          })
        }
      },
      open(item) {
        this.$refs.gcbModal.show();
        if(item){
          this.fromFloderId=item.id;
        }
        this.curItem={},
        this.breads=[];
      },
      close() {
        this.breads=[];
        this.curItem={},
        this.fromFloderId=null;
        this.$refs.gcbModal.hide()
      },
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  td {
    cursor: pointer;
    padding: 10px;
    border: none;

    img{
      margin-right: 10px;
    }
  }
  td:hover{
    background: rgba(0,0,0,.1);
  }
</style>
