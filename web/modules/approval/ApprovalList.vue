<template>
  <div class="animated fadeIn">
   <!--头部-->
    <form class="header clearfix" novalidate>
        <div>
            <div class="header-item">
                <span class="colGrey">选择类型</span>
                <div class="btn-group">
                    <Input readonly v-model="types" @click.native="createChooseTypeModal()" icon="ios-arrow-forward" placeholder="类型" style="cursor:pointer"/>
                </div>
            </div>
            <!-- 选择状态 -->
        <div class="header-item">
           <span class="colGrey">选择状态</span>
           <Select v-model="status">
             <Option v-for="item in chosenState" :value="item.name" :key="item.id">{{ item.name }}</Option>
         </Select>
        </div>
        <!-- 选择项目 -->
        <div class="header-item">
                <span class="colGrey">选择项目</span>
                <div class="btn-group">
                    <Input readonly v-model="projectSelec" @click.native="projectSelect()" icon="ios-arrow-forward" placeholder="请选择类型" style="cursor:pointer"/>
                </div>
            </div>
            <!-- 关键字搜索 -->
        <div class="header-item">
                <span class="colGrey">请输入关键字</span>
                <div class="btn-group">
                    <Input search v-model="num" placeholder="请输入编号、主题、正文内容、备注、附件名称查询" style="width:352px"/>
                </div>
            </div>
        </div>
        <div>
             <!-- 开始日期 -->
        <div class="header-item">
                <span class="colGrey">申请开始时间</span>
                <div class="btn-group">
                     <DatePicker v-model="applyStart" type="date" :start-date="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay())" placeholder="开始时间" style="width: 144px"></DatePicker>
                </div>
            </div>
                 <!-- 结束日期 -->
        <div class="header-item">
                <span class="colGrey">申请结束时间</span>
                <div class="btn-group">
                     <DatePicker v-model="applyEnd" type="date" :start-date="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay())" placeholder="结束时间" style="width: 144px"></DatePicker>
                </div>
            </div>
              <!-- 流程结束开始日期 -->
        <div class="header-item">
                <span class="colGrey">流程结束开始时间</span>
                <div class="btn-group">
                     <DatePicker v-model="processStart" type="date" :start-date="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay())" placeholder="开始时间" style="width: 144px"></DatePicker>
                </div>
            </div>
                 <!-- 流程结束结束日期 -->
        <div class="header-item">
                <span class="colGrey">流程结束结束时间</span>
                <div class="btn-group">
                     <DatePicker v-model="processEnd" type="date" :start-date="new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay())" placeholder="结束时间" style="width: 144px"></DatePicker>
                </div>
            </div>
              <!-- 选择申请人 -->
        <div class="header-item">
                <span class="colGrey">选择申请人</span>
                <div class="btn-group">
                    <Input readonly v-model="projectSelec" @click.native="chooseEmployees()" icon="ios-arrow-forward" placeholder="请选择申请人" style="cursor:pointer"/>
                </div>
            </div>
                 <!-- 查找清空 -->
        <div class="header-item pull-right">
                <Button size="large" type="primary">查找</Button>
                <Button size="large" type="default">清空</Button>
            </div>
        </div>
    </form>
    <!-- 导出操作 -->
     <div class="header-item export">
           <span class="colGrey">选择:</span>
           <Select v-model="exportr">
             <Option v-for="item in exportRange" :value="item.name" :key="item.id">{{ item.name }}</Option>
         </Select>
           <Select v-model="exportType" style="margin:0 15px">
             <Option v-for="item in exportType" :value="item.name" :key="item.id">{{ item.name }}</Option>
         </Select>
         <Button size="large" type="primary">导出</Button>
        </div>
      <!--列表-->
    <!-- <div class="list clearfix" ng-if="lists.length>0">
        <table class="table">
            <thead>
                <tr style="height: 40px;line-height: 40px;">
                    <th style="width: 100px;">编号</th>
                    <th style="min-width:100px;">主题</th>
                    <th style="min-width: 90px;">流程</th>
                    <th style="min-width:100px;">内容摘要</th>
                    <th style="width: 120px;">申请时间</th>
                    <th style="min-width: 110px;width: 110px;">当前审批人</th>
                    <th style="min-width: 100px;width: 120px;">停留时间</th>
                </tr>
            </thead>
        </table>
    </div> -->
  </div>
