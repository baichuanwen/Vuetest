<template>
  <div class="animated fadeIn">
    <div class="pull-left font-18" v-if="searchParams.type !=3">
      <span>工作汇报统计表</span>
    </div>
    <div class="pull-left font-18" v-else="searchParams.type ==3">
      <span>工作汇报明细表</span>
    </div>
    <Button class="pull-right mt-10 btn-width-90" size="large" @click="back()">返回</Button>
    <div class="header" style="margin-top: 60px;padding-right: 0;margin-bottom: 30px">
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
          <span style="line-height: 34px;" class="content-total">共<span style="color: #248bfe">{{ total||0 }}</span>条记录</span>
          <button class="btn btn-primary btn-width-90" v-if="total&&hasPermission(225)" @click="exportClick()">导出</button>
        </div>
        <div class="clearfix" style="height: 34px;"></div>
      </div>
    </div>
    <!--内容-->
    <div class="content" style="padding: 5px 0 20px;margin-top: -14px" v-show="infos.items.records.length" id="reportDetailTable">
      <div class="bs-component contract-table" style="overflow-x: scroll">
        <!--日报年度-->
        <table class="table table-striped table-hover"v-if="!searchParams.month && searchParams.type !=3">
          <thead>
          <tr>
            <th width="100px;" rowspan="2">序号</th>
            <th style="text-align: left" rowspan="2">姓名</th>
            <th rowspan="2" style="text-align: left;width:100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">部门</th>
            <th style="text-align: center" colspan="2">{{infos.year}}-01</th>
            <th style="text-align: center" colspan="2">{{infos.year}}-02</th>
            <th style="text-align: center" colspan="2">{{infos.year}}-03</th>
            <th style="text-align: center" colspan="2">{{infos.year}}-04</th>
            <th style="text-align: center" colspan="2">{{infos.year}}-05</th>
            <th style="text-align: center" colspan="2">{{infos.year}}-06</th>
            <th style="text-align: center" colspan="2">{{infos.year}}-07</th>
            <th style="text-align: center" colspan="2">{{infos.year}}-08</th>
            <th style="text-align: center" colspan="2">{{infos.year}}-09</th>
            <th style="text-align: center" colspan="2">{{infos.year}}-10</th>
            <th style="text-align: center" colspan="2">{{infos.year}}-11</th>
            <th style="text-align: center" colspan="2">{{infos.year}}-12</th>
          </tr>
          <tr>
            <th style="text-align: right">已提交</th>
            <th style="text-align: right">未提交</th>
            <th style="text-align: right">已提交</th>
            <th style="text-align: right">未提交</th>
            <th style="text-align: right">已提交</th>
            <th style="text-align: right">未提交</th>
            <th style="text-align: right">已提交</th>
            <th style="text-align: right">未提交</th>
            <th style="text-align: right">已提交</th>
            <th style="text-align: right">未提交</th>
            <th style="text-align: right">已提交</th>
            <th style="text-align: right">未提交</th>
            <th style="text-align: right">已提交</th>
            <th style="text-align: right">未提交</th>
            <th style="text-align: right">已提交</th>
            <th style="text-align: right">未提交</th>
            <th style="text-align: right">已提交</th>
            <th style="text-align: right">未提交</th>
            <th style="text-align: right">已提交</th>
            <th style="text-align: right">未提交</th>
            <th style="text-align: right">已提交</th>
            <th style="text-align: right">未提交</th>
            <th style="text-align: right">已提交</th>
            <th style="text-align: right">未提交</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,$index) in infos.items.records" >
            <td>{{(searchParams.pageNo-1)*searchParams.pageSize+1+$index}}</td>
            <td style="text-align: left">{{ item.employeeName }}</td>
            <td data-toggle="tooltip" :title="item.departmentName" style="text-align: left;width:100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ item.departmentName }}</td>
            <td style="text-align: right" :style="{'color': item.submittedCounts[0]>=0?'#666666':'red'}" @click="dailyReportYear(0)">{{ item.submittedCounts[0]}}</td>
            <td style="text-align: right" :style="{'color': item.unsubmittedCounts[0]>=0?'#666666':'red'}" @click="dailyReportYear(0)">{{ item.unsubmittedCounts[0]}}</td>
            <td style="text-align: right" :style="{'color': item.submittedCounts[1]>=0?'#666666':'red'}" @click="dailyReportYear(1)">{{ item.submittedCounts[1]}}</td>
            <td style="text-align: right" :style="{'color': item.unsubmittedCounts[1]>=0?'#666666':'red'}" @click="dailyReportYear(1)">{{ item.unsubmittedCounts[1]}}</td>
            <td style="text-align: right" :style="{'color': item.submittedCounts[2]>=0?'#666666':'red'}" @click="dailyReportYear(2)">{{ item.submittedCounts[2]}}</td>
            <td style="text-align: right" :style="{'color': item.unsubmittedCounts[2]>=0?'#666666':'red'}" @click="dailyReportYear(2)">{{ item.unsubmittedCounts[2] }}</td>
            <td style="text-align: right" :style="{'color': item.submittedCounts[3]>=0?'#666666':'red'}" @click="dailyReportYear(3)">{{ item.submittedCounts[3] }}</td>
            <td style="text-align: right" :style="{'color': item.unsubmittedCounts[3]>=0?'#666666':'red'}" @click="dailyReportYear(3)">{{ item.unsubmittedCounts[3]}}</td>
            <td style="text-align: right" :style="{'color': item.submittedCounts[4]>=0?'#666666':'red'}" @click="dailyReportYear(4)">{{ item.submittedCounts[4] }}</td>
            <td style="text-align: right" :style="{'color': item.unsubmittedCounts[4]>=0?'#666666':'red'}" @click="dailyReportYear(4)">{{ item.unsubmittedCounts[4]}}</td>
            <td style="text-align: right" :style="{'color': item.submittedCounts[5]>=0?'#666666':'red'}" @click="dailyReportYear(5)">{{ item.submittedCounts[5] }}</td>
            <td style="text-align: right" :style="{'color': item.unsubmittedCounts[5]>=0?'#666666':'red'}" @click="dailyReportYear(5)">{{ item.unsubmittedCounts[5]}}</td>
            <td style="text-align: right" :style="{'color': item.submittedCounts[6]>=0?'#666666':'red'}" @click="dailyReportYear(6)">{{ item.submittedCounts[6]}}</td>
            <td style="text-align: right" :style="{'color': item.unsubmittedCounts[6]>=0?'#666666':'red'}" @click="dailyReportYear(6)">{{ item.unsubmittedCounts[6] }}</td>
            <td style="text-align: right" :style="{'color': item.submittedCounts[7]>=0?'#666666':'red'}" @click="dailyReportYear(7)">{{ item.submittedCounts[7] }}</td>
            <td style="text-align: right" :style="{'color': item.unsubmittedCounts[7]>=0?'#666666':'red'}" @click="dailyReportYear(7)">{{ item.unsubmittedCounts[7]}}</td>
            <td style="text-align: right" :style="{'color': item.submittedCounts[8]>=0?'#666666':'red'}" @click="dailyReportYear(8)">{{ item.submittedCounts[8] }}</td>
            <td style="text-align: right" :style="{'color': item.unsubmittedCounts[8]>=0?'#666666':'red'}" @click="dailyReportYear(8)">{{ item.unsubmittedCounts[8]}}</td>
            <td style="text-align: right" :style="{'color': item.submittedCounts[9]>=0?'#666666':'red'}" @click="dailyReportYear(9)">{{ item.submittedCounts[9]}}</td>
            <td style="text-align: right" :style="{'color': item.unsubmittedCounts[9]>=0?'#666666':'red'}" @click="dailyReportYear(9)">{{ item.unsubmittedCounts[9]}}</td>
            <td style="text-align: right" :style="{'color': item.submittedCounts[10]>=0?'#666666':'red'}" @click="dailyReportYear(10)">{{ item.submittedCounts[10]}}</td>
            <td style="text-align: right" :style="{'color': item.unsubmittedCounts[10]>=0?'#666666':'red'}" @click="dailyReportYear(10)">{{ item.unsubmittedCounts[10] }}</td>
            <td style="text-align: right" :style="{'color': item.submittedCounts[11]>=0?'#666666':'red'}" @click="dailyReportYear(11)">{{ item.submittedCounts[11] }}</td>
            <td style="text-align: right" :style="{'color': item.unsubmittedCounts[11]>=0?'#666666':'red'}" @click="dailyReportYear(11)">{{ item.unsubmittedCounts[11] }}</td>
          </tr>
          </tbody>
        </table>
        <!--&lt;!&ndash;日报月度&ndash;&gt;-->
        <table class="table table-striped table-hover" v-if="searchParams.month && searchParams.type !=3">
          <thead>
          <tr>
            <th width="100px;" rowspan="2">序号</th>
            <th rowspan="2">姓名</th>
            <th rowspan="2" style="width:100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">部门</th>
            <th style="text-align: center" colspan="2">{{searchParams.year}}-{{searchParams.month-0+1}}</th>
          </tr>
          <tr>
            <th style="text-align: center">已提交</th>
            <th style="text-align: center">未提交</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,$index) in infos.items.records"  @click="dailyReportMonth()">
            <td>{{(searchParams.pageNo-1)*searchParams.pageSize+1+$index}}</td>
            <td>{{ item.employeeName }}</td>
            <td data-toggle="tooltip" :title="item.departmentName" style="width:100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ item.departmentName }}</td>
            <td style="text-align: center" :style="{'color': item.submittedCounts[0]>=0?'#666666':'red'}">{{ item.submittedCounts[0]}}</td>
            <td style="text-align: center" :style="{'color': item.unsubmittedCounts[0]>=0?'#666666':'red'}">{{ item.unsubmittedCounts[0]}}</td>
          </tr>
          </tbody>
        </table>
        <!--&lt;!&ndash;月报&ndash;&gt;-->
        <table class="table table-striped table-hover" v-if="!searchParams.month && searchParams.type ==3">
          <thead>
          <tr>
            <th width="100px;" rowspan="2">序号</th>
            <th rowspan="2">姓名</th>
            <th rowspan="2" style="width:100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">部门</th>
            <th style="text-align: center">{{infos.year}}-01</th>
            <th style="text-align: center">{{infos.year}}-02</th>
            <th style="text-align: center">{{infos.year}}-03</th>
            <th style="text-align: center">{{infos.year}}-04</th>
            <th style="text-align: center">{{infos.year}}-05</th>
            <th style="text-align: center">{{infos.year}}-06</th>
            <th style="text-align: center">{{infos.year}}-07</th>
            <th style="text-align: center">{{infos.year}}-08</th>
            <th style="text-align: center">{{infos.year}}-09</th>
            <th style="text-align: center">{{infos.year}}-10</th>
            <th style="text-align: center">{{infos.year}}-11</th>
            <th style="text-align: center">{{infos.year}}-12</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,$index) in infos.items.records">
            <td>{{(searchParams.pageNo-1)*searchParams.pageSize+1+$index}}</td>
            <td>{{ item.employeeName }}</td>
            <td data-toggle="tooltip" :title="item.departmentName" style="width:100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ item.departmentName }}</td>
            <td style="text-align: center" :style="{'color': item.submittedCounts[0] ? '#666666':'red'}">{{ item.submittedCounts[0] ? '√': '×'}}</td>
            <td style="text-align: center" :style="{'color': item.submittedCounts[1] ? '#666666':'red'}">{{ item.submittedCounts[1] ? '√': '×'}}</td>
            <td style="text-align: center" :style="{'color': item.submittedCounts[2] ? '#666666':'red'}">{{ item.submittedCounts[2] ? '√': '×'}}</td>
            <td style="text-align: center" :style="{'color': item.submittedCounts[3] ? '#666666':'red'}">{{ item.submittedCounts[3] ? '√': '×'}}</td>
            <td style="text-align: center" :style="{'color': item.submittedCounts[4] ? '#666666':'red'}">{{ item.submittedCounts[4] ? '√': '×'}}</td>
            <td style="text-align: center" :style="{'color': item.submittedCounts[5] ? '#666666':'red'}">{{ item.submittedCounts[5] ? '√': '×'}}</td>
            <td style="text-align: center" :style="{'color': item.submittedCounts[6] ? '#666666':'red'}">{{ item.submittedCounts[6] ? '√': '×'}}</td>
            <td style="text-align: center" :style="{'color': item.submittedCounts[7] ? '#666666':'red'}">{{ item.submittedCounts[7] ? '√': '×'}}</td>
            <td style="text-align: center" :style="{'color': item.submittedCounts[8] ? '#666666':'red'}">{{ item.submittedCounts[8] ? '√': '×'}}</td>
            <td style="text-align: center" :style="{'color': item.submittedCounts[9] ? '#666666':'red'}">{{ item.submittedCounts[9] ? '√': '×'}}</td>
            <td style="text-align: center" :style="{'color': item.submittedCounts[10] ?'#666666':'red'}">{{ item.submittedCounts[10] ? '√': '×'}}</td>
            <td style="text-align: center" :style="{'color': item.submittedCounts[11] ?'#666666':'red'}">{{ item.submittedCounts[11] ? '√': '×'}}</td>
          </tr>
          </tbody>
        </table>
        <!--月报-->
        <table class="table table-striped table-hover" v-if="searchParams.month && searchParams.type ==3">
          <thead>
          <tr>
            <th width="100px;" rowspan="2">序号</th>
            <th>姓名</th>
            <th style="width:100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">部门</th>
            <th style="text-align: center">{{searchParams.year}}-{{searchParams.month - 0 + 1}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,$index) in infos.items.records">
            <td>{{(searchParams.pageNo-1)*searchParams.pageSize+1+$index}}</td>
            <td>{{ item.employeeName }}</td>
            <td data-toggle="tooltip" :title="item.departmentName" style="width:100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ item.departmentName }}</td>
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
  import wisdom from '../../module';
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
       this.$router.push({name:'workReportSubDetail',query:{params:JSON.stringify(params)}})
     },
      // 导出
      exportClick(){
        var params = {
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
        console.log( this.searchParams)
        this.getList();
      }
    },
    mounted () {

    }
  }
