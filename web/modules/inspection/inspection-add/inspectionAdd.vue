<template>
  <div class="animated fadeIn">
    <Row class="inspection-add-top">
      <Col span="12" style="margin-left: 30px; width:45%;">新增巡检</Col>
      <Col span="12" class="text-right">
      <Button type="primary" size="large" @click="save()">保存</Button>
      <Button size="large" @click="cancel()">取消</Button>
      </Col>
    </Row>
    <div class="body">
      <Row class="inspection-add-center" style="padding-left: 20px;padding-right: 15px;">
        <Form ref="formTop">
          <FormItem>
            <p class="title">项目 <span></span> </p>
            <Input   v-model="inspectionDatas.projectName"   @on-focus="projectAgainSelect()"  placeholder="选择项目" ></Input>
          </FormItem>
          <FormItem>
            <p class="title">巡检内容 <span></span> </p>
            <Input  v-model="inspectionDatas.content"  type="textarea" :autosize="{minRows: 10,maxRows: 10}" placeholder="请输入巡检内容"  :maxlength=3000> </Input>
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
            <gcbUpload v-model="appendix"></gcbUpload>
          </FormItem>
        </Form>
      </Row>
    </div>
    <Row class="inspection-add-end">
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
        name: 'inspection-add',
      //引用组件
        component: {},
      //数据
        data() {
          return {
            inspectionDatas:{
              attachment: [],           //附件
              attachmentNum: null,      //附件个数
              content: "",              //巡检内容
              copyEmployeeIds: [],      //抄送人id
              employeeId: null,         //检查人id
              employeeName: "",         //检查人姓名
              id: null,                 //巡检id
              isChanged: null,          //已整改
              isDeleted: false,         //
              isNotice: null,           //已通知
              projectId: null,          //项目id
              projectName: ""           //项目名称
            },
            // 抄送人
            viewerText : "",
            viewer : [],
            viewerIds : "",
            // 上传附件
            imgs : [],
            files : [],
            project : {},
            appendix: [],
            attachment: []
          }
        },
      //调用方法
        methods: {
          appendx(aa){
            this.appendix=aa;
          },
          // 选择项目（单选）
          async projectAgainSelect() {
            this.project = await this.$gcb.gcbProject.open({
              isAuthData: true,
              isSubCompanyProject: false,
              isIncludeCreatorProject: false,
              selectItem: this.project
            })
            this.inspectionDatas.projectName = this.project.projectName;
            this.inspectionDatas.projectId = this.project.id;
          },
          // 抄送人
          async employeeMAgainSelect() {
            this.employee = await this.$gcb.gcbEmployee.open({
              // 单选多选模式
              multiple: true,
              isAuthData: false,
              isIncludeSelf: true,
              isIncludeDescendants: true,
              selectItem: this.employee
            });
            this.viewerText = "";
            let that = this;
            this.employee.forEach(function(v, i) {
              that.viewerText += i == that.employee.length - 1 ? v.employeeName : v.employeeName + "、";
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
          // 提交保存
          save(){
            if(!this.inspectionDatas.projectName) {
              this.$gcb.tooltip.open({
                message: "项目不能为空! ",
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
            inspection.api.inspection.addInspection(this.inspectionDatas).then(res => {
              this.$gcb.tooltip.open({
                message: "保存成功！",
                icon: "success",
                timeout: 2000
              });
              this.$router.push({name: "inspectionList"})
            })
          }
        }
    }
</script>

<style lang="less" slot-scope="true">
  .app-body .main {
    padding-top: 0;
  }
  .inspection-add-top {
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
  .inspection-add-center{
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
  .inspection-add-end {
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
