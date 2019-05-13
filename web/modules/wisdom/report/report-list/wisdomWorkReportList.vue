<template>
  <div class="animated fadeIn">
    <Menu mode="horizontal" active-name='1' @on-select="tabsClick">
      <MenuItem class="nav-tab-item" name='1'>日报</MenuItem>
      <MenuItem class="nav-tab-item" name='2'>周报</MenuItem>
      <MenuItem class="nav-tab-item" name='3'>月报</MenuItem>
      <Button class="pull-right mt-10 btn-width-90" size="large" @click="back()">返回</Button>
    </Menu>
    <!--筛选条件-->
    <div class="header" style="border: 1px solid #EEEEEF;padding: 20px; margin-top: 30px;">
      <!--项目选择-->
      <div class="header_item project_select mb-20" >
        <span class="col-grey pull-left">部门：</span>
        <div class="selected clearfix">
          <span class="mar-left-10" v-show="!searchParams.departmentName">全部</span>
          <div class="selected_item" :class="{'active':currentDepartment}" @mouseover="currentDepartment=true" @mouseleave="currentDepartment=false" v-show="!!searchParams.departmentName">
            <span class="text-primary" v-show="searchParams.departmentName">{{searchParams.departmentName}}</span>
            <span class="selected_close font-12" v-show="currentDepartment" @click="removeDepartment()">×</span>
          </div>
          <Button type="default" size="large" shape="circle" class="btn-width-90 ivu-btn-primary" v-if="!searchParams.departmentName" @click="deparmentSelect()">选择部门</Button>
        </div>
      </div>
      <!--日期-->
      <div class="header_item clearfix line-height-34">
        <span class="col-grey pull-left">日期：</span>
         <div class="mar-left-10 pull-left">
          <div class="header-item">
            <Select v-model="searchParams.year" style="width:200px">
              <Option v-for="item in years" :value="item.name" :key="item.name">{{ item.name }}年</Option>
            </Select>
          </div>
        </div>
        <div class="mar-left-10 pull-left">
          <div class="header-item">
            <Select placeholder="全部" v-model="searchParams.month" style="width:200px">
              <Option v-for="item in monthArr" :value="item-1" :key="item">{{ item}}月</Option>
            </Select>
          </div>
        </div>
        <div class="pull-right">
          <Button class="pull-right mar-left-10 btn-width-70" size="large"@click="clean()">清空</Button>
          <Button type="primary" class="pull-right mar-left-10 btn-width-70" size="large"@click="search()">查找</Button>
        </div>
      </div>
    </div>
    <!--内容-->
    <div class="content" v-if="!!infos.length" id="workReportTotal">
      <div class="clearfix" style="overflow: hidden;line-height: 34px">
        <div class="pull-left" style="color: #999">
          <span style="margin-right: 36px">部门提交率=实际提交次数÷应提交次数</span>
          <span>对比整体=部门提交率-整体提交率</span>
        </div>
        <div class="pull-right">
          <button class="btn btn-primary btn-width-90" v-if="isHasPermission" @click="exportExcel()">导出</button>
        </div>
      </div>
      <div class="bs-component contract-table">
        <table class="table table-hover">
          <thead>
          <tr>
            <th>部门</th>
            <th style="text-align: right">提交总数</th>
            <th style="text-align: right">未提交总数</th>
            <th style="text-align: right">提交率(%)</th>
            <th style="text-align: right;padding-right: 15px">对比整体(%)</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(info,$index) in infos " @click="waterClick(info.departmentID,info.departmentName)">
            <td><div style="min-width:560px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-size: 14px" :style="{paddingLeft: info.departmentLevel < 3 ? ((info.departmentLevel * 30)+'px') : '60px',color: info.departmentLevel > 1 ? '#939ba4' : '#666'}">{{info.departmentName}}</div></td>
            <td style="text-align: right" ng-style="{'color': info.submittedCount>=0?'#666666':'red'}">{{info.submittedCount}}</td>
            <td style="text-align: right" ng-style="{'color': info.unsubmittedCount>=0?'#666666':'red'}">{{info.unsubmittedCount}}</td>
            <td style="text-align: right" ng-style="{'color': info.submittedRate>=0?'#666666':'red'}">{{info.submittedRate}}</td>
            <td style="text-align: right;padding-right: 15px" ng-style="{'color': info.rateDiff>=0?'#666666':'red'}">{{info.rateDiff}}</td>
          </tr>
          </tbody>
        </table>
      </div>
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
        years:[],
        monthArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12],
        currentDepartment:false,
        activeName:1,
        searchParams:{
          departmentID: '',
          month: '',
          type: 1,
          year: new Date().getFullYear(),
          //非必填参数
          departmentName:"",
        },
        infos:[],
      }
    },
    computed:{
      isHasPermission(){
        return hasPermission(225)
      }
    },
    methods: {
      tabsClick(item){
        if(item){
          this.activeName=item;
          this.searchParams.type=item;
        }else{
          this.activeName=this.searchParams.type;
        }
        this.getList()
      },
      getStorage(){
        if (locals.isEmptyObject("ApplyListParams")) {
          this.getList();
        }else{
          this.searchParams= locals.getObject("ApplyListParams");
          console.log(this.searchParams)
          this.tabsClick();
        }
      },
      getYearArr(){
        const currentYear = new Date().getFullYear();
        this.years =[
          {name: currentYear - 2},
          {name: currentYear - 1},
          {name: currentYear - 0}
        ];
      },
      back(){
        this.$router.go(-1);
      },
      // 选择部门（单选）
      async deparmentSelect() {
        const department = await this.$gcb.gcbDeparment.open();
        this.searchParams.departmentID= department.id;
        this.searchParams.departmentName= department.departmentName;
      },
      removeDepartment(){
        this.searchParams.departmentName = '';
        this.searchParams.departmentID = ''
      },
      search(){
        this.getList();
      },
      // 清除筛选条件
      clean() {
       this.searchParams={
         departmentID: '',
         month: '',
         type: 1,
         year: new Date().getFullYear(),
         departmentName:"",
       }
        this.getList();
      },
      getList(){
        wisdom.api.report.dayReport(this.searchParams).then((result)=>{
          this.infos = result;
        });
      },
      //详情
       waterClick() {
        locals.setObject("ApplyListParams", this.searchParams);
         this.$router.push({name:'workReportDetail', query:{params:this.searchParams}});
      },
      exportExcel(){
        wisdom.api.wisdom.report.dailyReportExport(this.searchParams);
      }
    },
    created(){
      this.getYearArr();
    },
    mounted () {
     this.getStorage()
    }
  }
