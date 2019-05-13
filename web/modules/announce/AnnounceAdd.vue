<template>
  <div class="animated fadeIn">
    <Row class="announce-add-top">
        <Col span="12">新增公告</Col>
        <Col span="12">
          <Button type="primary" size="large" @click="save">发布</Button>
          <Button size="large" @click="cancel">取消</Button>
        </Col>
    </Row>
    <Row class="announce-add-center">
      <Form ref="formTop" :model="formTop">
          <FormItem>
              <p class="title">公告标题 <span>*</span> </p>
              <Input v-model="formTop.title" type="text" :maxlength="30" size="large" placeholder="请输入公告标题"></Input>
          </FormItem>
          <FormItem>
              <p class="title">公告内容 <span>*</span> </p>
              <gcbUeditor :placeholder="ueconfig.placeholder" :config="ueconfig.config" :id="ueconfig.id" ref="ue"></gcbUeditor>
          </FormItem>
          <FormItem>
              <p class="title">发布人 <span>*</span> </p>
              <Input v-model="formTop.publisher" size="large" :maxlength="30"></Input>
          </FormItem>
          <FormItem>
              <p class="title">接收人</p>
              <Input size="large" icon="person" placeholder="请选择接收人" v-model="receiver" @click.native="employeeMAgainSelect"></Input>
              <p class="tip"><i class="fa fa-exclamation-circle"></i>&nbsp; 提示：未选择人员，默认为全体人员</p>
          </FormItem>
          <FormItem>
               <gcbUpload v-model="appendix"></gcbUpload>
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
export default {
  name: "announce-add",
  data() {
    return {
      formTop: {
        title: "",
        publisher: ""
      },
      // 编辑器配置文件
      ueconfig: {
        id: "ue1",
        placeholder: "",
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
      },
      employee: {},
      receiver: "",
      appendix: [],
      receiverIds: ""
    };
  },
  methods: {
    // 取消
    cancel() {
      this.$gcb.gcbModal
        .open({
          content: "确定放弃当前添加内容",
          icon: "unknown"
        })
        .then(() => {
          this.$router.push("list");
        });
    },
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
    // 提交保存
   save(){
      if(!this.formTop.title) {
        this.$gcb.tooltip.open({
          message: "标题不能为空！",
          icon: "warning"
        });
        return;
      }
      if(!this.$refs.ue.getUEContent()) {
        this.$gcb.tooltip.open({
          message: "内容不能为空！",
          icon: "warning"
        });
        return;
      }
       if(this.formTop.publisher == '') {
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
          title: this.formTop.title,
          content: this.$refs.ue.getUEContent(),
          publisher: this.formTop.publisher,
          isTop: false,
          receivers: this.receiverIds,
          summary: this.$refs.ue.getUEContentTxt(),
          fileUuIds: this.appendix
      }
      let that = this;
      Announce.api.announce.addAnnounce(JSON.stringify(params)).then(res => {
           that.$gcb.tooltip.open({
                    message: "发布成功！",
                    icon: "success",
                    timeout: 2000
            });
        that.$router.push({name: "announceList"})
      })
   }
  },
  mounted() {
      let that = this;
          Announce.api.employee.info({}).then((employee) => {
              that.formTop.publisher = employee.department.departmentName
          })
  }
};
</script>
<style lang="less" slot-scope="true">
.app-body .main {
  padding-top: 0;
}
.announce-add-top {
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
.text-danger {
    color: #ec412b;
    font-size: 14px;
}
.announce-add-center {
  padding: 20px;
  .title {
    font-size: 16px;
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
  .tip {
    margin: 0;
    padding-left: 2px;
    color: #f4a21b;
    padding-top: 6px;
    font-size: 14px;
  }
  button {
    width: 90px;
  }
}
</style>
