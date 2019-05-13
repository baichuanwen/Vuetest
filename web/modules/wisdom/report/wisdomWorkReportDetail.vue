<template>
  <div class="animated fadeIn">
    <div class="pull-left font-18" v-if="searchParams.type !=3">
      <span>工作汇报统计表</span>
    </div>
    <div class="pull-left font-18" v-else="searchParams.type ==3">
      <span>工作汇报明细表</span>
    </div>
    <Button class="pull-right mt-10 btn-width-90" size="large" @click="back()">返回</Button>
    <div class="header">
      <div class="header_item clearfix line-height-34">
        <span class="col-grey pull-left">部门：</span>
        <div class="mar-left-10 pull-left">
          <span class="mar-left-10">{{searchParams.departmentName}}</span>
        </div>
      </div>
      <!--日期 -->
      <div class="header_item clearfix line-height-34">
        <span class="col-grey pull-left">时间：</span>
        <div class="mar-left-10 pull-left">
          <span class="mar-left-10">{{searchParams.month ? searchParams.year+'年' + (searchParams.month-0+1)+'月' : searchParams.year+'年'}}</span>
        </div>
        <div class="pull-right">
          <span class="content-total">共<span style="color: #248bfe">{{ total||0 }}</span>条记录</span>
          <Button class="btn-width-90" size="large" type="primary" v-if="infos.items.total && hasPermission(225)" @click="exportClick()">导出</Button>
        </div>

      </div>
    </div>
    <!--内容-->
    <div class="content" v-show="infos.items.records.length" id="reportDetailTable">
      <div class="contract-table">
        <!--日报年度-->
        <table class="gcb-table gcb-table-hover gcb-table-striped" v-if="!searchParams.month && searchParams.type !=3">
          <thead>
          <tr>
            <th width="100px;" rowspan="2">序号</th>
            <th class="text-left" rowspan="2">姓名</th>
            <th rowspan="2" class="text-left department-cell">部门</th>
            <th class="text-center" v-for="(item,index) in monthArr " colspan="2">{{infos.year}}-{{item}}</th>
          </tr>
          <tr>
            <th class="text-right" v-for="(item,index) in monthArr.concat(monthArr) " >{{index%2?"未提交":"已提交"}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,$index) in infos.items.records" >
            <td class="text-left">{{(searchParams.pageNo-1)*searchParams.pageSize+1+$index}}</td>
            <td class="text-left">{{ item.employeeName }}</td>
            <td class="department-cell" :title="item.departmentName">{{ item.departmentName }}</td>
            <td class="text-right" v-for="(month,index) in dbMonthArr" @click="dailyReportYear(month)">{{index%2?item.unsubmittedCounts[month]:item.submittedCounts[month]}}</td>
          </tr>
          </tbody>
        </table>
        <!--日报月度-->
        <table class="gcb-table gcb-table-hover gcb-table-striped" v-if="searchParams.month && searchParams.type !=3">
          <thead>
          <tr>
            <th width="100px;" rowspan="2">序号</th>
            <th rowspan="2">姓名</th>
            <th rowspan="2" class="department-cell">部门</th>
            <th style="text-align: center" colspan="2">{{searchParams.year}}-{{searchParams.month-0+1}}</th>
          </tr>
          <tr>
            <th style="text-align: center">已提交</th>
            <th style="text-align: center">未提交</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,$index) in infos.items.records"  @click="dailyReportYear()">
            <td>{{(searchParams.pageNo-1)*searchParams.pageSize+1+$index}}</td>
            <td>{{ item.employeeName }}</td>
            <td  class="department-cell" :title="item.departmentName">{{ item.departmentName }}</td>
            <td style="text-align: center" :style="{'color': item.submittedCounts[0]>=0?'#666666':'red'}">{{ item.submittedCounts[0]}}</td>
            <td style="text-align: center" :style="{'color': item.unsubmittedCounts[0]>=0?'#666666':'red'}">{{ item.unsubmittedCounts[0]}}</td>
          </tr>
          </tbody>
        </table>
        <!--月报-->
        <table class="gcb-table gcb-table-hover gcb-table-striped" v-if="!searchParams.month && searchParams.type ==3">
          <thead>
          <tr>
            <th width="100px;" rowspan="2">序号</th>
            <th rowspan="2" class="department-cell">姓名</th>
            <th rowspan="2">部门</th>
            <th class="text-center" v-for="(item,index) in monthArr" >{{infos.year}}-{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,$index) in infos.items.records">
            <td>{{(searchParams.pageNo-1)*searchParams.pageSize+1+$index}}</td>
            <td>{{ item.employeeName }}</td>
            <td class="department-cell" :title="item.departmentName">{{ item.departmentName }}</td>
            <td class="text-center" v-for="(month,index) in monthArr" :style="{'color': item.submittedCounts[index] ? '#666666':'red'}">{{ item.submittedCounts[index] ? '√': '×'}}</td>
          </tr>
          </tbody>
        </table>
        <!--月报-->
        <table class="gcb-table gcb-table-hover gcb-table-striped" v-if="searchParams.month && searchParams.type ==3">
          <thead>
          <tr>
            <th width="100px;" rowspan="2">序号</th>
            <th>姓名</th>
            <th class="department-cell">部门</th>
            <th style="text-align: center">{{searchParams.year}}-{{searchParams.month - 0 + 1}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,$index) in infos.items.records">
            <td>{{(searchParams.pageNo-1)*searchParams.pageSize+1+$index}}</td>
            <td>{{ item.employeeName }}</td>
            <td class="department-cell" :title="item.departmentName">{{ item.departmentName }}</td>
            <td style="text-align: center" :style="{'color': item.submittedCounts[0] ?'#666666':'red'}">{{ item.submittedCounts[0] ? '√': '×'}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--分页-->
    <br>
    <Page class="gcb-page" v-show="!!infos.items.records.length"  :total="total" :current="searchParams.pageNo" :page-size="15" @on-change="changePage" show-total show-elevator ></Page>
    <!--暂无数据-->
    <div class="data-null text-center" v-show="!infos.items.records.length" style="display: none">
      <!--<img src="/client/framework/images/data-null.png" alt="">-->
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
  import {
    hasPermission,
    locals
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
        monthArr:['01','02','03','04','05','06','07','08','09','10','11','12'],
        dbMonthArr:[0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11],
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
            wisdom.api.report.dailyReportYear(this.searchParams).then((result)=>{
              this.infos = result;
              this.total = result.items.total;
            });
            break;
          case 2:
            wisdom.api.report.weeklyReportEmployeeSummary(this.searchParams).then((result)=>{
              this.infos = result;
              this.total = result.items.total;
            });
            break;
          case 3:
            wisdom.api.report.monthlyReportEmployeeDetail(this.searchParams).then((result)=>{
              this.infos = result;
              this.total = result.items.total;
            });
            break;
        }
      },
      back(){
        this.$router.go(-1)
      },
      //跳转到详情
     dailyReportYear (num) {
       let params=this.searchParams;
       if(num){params={...this.searchParams,month:num}}
       this.$router.push({name:'wisdomWorkReportSubDetail',query:{params:JSON.stringify(params)}})
     },
      // 导出
      exportClick(){
        let params = {
          departmentID: this.searchParams.departmentID,
          departmentName: this.searchParams.departmentName,
          year: this.searchParams.year,
          month:this.searchParams.month
        };
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
  .red{
    color: red;
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
  .department-cell{
    width:100px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  /*表格*/
  .table tbody tr{
    cursor: pointer;
  }

  #reportDetailTable .contract-table{
    overflow-x: scroll
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
  .gcb-table tbody tr td {
    padding: 10px 5px !important;
  }
  .gcb-table tbody tr td:first-of-type {
    padding-left: 15px!important;
  }
</style>
