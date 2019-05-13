<template>
  <div class="animated fadeIn">
    <Row class="announce-edit-top">
        <Col span="12">编辑公告</Col>
        <Col span="12">
          <Button type="primary" size="large" @click="save">发布</Button>
          <Button size="large" @click="cancel">取消</Button>
        </Col>
    </Row>
    <Row class="announce-edit-center">
      <Form ref="formTop">
          <FormItem>
              <p class="title">公告标题 <span>*</span> </p>
              <Input v-model="title" :maxlength="30" size="large" placeholder="请输入公告标题"></Input>
          </FormItem>
          <FormItem>
              <p class="title">公告内容 <span>*</span> </p>
              <gcbUeditor :placeholder="ueconfig.placeholder" :config="ueconfig.config" :id="ueconfig.id" ref="ue"></gcbUeditor>
          </FormItem>
          <FormItem>
              <p class="title">发布人 <span>*</span> </p>
              <Input v-model="publisher" size="large" :maxlength="30"></Input>
          </FormItem>
          <FormItem>
              <p class="title">接收人</p>
              <Input size="large" icon="person" v-model="receiver" placeholder="请选择接收人" @click.native="employeeMAgainSelect"></Input>
              <p class="tip"><i class="fa fa-exclamation-circle"></i>&nbsp; 提示：未选择人员，默认为全体人员</p>
          </FormItem>
           <FormItem>
               <gcbUpload :attachment="attachment"v-model="appendix"></gcbUpload>
          </FormItem>
          <FormItem>
            <Button type="primary" size="large" @click="save">发布</Button>
            <Button @click="cancel" size="large">取消</Button>
          </FormItem>
      </Form>
    </Row>
  </div>
</template>

<script>
import Announce from "./module";
import {
  getWeek,
  buildDownloadUrl,
  getFileType,
  hasPermission,
  getFileSize
} from "@/libs/tools";
export default {
  name: "announce-edit",
  data() {
    return {
      editor: null,
      // 编辑器配置文件
      ueconfig: {
        id: "ue1",
        placeholder: "",
        defaultMsg: "",
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
      },
      employee: {},
      appendix: [],
      receiverIds: "",
      attachment: [],
      publisher: "",
      title: "",
      receiver: ""
    };
  },
  methods: {
        // 接收人
    async employeeMAgainSelect() {
      this.employee = await this.$gcb.gcbEmployee.open({
        // 单选多选模式
        multiple: true,
        isAuthData: false,
        isIncludeSelf: true,
        isIncludeDescendants: true,
        selectItem: this.employee
      });
       this.receiver = "";
      this.receiverIds = "";
      let that = this;
      this.employee.forEach(function(v, i) {
        that.receiver += i == that.employee.length - 1 ? v.employeeName : v.employeeName + "、";
        that.receiverIds += i == that.employee.length - 1 ? v.id : v.id + ",";
      });
    },
    showType(file) {
      return getFileType(file);
    },
    // 取消
    cancel() {
      this.$gcb.gcbModal
        .open({
          content: "确定放弃当前添加内容",
          icon: "unknown"
        })
        .then(() => {
          this.$router.push("/announce/list");
        });
    },
    // 发布
    save() {
        if(!this.title) {
        this.$gcb.tooltip.open({
          message: "标题不能为空！",
          icon: "warning"
        });
        return;
      }
      if(!this.$refs.ue.getUEContentTxt()) {
        this.$gcb.tooltip.open({
          message: "内容不能为空！",
          icon: "warning"
        });
        return;
      }
       if(this.publisher == '') {
        this.$gcb.tooltip.open({
          message: "发布人不能为空！",
          icon: "warning"
        });
        return;
      }
       if(this.$refs.ue.getUEContentTxt().length > 3000) {
        this.$gcb.tooltip.open({
          message: "发布内容不能超过3000！",
          icon: "warning"
        });
        return;
      }
      let params = {
          title: this.title,
          content: this.$refs.ue.getUEContent(),
          publisher: this.publisher,
          isTop: false,
          receivers: this.receiverIds,
          summary: this.$refs.ue.getUEContentTxt(),
          fileUuIds: this.appendix,
          id: this.$route.params.id
      }
      let that = this;
      Announce.api.announce.editAnnounce(JSON.stringify(params)).then(res => {
           that.$gcb.tooltip.open({
                    message: "修改成功！",
                    icon: "success",
                    timeout: 2000
            });
        that.$router.push({name: "announceList"})
      })
   }
  },
  mounted: function() {
    let that = this;
    this.editor = UE.getEditor("ue1");
    Announce.api.announce.detailSearch({ id: that.$route.params.id }).then(res => {
        if (res.announcentAttachments) {
        that.attachment = res.announcentAttachments;
        }
        that.publisher = res.publisher;
        that.title = res.title;
        this.editor.ready(function () {
            setTimeout(()=>{
   that.editor.setContent(res.content); // 确保UE加载完成后，放入内容。
            },500)
      });
        if (res.receiverName != "全体员工") {
          that.receiver = res.receiverName;
          that.employee = res.receiverEmployee
        }
      });
  }
};
</script>
<style lang="less" slot-scope="true">
.app-body .main {
  padding-top: 0;
  font-size: 14px;
}
.font-18 {
  font-size: 18px;
}
.font-14 {
  font-size: 14px;
  margin-left: 5px;
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
.announce-edit-top {
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
  .font-14 {
    font-size: 14px;
  }
}

.announce-edit-center {
  padding: 20px;
  font-size: 14px;
  .title {
    font-size: 18px;
    height: 14px;
    line-height: 14px;
    border-left: 3px solid #248bfe;
    padding-left: 10px;
    margin-bottom: 15px;
    color: #248bfe;
    span {
      color: #ec412b;
    }
  }
  .main-title {
    color: #248bfe;
    height: 14px;
    line-height: 14px;
    font-size: 16px;
    border-left: 3px solid #248bfe;
    padding-left: 10px;
    margin-bottom: 15px;
  }
  .tip {
    margin: 0;
    padding-left: 2px;
    color: #f4a21b;
    padding-top: 6px;
  }
  button {
    width: 90px;
  }
  /*附件*/
  .upload_btn {
    margin-top: 15px;
  }

  .upload_img-box {
    height: 80px;
    width: 80px;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
  }

  .upload_img-box img {
    height: 100%;
    width: 100%;
    display: block;
  }

  .upload_text-box {
    margin-bottom: 15px;
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
}
</style>
