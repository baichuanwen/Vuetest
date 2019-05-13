<template>
  <div>
    <p class="main-title">附件   <span style="color:#333" class="col-grey font-14">(<span :class="{'text-primary':files.length != 0 || imgs.length != 0}">{{files.length + imgs.length || 0}}</span>/9)</span> </p>
    <div class="upload_text-box" v-if="files !== null">
      <p class="mb-10" v-for="(item,index) in files">
        <img src="../../../static/img/cad.png" v-show="showType(item).isCad">
        <img src="../../../static/img/excel.png" v-show="showType(item).isExcel">
        <img src="../../../static/img/pdf.png" v-show="showType(item).isPdf">
        <img src="../../../static/img/ppt.png" v-show="showType(item).isPpt">
        <img src="../../../static/img/word.png" v-show="showType(item).isWord">
        <img src="../../../static/img/unknown.png" v-show="showType(item).isOther">
        <span @click="onLineFile(item.uuid)">{{item.fileName}}</span>
        <span class="upload_file-size col-f1">{{item.size|getFileSize }}</span>
        <span class="text-danger upload_file-delete point" @click="deleteFile(0,index)">删除</span>
      </p>
    </div>
    <div class="upload_img-box" v-for="(img,index) in imgs">
      <div class="img-item"  :style="{ 'background-image': 'url(' + img.src + ')','background-position': 'center center','background-repeat':'no-repeat','background-size':'cover' }"  @click="showImg(index, imgs)"></div>
      <span class="upload_img-delete fa fa-times" :class="{'active':img.isActive}" @mouseover="img.isActive = true;" @mouseleave="img.isActive = false" @click="deleteFile(1,index)"></span>
    </div>
    <Upload multiple :show-upload-list="false" with-credentials :on-success="upload" action="http://dev.gcb365.com/api/web/file/upload">
      <Button type="primary" size="large"> 上传附件 </Button>
    </Upload>
  </div>
</template>
<script>
import Component from "../module";
import { buildDownloadUrl, getFileType, getFileSize } from "@/libs/tools";
export default {
  //todo action 地址需要变更！！
  name: "gcb-ueditor",
  data() {
    return {
      imgs: [],
      files: [],
      appendix: [],
      attachments:[]
    };
  },

  props: {
    attachment:{
      type: Array
    },
    value:{
     default:null,
    },
  },
  methods: {
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
    // 查看大图
    showImg(index, imgs) {
      let imagsArray = [];
      imgs.forEach(function (v, i) {
        imagsArray[i] = v.src;
      });
      this.$gcb.gcbImgViewer.show({images: imagsArray, index: index});
    },
    showType(item) {
      return getFileType(item);
    },
    upload(res, file, $files) {
      if (this.files.length + this.imgs.length > 8) {
        this.$gcb.tooltip.open({
          message: "最多支持上传9个附件，请返回修改后再上传！",
          icon: "warning"
        });
        return;
      }
      res.body.src = buildDownloadUrl(res.body.uuid);
      if (res.body.contentType.indexOf("image") != -1) {
        res.body.isActive = false;
        this.imgs.push(res.body);
      } else {
        this.files.push(res.body);
      }
      this.appendix = [];
      this.imgs.forEach(img => {
        this.appendix.push(img.uuid);
      });
      this.files.forEach(file => {
        this.appendix.push(file.uuid);
      });
      if (this.appendix.length == 0) {
        this.appendix = null;
      }
      this.$emit("input", this.appendix);
    },
    deleteFile(type, index) {
      if (type == 0) {
        this.files.splice(index, 1);
      } else {
        this.imgs.splice(index, 1);
      }
      this.appendix = [];
      this.imgs.forEach(img => {
        this.appendix.push(img.uuid);
      });
      this.files.forEach(file => {
        this.appendix.push(file.uuid);
      });
      if (this.appendix.length == 0) {
        this.appendix = null;
      }
      this.$emit("input", this.appendix);
    },
    onLineFile(uuid) {
      Component.api.file.getOnlineUrl({uuid: uuid}).then(res => {
        if(res.error){
          this.$gcb.tooltip.open({message:res.error.message,icon:"warning"})
        }else{
          window.open(res);
        }

      })
    }
  },
  watch:{
    attachment:{
      handler(val,old){
          this.attachments=val;
          this.attachments.map((item,index)=>{
            if(item.fileSize){
              item.size=item.fileSize
            }
          })
          this.getfiles();
      }

    }
  }
};
</script>
<style>
/*上传附件*/
.upload_btn {
  margin-top: 5px;
}
.main-title {
  height: 14px;
  line-height: 14px;
  border-left: 3px solid #248bfe;
  padding-left: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  color: #248bfe;
}
.upload_img-box {
  height: 80px;
  width: 80px;

  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  position: relative;
}
.img-item {
  background: no-repeat center center;
  width: 100%;
  height: 100%;
  background-size: cover;
}
.upload_text-box {
  margin-bottom: 15px;
  font-size: 14px;
}
.mb-10{
  margin-bottom: 10px;
}
.upload_img-delete {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 19px;
  color: #cccccc;
}

.upload_img-delete.active {
  color: red;
}

.upload_file-size {
  margin-left: 15px;
}

.upload_file-delete {
  margin-left: 15px;
}

</style>
