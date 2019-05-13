<template>
  <div class="animated fadeIn">
    <div class="pull-left font-18">
      <span>工作汇报明细表</span>
    </div>
    <Button class="pull-right  btn-width-90" size="large" @click="back()">返回</Button>
    <div class="header clearfix">
      <div class="clearfix line-height-34">
        <span class="col-grey pull-left">部门：</span>
        <div class="mar-left-10 pull-left">
          <span class="mar-left-10">{{searchParams.departmentName}}</span>
        </div>
      </div>
      <div class="clearfix line-height-34">
        <span class="col-grey pull-left">时间：</span>
        <div class="mar-left-10 pull-left">
          <span class="mar-left-10">{{infos.reportDateName}}</span>
        </div>
        <div class="pull-right">
          <span class="content-total">共<span style="color: #248bfe">{{total||0 }}</span>条记录</span>
          <Button class="btn-width-90" size="large" type="primary" v-if=" total&& hasPermission(225)" @click="exportClick()">导出</Button>
        </div>
      </div>
    </div>
    <!--内容-->
    <div class="content"  v-show="!!infos.items.records.length" id="reportDetailTable">
      <div style="overflow-x: scroll">
        <!--日报月度-->
        <table class="gcb-table gcb-table-hover gcb-table-striped">
          <thead>
          <tr>
            <th width="100px;">序号</th>
            <th>姓名</th>
            <th class="department-cell">部门</th>
            <th style="text-align: center" v-for="(col,$index) in infos.colList">{{col}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,$index) in infos.items.records">
            <td>{{(searchParams.pageNo-1)*searchParams.pageSize+1+$index}}</td>
            <td>{{ item.employeeName }}</td>
            <td class="department-cell" :title="item.departmentName">{{ item.departmentName }}</td>
            <td style="text-align: center" v-for="(submittedCounts,$index) in item.submittedCounts" :style="{'color': submittedCounts?'green':'red'}">{{submittedCounts ? "√" : "×"}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--分页-->
    <br>
    <Page class="gcb-page" v-show="!!infos.items.records.length"  :total="total" :current="searchParams.pageNo" :page-size="15" @on-change="changePage" show-total show-elevator ></Page>
    <!--暂无数据-->
    <div class="data-null text-center" v-if="!infos.items.records.length" style="display: none">
     <img src="/static/img/data-null.png" alt="">
      <p>暂无数据</p>

    </div>
  </div>
</template>

<script>
  import {
    hasPermission,
  } from "@/libs/tools";
  import wisdom from '../module';
  export default {
    data() {
      return {
        infos:{
          items:{
            records:[],
          }
        },
        total:0,
        searchParams:{
          departmentID: "",
          departmentName: "",
          type:3,
          pageSize: 15,
          year: new Date().getFullYear(),
          pageNo: 1,
          month: "",
        }
      }
    },
    methods: {
      //分页
      changePage(page) {
        this.searchParams.pageNo = page
        this.getList()
      },
      hasPermission(item){
        return hasPermission(item)
      },
      // 获取列表
      getList(page){
        switch (this.searchParams.type - 0){
          case 1:
            wisdom.api.report.dailyReportEmployeeDetail(this.searchParams).then((result)=>{
              this.infos = result;
              if(result.items&&result.items.total){
                this.total = result.items.total;
              }
            });
            break;
          case 2:
            wisdom.api.report.weeklyReportEmployeeDetail(this.searchParams).then((result)=>{
              this.infos = result;
              if(result.items&&result.items.total){
                this.total = result.items.total;
              }
            });
            break;
        }
      },
      back(){
        this.$router.go(-1)
      },
      // 导出
      exportClick(){
        var params = {
          departmentID: this.searchParams.departmentID+"",
          departmentName: this.searchParams.departmentName+"",
          year: this.searchParams.year+"",
          month:this.searchParams.month+"",
        };
        console.log(params)
        switch (this.searchParams.type - 0){
          case 1:
            wisdom.api.report.dailyReportYearExport(params)
            break;
          case 2:
            wisdom.api.report.weeklyReportEmployeeSummaryExport(params)
            break;
          case 3:
            wisdom.api.report.monthlyReportEmployeeDetailExport(params)
            break;
        }
      },
    },
    created(){
      let queryParams= this.$route.query.params;
      if(queryParams){
        this.searchParams=Object.assign(this.searchParams,JSON.parse(queryParams));
        this.getList();
      }
    },

  }
</script>
<style lang="less" scoped >
  .font-18 {
    font-size: 18px;
  }
  .col-grey {
    color: #939BA4;
  }
  .line-height-34 {
    line-height: 34px;
  }
  .header {
    margin-top: 50px;
    padding-right: 0;
    margin-bottom: 30px;
  }
  .content-total {
    height: 34px;
    line-height: 34px;
    vertical-align: bottom;
    display: inline-block;
  }
  .content-total span {
    color: #248bfe;
    margin: 0 3px;
  }
  /*表格*/
  .table tbody tr{
    cursor: pointer;
  }
  #workReportTotal  tbody tr:nth-of-type(1){
    font-weight: 700;
  }
  #reportDetailTable  thead tr th{
    min-width: 82px;
  }
  #reportDetailTable  tr td{
    max-width: 150px;
  }
  .department-cell{
    width:100px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .gcb-table tbody tr td:first-of-type {
    padding-left: 15px!important;
  }
</style>
