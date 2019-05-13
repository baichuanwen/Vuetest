<template>
  <div class="animated fadeIn">
    <Row class="announce-add-top">
      <Col span="24" class="text-right">
      <Button type="primary" size="large" @click="addReport()">保存</Button>
      <Button size="large" @click="cancel()">取消</Button>
      </Col>
    </Row>
    <div class="header">
      <span>类型</span>
      <Button type="default" size="large" shape="circle" :class="{'ivu-btn-primary':reportDatas.workReportType==1}" @click="reportDatas.workReportType = 1">日报</Button>
      <Button type="default" size="large"shape="circle" :class="{'ivu-btn-primary':reportDatas.workReportType==2}" @click="reportDatas.workReportType = 2">周报</Button>
      <Button type="default" size="large" shape="circle" :class="{'ivu-btn-primary':reportDatas.workReportType==3}" @click="reportDatas.workReportType = 3">月报</Button>
    </div>
    <div class="body">
      <Row class="announce-add-center">
        <Form ref="formTop" :model="reportDatas">
          <FormItem>
            <p class="title">日期<span></span> </p>
            <reportDate  :workReportType="reportDatas.workReportType" :reportDatas.sync="reportDatas"></reportDate>
          </FormItem>
          <FormItem>
            <p class="title">工作计划 <span></span> </p>
            <Input  v-model="reportDatas.plans[0]"  type="textarea" :autosize="{minRows: 10,maxRows: 10}" placeholder="请输入工作计划"  :maxlength=3000> </Input>
            <span class="text-num pull-right col-grey">{{reportDatas.plans[0].length||0}}/3000</span>
          </FormItem>
          <FormItem>
            <p class="title">工作记录 <span></span> </p>
            <Input   v-model="reportDatas.records[0]"  type="textarea" :autosize="{minRows: 10,maxRows: 10}" placeholder="请输入工作记录"  :maxlength=3000> </Input>
            <span class="text-num pull-right col-grey">{{reportDatas.records[0].length||0}}/3000</span>
          </FormItem>
          <FormItem>
            <p class="title">工作总结 <span></span> </p>
            <Input   v-model="reportDatas.summaries[0]"  type="textarea" :autosize="{minRows: 10,maxRows: 10}" placeholder="请输入工作总结"  :maxlength=3000> </Input>
            <span class="text-num pull-right col-grey">{{reportDatas.summaries[0].length||0}}/3000</span>
          </FormItem>
          <FormItem>
            <p class="title">项目 <span></span> </p>
            <Input   v-model="projectText"  @on-focus="projectSelect()"  placeholder="选择项目" ></Input>
          </FormItem>
          <FormItem>
            <p class="title">对谁可见 <span></span> </p>
            <Input v-model="viewerText" @on-focus="employeeMSelect()"   placeholder="选择人员"> </Input>
          </FormItem>
          <FormItem>
            <gcbUpload v-model="reportDatas.fileUuIds"></gcbUpload>
          </FormItem>
        </Form>
      </Row>
    </div>
    <Row class="announce-add-top" style="margin-bottom:100px">
      <Col span="12">
        <Button type="primary" size="large" @click="addReport()">保存</Button>
        <Button size="large" @click="cancel()" >取消</Button>
      </Col>
      <Col span="12">&nbsp;</Col>
    </Row>
  </div>
</template>

