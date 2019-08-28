<template>
  <div>

  </div>
</template>
<script>
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
      upload(res, file, $files) {
        this.$emit("input", res.body.uuid);
      },
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
