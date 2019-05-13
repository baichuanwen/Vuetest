<template>
  <div class="animated fadeIn" id="announceDetail">
    <Row class="announce-detail-top header">
        <Col span="12">公告详情</Col>
        <Col span="12">
        <Button size="large" style="background:#4aa55d;color:#fff" @click="edit()">编辑</Button>
          <Button size="large" style="background:#ea1c0d;color:#fff;margin-right:25px" @click="createDeleteModal()">删除</Button>
          <Button size="large" @click="cancel">返回</Button>
        </Col>
    </Row>
    <span class="topicon" v-show="item.isTop== true"> </span>
    <Row class="announce-detail-center items-box">
        <!--控制按钮-->
        <div class="controls">
            <span class="pre pull-left fa fa-chevron-left" @click="pre()"></span>
            <span class="next pull-right fa fa-chevron-right" @click="next()"></span>
        </div>

        <div class="items">
            <div class="text-center font-18">{{item.title}}</div>

            <div class="info clearfix">
                <div class="pull-left ">
                    <span class="col-939">发布时间：{{item.createTime | parseTime}}</span>
                    <span class="col-939">发布人：{{item.publisher}}</span>
                </div>
                <div class="pull-right">
                    <span class="fa fa-eye col-f1"></span>
                    <span class="col-248 scan" @click="createReadModal">浏览 {{item.browseCount}}</span>
                </div>
            </div>

            <div class="content" id="divContent" v-html="item.content"></div>

            <div class="info-person">
                <span class="col-939">编辑人：{{item.employee.employeeName}}</span>
                <span class="col-939">接收人：{{item.receiverName}}</span>
            </div>
        </div>
    </Row>
    <!--附件-->
    <div class="attachment" v-show="item.announcentAttachments.length != 0">
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
  </div>
</template>

<script>
import Component from "@/gcbcomponents/module";
import Announce from "./module";
import {
  getWeek,
  buildDownloadUrl,
  getFileType,
  hasPermission,
  getFileSize
} from "@/libs/tools";
export default {
  name: "announce-detail",
  data() {
    return {
      item: {
        employee: {
          employeeName: ''
        },
        announcentAttachments: []
      },
      files: [],
      imgs: [],
      filesType: {},
      params: {},
      index: 0,
      listIds: [],
      total: 0,
    };
  },
  methods: {
    createReadModal() {
      let self = this;
      let postInfo = {
        announcementId: this.$route.params.id.id,
        condition: null,
        isRead: null
      };
      Announce.api.announce.historySearch(postInfo).then(list => {
        Announce.api.announce.recordSearch(postInfo).then(res => {
          this.$gcb.gcbReadRecord.open({
            datas: list,
            type: "announce",
            params: res,
            announcementId: this.$route.params.id.id,
            hasPermission: hasPermission([116, 117])
          });
        });
      });
    },
    showType(file) {
      return getFileType(file);
    },
    // 删除
    createDeleteModal() {
      this.$gcb.gcbModal
        .open({
          title: "提示",
          content: "确定删除这条公告吗？",
          icon: "danger"
        })
        .then(() => {
          Announce.api.announce
            .detailDelete({ id: this.$route.params.id.id })
            .then(result => {
              this.$gcb.tooltip.open({
                message: "删除成功!"
              });
              this.$router.push("/announce/list");
            });
        });
    },
    // 编辑
    edit() {
      this.$router.push({
        name: "announceEdit",
        params: { id: this.$route.params.id.id }
      });
    },
    // 取消
    cancel() {
      this.$router.push("/announce/list");
    },
      // 查看大图
    showImg(index, imgs) {
      let imagsArray = [];
      imgs.forEach(function(v, i) {
         imagsArray[i] = v.src;
      })
       this.$gcb.gcbImgViewer.show({images: imagsArray,index: index});
    },
    detailSearch(id) {
      let that = this;
    Announce.api.announce.detailSearch({ id: id }).then(res => {
      if(res.error){
        this.$gcb.tooltip.open({
          message: res.error.message,
          icon: "warning"
        });
      } else {
          if (res.announcentAttachments) {
            res.announcentAttachments.forEach(function(v) {
            v.src = buildDownloadUrl(v.uuid, v.fileName);
            if (getFileType(v).isImg) {
              that.imgs.push(v);
            } else {
              that.files.push(v);
            }
          });
        }
        if (that.item.receiverName != "全体员工" && that.item.receiverName) {
          that.item.receiverName = that.item.receiverName.substring(0, that.item.receiverName.length - 1);
        }
        that.item = res;
      }
      })
    },
    // 附件预览
      onLineFile(uuid) {
      Component.api.file.getOnlineUrl({uuid: uuid}).then(function (url) {
        window.open(url);
      });
    },
    // 上一个
    pre() {
      let that = this;
      if (!this.listIds) return;
      if (this.params.page == 1 && this.index == 0) {
        this.$gcb.tooltip.open({
          message: "无上一篇!",
          icon: "warning"
        });
        return;
      };
       if(this.index == 0 && this.params.page > 1) {
        this.params.page--;
       Announce.api.announce.listSearch(this.params).then(result => {
         result.records.forEach(function (v, i) {
                            that.listIds[i] = v.id;
                        });
        that.files = [];
        that.imgs = [];
        that.index = that.params.pageSize - 1;
        that.detailSearch(that.listIds[that.index])
      });
      return;
      }
        that.index--;
        that.imgs = [];
        that.files = [];
        that.detailSearch(that.listIds[that.index]);
    },
    // 下一个
       next() {
      let that = this;
      if (!this.$route.params.id.listIds) return;
      if (this.params.page == Math.ceil(this.total / this.params.pageSize) && this.index == this.listIds.length - 1) {
        this.$gcb.tooltip.open({
          message: "无下一篇!",
          icon: "warning"
        });
        return;
      };
       if(this.params.page < Math.ceil(this.total / this.params.pageSize) && this.index == this.listIds.length - 1) {
        this.params.page--;
       Announce.api.announce.listSearch(this.params).then(result => {
         result.records.forEach(function (v, i) {
                            that.listIds[i] = v.id;
                        });
        that.files = [];
        that.imgs = [];
        that.index = 0;
        that.detailSearch(that.listIds[that.index])
      });
      return;
      }
        that.index++;
        that.imgs = [];
        that.files = [];
        that.detailSearch(that.listIds[that.index]);
    }
  },
  mounted: function() {
    if (this.$route.params.id.listIds) {
      this.listIds = this.$route.params.id.listIds;
        this.index = this.$route.params.id.listIds.indexOf(parseFloat(this.$route.params.id.id));
        this.total = this.$route.params.id.total;
      }
    if (sessionStorage.getItem("vueParams")) {
      this.params = JSON.parse(sessionStorage.getItem("vueParams"));
    }
    this.detailSearch(this.$route.params.id.id);
  }
};
</script>
<style lang="less" slot-scope="true">
.app-body .main {
  padding-top: 0;
}
#announceDetail {
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
    margin-right: 40px !important;
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
  .announce-detail-top {
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
    background: url("/client/business/announce/images/Istop.png") center
      no-repeat;
  }
  .items {
    padding: 25px 40px 20px 40px;
    background-color: #ffffff;
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
  .announce-detail-center {
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
}
</style>
