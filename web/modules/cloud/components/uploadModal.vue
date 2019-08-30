<template>
  <b-modal id="readModal" size="lg"  class="w-700"    ref="gcbReadRecords" >
    <div slot="modal-header">上传文件</div>
    <div class="modal-content  h-400" >
      <div class="modal-body clearfix">
        <Table stripe :columns="columns4" :data="data1" >
<!--          <template slot-scope="{ row, index }" slot="fullName" >-->
<!--            <div class="pull-left img-box mar-right-10" v-show="row.type != 1" style="cursor: pointer" @click="goSub(row)">-->
<!--&lt;!&ndash;          <img :src="row.src" v-show="showType(row).isImg" style="height: 30px; width: 30px;">&ndash;&gt;-->
<!--              <img src="../cad.png" v-show="showType(row).isCad">-->
<!--              <img src="../excel.png" v-show="showType(row).isExcel">-->
<!--              <img src="../pdf.png" v-show="showType(row).isPdf">-->
<!--              <img src="../ppt.png" v-show="showType(row).isPpt">-->
<!--              <img src="../word.png" v-show="showType(row).isWord">-->
<!--              <img src="../unknown.png" v-show="showType(row).isOther">-->
<!--            </div>-->
<!--            <img class="pull-left " src="../file.png" style="cursor: pointer" v-show="row.type == 1" ">-->
<!--            <span  class="mar-left-5" style="cursor: pointer">{{row.fullName}}</span>-->
<!--          </template>-->
           <template slot-scope="{ row, index }" slot="size">
            <span class="cursor-pot" >{{row.size|getFileSize}}</span>
          </template>
        </Table>
      </div>
    </div>
    <div slot="modal-footer">
      <Row style="margin-bottom: 20px;">
        <i-col span="12">
          <Upload multiple :show-upload-list="false" with-credentials :on-success="upload" action="https://a.gcb365.com/api/web/file/upload">
            <Button type="primary" size="large"> 文件添加 </Button>
        </Upload>
        </i-col>
        <i-col span="12">
         <Button type="default" size="large" @click="close">关闭</Button>
        </i-col>
      </Row>
    </div>
  </b-modal>
</template>

<script>
  import cloud from '../module';
  import { buildDownloadUrl, getFileType, getFileSize } from "@/libs/tools";
  export default {
    components: {},

    data(){
     return{
       sharePubName:"",
       isnull:false,
       columns4: [
         {
           title: '文件名',
           key: 'name',
         },

         {
           title: '大小',
           key: 'size',
           slot:"size"
         },

         {
           title: '所在目录',
           key: 'opt',

         },
         {
           title: '状态',
           key: 'status',
         }

       ],
     }
   },
    props:{
      value:{
        default:null,
      },
      data1:{
        type:Array,
        default:[
          {
            contentType: 1,
            fileName: 2,
            id: 2,
            size: 3,
            uuid: 4
         }
        ]
      }
    },
    methods:{
      getfiles() {
        if (this.attachments && this.attachments.length) {
          this.attachments.map((v, index) => {
            this.appendix.push(v.uuid);
            v.src = buildDownloadUrl(v.uuid, v.fileName);
            if (getFileType(v).isImg) {
              this.imgs.push(v);
            } else {
              this.files.push(v);
            }
          })
          this.$emit("input", this.appendix);
        }
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
          this.data1.push(uploadItem);
        })
      },
      showType(item) {
        return getFileType(item);
      },
      open() {
        this.sharePubName='';
        this.$refs.gcbReadRecords.show();
      },
      close() {
        this.$refs.gcbReadRecords.hide();
        let item=JSON.stringify(this.$store.state.cloud.curItem)
        this.$emit("searchList",item)
        this.$parent.files=[];
        this.data1=[];
      },
      handleAction() {
        if(this.sharePubName==''||this.sharePubName==undefined){
          this.isnull=true;
          return;
        }else{
          this.isnull=false
        }
        this.$emit('createShare', this.sharePubName);
        this.close();
      },
    },
    mounted(){}
  }
</script>
<style lang="less" scoped>
  .header{
    height: 60px;
    line-height: 60px;
  }
  .font-18{
    font-size: 18px;
  }
  .w90{
    width: 90px;
  }
  .form-control:focus {
    border-color: #0093dd;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(0, 147, 221, 0.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(0, 147, 221, 0.6);
  }
  .ml5{
    margin-left: 5px;
  }
  .lh40{
    line-height: 40px;
  }
  .lh45{
    line-height: 45px;
  }
  .point{
    cursor: pointer;
  }
  .list{
    padding: 10px 20px;
    background-color: #fff;
    margin-bottom:10px;
  }
  .colGreen{
    color:#4aa55d;
  }
  .modal-content{
    border: none;
  }
  .colGrey{
    color: #939BA4;
  }
  .h-400{
    min-height: 450px !important;
  }
  .listHead .handle{
    float: left;
    width: 120px;
    height: 30px;
    line-height: 30px;
    background-color: #F8F8F8;
    border-radius: 15px;
    margin-top:5px;
    margin-left:60px;
  }
  .listHead .pull-right .colGreen{
    margin-right:40px;
  }
  .listHead .handle div{
    width: 50%;
    float: left;
    text-align: center;
  }
  .listContent{
    border-top:1px dashed #ddd;
  }
  .contentItem{
    font-size: 14px;
    padding:20px 0;
  }
  .contentItem .pull-right{
    position: relative;
  }
  .contentItem .pull-right span{
    float: left;
    width: 60px;
    text-align: center;
  }
  .contentItem .pull-right .line{
    position: absolute;
    right: 50%;
    height: 10px;
    top:5px;
    border-left:1px solid #e2e4e8;
  }
</style>