</script>
<style lang="less" scoped >
  .nav-tab-item{
    width: 140px;
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: -2px;
  }
  .mt-10{
    margin-top: 10px;
  }
  mt-30{
    margin-top: 30px;
  }
  .mb-20{
    margin-bottom: 20px;
  }
  .mar-left-10{
    margin-left: 10px;
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

  /*选择项目*/
  .header .project_select {
    position: relative;
    padding-left: 45px;
  }

  .header .project_select>span {
    position: absolute;
    top: 0;
    left: 0;
    /*width: 45px;*/
    line-height: 40px;
  }

  .header .project_select .selected {
    padding-right: 100px;
    position: relative;
    min-height: 40px;
  }

  .header .project_select .selected_item {
    box-sizing: border-box;
    padding: 0 10px;
    /*max-width: 200px;*/
    max-width: 230px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
    margin: 0 10px;
    position: relative;
  }

  .header .project_select .selected_item.active {
    background-color: #f4f4f4;
  }

  .header .project_select .selected_close {
    position: absolute;
    right: 2px;
    top: 2px;
    color: #AAAAAA;
    cursor: pointer;
    line-height: normal;
  }

  .header .project_select .selected_btn {
    position: absolute;
    right: 0;
    top: 5px;
  }
  .header .project_select .selected_btn.none {
    position: static;
    margin-left: 20px;
  }
  /*主体*/
  .content {
    padding: 60px 0 20px;
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
  .table thead th {
    border-bottom: 0;
  }
</style>