<script>
  import {
    getWeek,
    buildDownloadUrl,
    getFileType
  } from '@/libs/tools'
  import report from '../module';
  import reportDate from '../components/reportDate';
  export default {
    name: 'announce-add',
    data() {
      return {
        reportDatas : {
          workReportType: 1,
          reportDate: new Date(),
          weeklyDate: null,
          year: new Date().getFullYear(),
          plans: [''],
          records: [''],
          summaries: [''],
          projectId: null,
          projectName: null,
          fileUuIds: [],
          receiveEmployeeIds: []
        },
        projectName :null,
        // 选择项目
        projectText :"",
        project : null,
        // 对谁可见
        viewerText : "",
        employee:[],
        // 上传附件
        appendix:null,
      }
    },
    components:{reportDate},
    methods: {
      // 取消
      cancel() {
        this.$gcb.gcbModal.open({
          content:"确定放弃当前添加内容",
          icon:"unknown"
        }).then(()=>{
          this.$router.push({name:"reportList"})

        })
      },
      // 保存
      addReport() {
        // 内容必填
        if (!this.reportDatas.plans[0] && !this.reportDatas.records[0] && !this.reportDatas.summaries[0]) {
          this.$gcb.tooltip.open({message:"请输入工作汇报内容",icon:"warning"})
          return false;
        }
        // 时间必选
        if (this.reportDatas.reportDate == null && this.reportDatas.weeklyDate == null) {
          this.$gcb.tooltip.open({message:"请选择汇报时间",icon:"warning"})
          return false;
        }
        if (this.project) {
          this.reportDatas.projectId = this.project.id;
          this.reportDatas.projectName = this.project.projectName;
        }
        report.api.report.addReport(this.reportDatas).then(res=>{
          this.$router.push({
            name: "reportList"
          })
        })
      },
      // 对谁可见
      async employeeMSelect() {
        this.employee = await this.$gcb.gcbEmployee.open({
          multiple: true,
          isAuthData: false,
          isIncludeSelf: true,
          isIncludeDescendants: true,
          selectItem: this.employee
        });
        if(this.employee.length>=0){
          this.reportDatas.receiveEmployeeIds=[];
          this.viewerText=[];
          this.employee.map((item,index)=>{
            this.viewerText.push(item.employeeName)
            this.reportDatas.receiveEmployeeIds.push(item.id)
          })
          this.viewerText= this.viewerText.join(",");
        }
      },
      // 选择项目（单选）
      async projectSelect() {
        this.project = await this.$gcb.gcbProject.open({
          isAuthData: false,
          isSubCompanyProject: false,
          isIncludeCreatorProject: false,
          multiple: false
        })
        this.projectText= this.project.projectName;
        this.reportDatas.projectId=this.project.id;
      },
    },
    mounted () {

    }
  }
</script>
<style lang="less" scoped >
  .ivu-btn {
    padding: 5px 25px 6px;
  }
  .announce-add-top {
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 10px;
    button {
      width: 90px;
    }
    div:last-child {
      text-align: right;
    }
  }
  .announce-add-center {
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
  .col-grey{
    color: #939BA4;
  }
  .font-18{
    font-size: 18px;
  }
  .action{
    margin: 15px 0;
  }
  .action button:last-of-type{
    margin-left: 10px;
  }

  .action:first-of-type button:first-of-type{
    margin-left: 10px;
  }

  .header{
    height: 80px;
    line-height: 80px;
    padding: 0 30px;
    margin-bottom: 15px;
    background-color: white;
  }
  .header span{
    margin: 15px;
  }
  .header button{
    margin: 0 10px 0 0;
  }
  .body{
    padding: 30px;
    background-color: white;
  }
  .main-title{
    height: 14px;
    line-height: 14px;
    width: 100px;
    border-left:3px solid #248bfe;
    padding-left: 10px;
    margin-bottom: 15px;
  }
  .list-box-text{
    padding-right: 200px;
  }
  .text-box{
    /*position: relative;*/
    margin-bottom: 15px;
  }
  .text-num{
    /*position: absolute;*/
    font-size: 12px;
    right: 5px;
    bottom: 5px;
  }

  .items textarea{
    resize: none;
    height: 200px;
  }

  .items .data{
    width: 200px;
  }

  .items .edit{
    margin-right: 15px;
  }
  .items .add-item{
    margin-top: 15px;
    height: 34px;
    line-height: 34px;
    border: 1px dashed #65aeff;
    background-color: #e1efff;
    cursor: pointer;
  }
</style>