</script>
<style lang="less" scoped >
  .ml5 {
    margin-left: 5px;
  }
  .font-18 {
    font-size: 18px;
  }
  .col-grey {
    color: #939BA4;
  }
  .line-height-34 {
    line-height: 34px;
  }

  /*头部筛选条件*/

  .header {
    padding: 0 20px;
    margin-top: 30px;
  }
  .header .header_item .filter {
    margin-right: 20px;
    display: inline-block;
    cursor: pointer;
  }

  .header .header_item .input-group {
    width: 210px;
    float: left;
  }

  .header .header_item .form-group {
    margin-bottom: 0;
    width: 300px;
  }
  /*主体*/
  .content {
    padding: 60px 0 20px;
  }

  .content .list {
    margin-top: 10px;
    box-shadow: 0 5px 15px #dae3ef, 0 0 1px #dae3ef, 0 0 1px #dae3ef;
  }

  .content .item {
    padding: 20px 110px;
    cursor: pointer;
    position: relative;
  }

  .content .item.active {
    background-color: #F8F8F8;
  }

  .content .item .avatar_box {
    height: 90px;
    width: 90px;
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .content .item .avatar_box img {
    height: 100%;
    width: 100%;
    display: block;
  }
  .content .item .text_box {
    padding-left: 20px;
    min-height: 90px;
    width: 70%;
  }

  .content .item .text_box p {
    margin-bottom: 4px;
  }

  .content .item .text_box p:last-of-type {
    margin: 0;
  }

  .content .item .text_box p>span {
    float: left;
  }

  .content .item .text_box .project_name {
    width: 280px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .content .item .price {
    width: 30%;
    padding-left: 50px;
  }

  .content .item .price p:last-of-type {
    font-size: 25px;
    font-weight: bold;
  }

  .content .item .status_box {
    width: 90px;
    position: absolute;
    top: 30px;
    right: 20px;
    text-align: center;
  }

  .content-price {
    color: #333;
    vertical-align: bottom;
    display: inline-block;
    font-size: 16px;
    padding-right: 40px;
  }

  .content-price i{
    color: #248bfe;
    padding-right: 5px;
    font-style:normal;
    font-size: 20px;
    font-weight: bolder;
  }

  .content-total {
    height: 34px;
    line-height: 50px;
    vertical-align: bottom;
    display: inline-block;
  }

  .content-total label {
    color: #248bfe;
    margin: 0 3px;
  }

  .bs-component {
    margin-top: 10px;
  }
  /*表格*/
  .table tbody tr{
    cursor: pointer;
  }
  .content .table tr td{
    border: none;
  }


  #filter-condition .modal {
    position: relative;
  }

  #filter-condition .modal-dialog {
    width: 99.9%;
    margin: 22px 1px;
  }

  #filter-condition .modal-content {
    border: #a4abb2;
    border-radius: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  #project_select .modal-body .projects .item{
    width:auto;
  }
  /*日期控件*/
  /*.uib-datepicker-popup .btn-default{*/
  /*border-color: transparent;*/
  /*!*padding: 5px 20px;*!*/
  /*}*/

  /*.uib-datepicker-popup thead tr:last-of-type{*/
  /*background-color: #F1F1F1;*/
  /*height: 30px;*/
  /*border-top: 1px solid #CCCCCC;*/
  /*border-bottom: 1px solid #CCCCCC;*/
  /*}*/

  /*.uib-datepicker-popup .btn-info.active{*/
  /*background-color: transparent;*/
  /*border-color: #00a0e9;*/
  /*color: #00a0e9;*/
  /*}*/

  /*选择周*/
  .weeks{
    position: relative;
  }

  .week-box{
    position: absolute;
    top: 34px;
    /*height: 250px;*/
    min-width: 442px;
    background-color: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    padding-top: 5px;
    z-index: 100;
  }

  .week-box .btn-default{
    border-color: transparent;
  }

  .week-box_header--year{
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    font-weight: 700;
    vertical-align: middle;
  }

  .week-box_info{
    border-top: 1px solid #CCCCCC;
    border-bottom: 1px solid #CCCCCC;
    padding: 8px 0;
    background-color: #F1F1F1;
    font-size: 12px;
    font-weight: 700;
  }

  .week-box_info div:first-of-type{
    border-right: 1px solid #CCCCCC;

  }

  .week-box_content{
    border-bottom: 1px solid #CCCCCC;
  }

  .week-box_content .btn-default.active{
    border-color: #248bfe;
    color: #248bfe;
    background-color: transparent;
  }

  .week-box_content div{
    width: 220px;
    padding: 20px;
    /*height: 160px;*/
  }

  .week-box_content>div:last-of-type{
    width: 219px;
    border-left: 1px solid #CCCCCC;
  }

  .week-box_footer{
    padding: 20px;
  }

  .week-box_footer .btn-default{
    border-color: #CCCCCC;
  }
  #workReportTotal .table tbody tr:nth-of-type(1){
    font-weight: 700;
  }
  #reportDetailTable .table thead tr th{
    min-width: 66px;
  }
  #reportDetailTable .table tr td{
    max-width: 150px;
  }
  .text-left{
    text-align: left;
  }
</style>