</template>

<script>
 import Approval from './module'
export default {
  name: "approval",
  data() {
    return {
      num: '',
      showType: [],
      showTypes: [],
      showTypeIds: [],
      types: '',
      status: '',
      applyStart: '',
      applyEnd: '',
      processStart: '',
      processEnd: '',
      chosenState: [
        { name: "全部", id: null },
        { name: "审批中", id: 1 },
        { name: "通过", id: 2 },
        { name: "已撤回", id: 3 },
        { name: "未通过", id: 4 },
        { name: "终止", id: 6 }
      ],
      exportRange: [
       { name:"导出当前" },
        {name: "导出全部"}
      ],
      exportr: '',
      exportType: [
        { name: "PDF" },
        { name: "Word" },
        { name: "Excel" },
      ],
      project: {},
      projectSelec: '',
      projectIds: [],
      employeeIds: [],
      postData: {
                    page: 1,
                    pageSize: 15,
                    processFormIds: showTypeIds,
                    searchText: num,
                    processStatus: status,
                    projectIds: projectIds,
                    startDate: applyStart,
                    endDate: applyEnd,
                    employeeIds: employeeIds,
                },
    };
  },
  methods: {
    // 选择审批类型
    async createChooseTypeModal() {
      this.showTypes = await this.$gcb.gcbCertificateType.open({
        isAuthData: false,
        isSubCompanyProject: false,
        isIncludeCreatorProject: false
      });
      this.showTypes.forEach(element => {
        this.showType.push(element.formName);
        this.showTypeIds.push(element.id);
      });
      this.types = this.showType.join(",");
    },
       // 选择项目（单选）
      async projectSelect() {
        this.project = await this.$gcb.gcbProject.open({
          isAuthData: false,
          isSubCompanyProject: false,
          isIncludeCreatorProject: false
        })
        this.projectSelec = this.project.projectName;
        this.projectIds = this.project.id;
      },
  },
  mounted() {
    const self = this;
     // 申请列表
            // Approval.api.approval.myApplyList(self.postData).then(result => {
            //     self.listData = result.records
            //     self.total = result.total
            // })
  }
};
</script>
<style lang="less" scoped slot-scope="true">
.ivu-date-picker-cells {
  width: 231px;
}
.app-body .main {
  padding-top: 5px;
}
.font-18 {
  font-size: 18px;
}
.colGrey {
  color: #939ba4;
}
.w70 {
  width: 70px;
}
.w90 {
  width: 90px;
}
.ml5 {
  margin-left: 5px;
}
p {
  margin: 0 0 5px;
}
/*头部*/
.header {
  margin-top: 15px;
  padding: 15px;
  background-color: #fff;
  .header-item {
    display: inline-block;
    margin: 5px 15px;
    span {
      margin-right: 5px;
    }
    .ivu-input {
      height: 34px;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #666666;
      line-height: 34px;
    }
    .ivu-input-wrapper {
      height: 34px;
      width: 144px;
    }
    .ivu-input-icon {
      height: 34px;
      line-height: 34px;
      color: #248bfe;
    }
    .ivu-select {
      width: 145px;
      height: 34px;
      line-height: 34px;
    }
    .ivu-select-single .ivu-select-selection {
      height: 34px;
      line-height: 34px;
    }
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
      height: 34px;
      line-height: 32px;
      font-size: 14px;
      text-overflow: ellipsis;
    }
  }
}
// 导出
  .ivu-select {
      width: 130px;
      height: 34px;
      line-height: 34px;
    }
    .ivu-select-single .ivu-select-selection {
      height: 34px;
      line-height: 34px;
    }
    .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
      height: 34px;
      line-height: 32px;
      font-size: 14px;
      text-overflow: ellipsis;
    }
    .export {
      padding: 10px 0;
      width: 100%;
    }
</style>
