<template>
  <div class="animated fadeIn">
    <Row class="inspection-edit-top">
      <Col span="12" style="margin-left: 30px; width:45%;">编辑巡检</Col>
      <Col span="12" class="text-right">
      <Button type="primary" size="large" @click="save()">保存</Button>
      <Button size="large" @click="cancel()">取消</Button>
      </Col>
    </Row>
    <div class="body">
      <Row class="inspection-edit-center" style="padding-left: 20px;padding-right: 15px;">
        <Form ref="formTop">
          <FormItem>
            <p class="title">项目 <span></span> </p>
            <Input   v-model="inspectionDatas.projectName"   @on-focus="projectSelect()"  placeholder="选择项目" ></Input>
          </FormItem>
          <FormItem>
            <p class="title">巡检内容 <span></span> </p>
            <Input  v-model="inspectionDatas.content"  type="textarea" :autosize="{minRows: 10,maxRows: 10}" placeholder="请输入巡检内容"  :maxlength="3000"> </Input>
            <span class="text-num pull-right col-grey">{{inspectionDatas.content.length||0}}/3000</span>
          </FormItem>
          <FormItem>
            <p class="title">巡检状态 <span></span> </p>
            <div class="status-box">
              <div class="btn font-14" v-bind:class="{'btn-info':inspectionDatas.isNotice,'back-col':!inspectionDatas.isNotice}" @click="inspectionDatas.isNotice=!inspectionDatas.isNotice">已通知</div>
              <div class="btn font-14" v-bind:class="{'btn-success':inspectionDatas.isChanged,'back-col':!inspectionDatas.isChanged}" @click="inspectionDatas.isChanged=!inspectionDatas.isChanged">已整改</div>
            </div>
          </FormItem>
          <FormItem>
            <p class="title">抄送人 <span></span> </p>
            <Input size="large" icon="person" placeholder="请选择接收人" v-model="viewerText" @click.native="employeeMAgainSelect"></Input>
          </FormItem>
          <FormItem>
            <gcbUpload :attachment="attachment"v-model="appendix"></gcbUpload>
          </FormItem>
        </Form>
      </Row>
    </div>
    <Row class="inspection-edit-end">
      <Col span="12" class="pull-left" style="margin-left: 30px;">
      <Button type="primary" size="large" @click="save()">保存</Button>
      <Button size="large" @click="cancel()">取消</Button>
      </Col>
    </Row>
  </div>

</template>

