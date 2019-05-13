<template>
  <!--附件-->
  <div class="attachment" v-if="attachments.length">
    <div class="attach-title">
      <span class="font-16">附件</span>
      <span>(<span class="text-primary">{{files.length + imgs.length}}</span>/9)</span>
    </div>
    <div class="text-box">
      <p v-for="item in files" class="margin-10">
        <img src="../../../static/img/cad.png" v-show="showType(item).isCad">
        <img src="../../../static/img/excel.png" v-show="showType(item).isExcel">
        <img src="../../../static/img/pdf.png" v-show="showType(item).isPdf">
        <img src="../../../static/img/ppt.png" v-show="showType(item).isPpt">
        <img src="../../../static/img/word.png" v-show="showType(item).isWord">
        <img src="../../../static/img/unknown.png" v-show="showType(item).isOther">
        <span @click="onLineFile(item.uuid)" class="mar-left-5">{{item.fileName}}</span>
        <span class="file-size col-grey">{{item.fileSize | getFileSize}}</span>
        <a class="text-primary download" :href="item.src">下载</a>
      </p>
    </div>
    <div class="img-box" v-for="(item, index) in imgs" v-bind:style="{ 'background-image': 'url(' + item.src + ')','background-position': 'center center','background-repeat':'no-repeat','background-size':'cover' }" @click="showImg(index, imgs)"></div>
  </div>
</template>
<script>
import Component from "../module";
import { buildDownloadUrl, getFileType, getFileSize } from "@/libs/tools";
export default {
  name: "gcb-upload-detail",
  data() {
    return {
      files: [],
      imgs: [],
    };
  },
  props: {
    attachments:{
      type: Array
    },
  },
  methods: {
    getfiles() {
      if (this.attachments && this.attachments.length) {
        this.imgs=[];
        this.files=[];
        this.attachments.map((v, index) => {
          v.src = buildDownloadUrl(v.uuid, v.fileName);
          if (getFileType(v).isImg) {
            this.imgs.push(v);
          } else {
            this.files.push(v);
          }
        })
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
  mounted(){
    this.getfiles()
  }
};
</script>
<style lang="less" scoped>
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

</style>