<script>
  import inspection from '../module';
  import {
    getWeek,
    buildDownloadUrl,
    getFileType,
    hasPermission,
    getFileSize
  }from "@/libs/tools";
  export default {
    //页面组件名称
    name: 'inspection-edit',
    //引用组件
    component: {},
    //数据
    data() {
      return {
        inspectionDatas:{
          attachment: [],
          attachmentNum: 0,
          commentNum: 0,
          content: "",
          copyEmployeeIds: [],
          createTime: null,
          employeeId: 0,
          employeeName: "",
          id: 0,
          isChanged: 0,
          isNotice: 0,
          projectId: 0,
          projectName: ""
        },
        // 抄送人
        viewerText : "",
        viewer : [],
        viewerIds : "",
        // 上传附件
        imgs : [],
        files : [],
        attachment:[],
        appendix: [],
      }
    },
    //调用方法
    methods: {
      // 选择项目（单选）
      async projectSelect() {
        this.project = await this.$gcb.gcbProject.open({
          isAuthData: true,
          isSubCompanyProject: false,
          isIncludeCreatorProject: false
        })
        this.inspectionDatas.projectName = this.project.projectName;
        this.inspectionDatas.projectId = this.project.id;
      },
      // 抄送人
      async employeeMAgainSelect() {
        this.inspectionDatas.copyEmployeeList = await this.$gcb.gcbEmployee.open({
          // 单选多选模式
          multiple: true,
          isAuthData: false,
          isIncludeSelf: true,
          isIncludeDescendants: true,
          selectItem: this.inspectionDatas.copyEmployeeList
        });
        this.viewerText = "";
        this.inspectionDatas.copyEmployeeIds = [];
        let that = this;
        that.inspectionDatas.copyEmployeeList.forEach(function(v, i) {
          that.viewerText += i == that.inspectionDatas.copyEmployeeList.length - 1 ? v.employeeName : v.employeeName + "、";
          that.inspectionDatas.copyEmployeeIds.push(v.id);
        });
      },
      // 取消
      cancel() {
        this.$gcb.gcbModal
          .open({
            content: "确定放弃当前添加内容",
            icon: "unknown"
          })
          .then(() => {
            this.$router.push("/inspection/list");
          });
      },
      appendx(aa){
        this.appendix=aa;
      },

      // 提交保存
      save(){
        if(!this.inspectionDatas.projectName) {
          this.$gcb.tooltip.open({
            message: "项目不能为空！",
            icon: "warning"
          });
          return;
        }
        if (this.inspectionDatas.isNotice) {
          this.inspectionDatas.isNotice = 1;
        } else {
          this.inspectionDatas.isNotice = 0;
        }
        if (this.inspectionDatas.isChanged) {
          this.inspectionDatas.isChanged = 1;
        } else {
          this.inspectionDatas.isChanged = 0;
        }
        this.inspectionDatas.attachment = this.appendix;
        inspection.api.inspection.editInspection({
          attachment: this.inspectionDatas.attachment,
          attachmentNum: this.inspectionDatas.attachmentNum,
          commentNum: this.inspectionDatas.commentNum,
          content: this.inspectionDatas.content,
          copyEmployeeIds: this.inspectionDatas.copyEmployeeIds,
          employeeId: this.inspectionDatas.employeeId,
          employeeName: this.inspectionDatas.employeeName,
          createTime: null,
          id: this.inspectionDatas.id,
          isChanged: this.inspectionDatas.isChanged,
          isNotice: this.inspectionDatas.isNotice,
          projectId: this.inspectionDatas.projectId,
          projectName: this.inspectionDatas.projectName
        }).then(res => {
          this.$gcb.tooltip.open({
            message: "保存成功！",
            icon: "success",
            timeout: 2000
          });
          this.$router.push({name: "inspectionDetail", params: {id: this.inspectionDatas.id}})
        })
      },
      detailSearch(id) {
        let that = this;
        inspection.api.inspection.detailInspection({ id: id}).then(res => {
          if(res.error){
            this.$gcb.tooltip.open({
              message: res.error.message,
              icon: "warning"
            });
          } else {
            that.attachment = res.attachment
            that.inspectionDatas.attachmentNum = res.attachmentNum
            that.inspectionDatas.commentNum = res.commentNum
            that.inspectionDatas.content = res.content
            that.inspectionDatas.createTime = res.createTime
            that.inspectionDatas.employeeId = res.employeeId
            that.inspectionDatas.employeeName = res.employeeName
            that.inspectionDatas.id = res.id
            that.inspectionDatas.isChanged = res.isChanged
            that.inspectionDatas.isNotice = res.isNotice
            that.inspectionDatas.projectId = res.projectId
            that.inspectionDatas.projectName = res.projectName
            if (res.attachment) {
              res.attachment.forEach(function(v) {
                that.inspectionDatas.attachment.push(v.uuid)
                v.src = buildDownloadUrl(v.uuid, v.fileName);
                if (getFileType(v).isImg) {
                  that.imgs.push(v);
                } else {
                  that.files.push(v);
                }
              });
            }
            if (res.copyEmployeeList) {
              res.copyEmployeeList.forEach(function(v, i) {
                that.viewerText += i == res.copyEmployeeList.length - 1 ? v.employeeName : v.employeeName + ",";
                that.inspectionDatas.copyEmployeeIds.push(v.id);
              })
            }
          }
        })
      },
    },
    mounted: function() {
      this.detailSearch(this.$route.params.id);
    }
  }
</script>

<style lang="less" slot-scope="true">
  .app-body .main {
    padding-top: 0;
  }
  .inspection-edit-top {
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
  .inspection-edit-center{
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
      color: #F4A21B;
      padding-top: 6px;
    }

  }
  .inspection-edit-end {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
    button {
      width: 90px;
    }
  }
  .body{
    padding: 30px;
    background-color: white;
  }
  .status-box{
    padding-left: 19px;
  }

  .status-box div:first-of-type{
    margin-right: 15px;
  }

  .status-box .back-col{
    background-color: #e6e6e6;
  }
  .font-14{
    font-size: 14px;
  }
</style>
