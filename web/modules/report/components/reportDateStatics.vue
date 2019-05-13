<template>
  <div class="items">
    <div class="data" v-show="reportDatas.workReportType == 1">
      <div class="input-group ">
        <Col span="12">
          <DatePicker type="date"  :editable=false v-model="reportDatas.date"  style="width: 200px"></DatePicker>
        </Col>
      </div>
    </div>
    <div class="data weeks" v-show="reportDatas.workReportType == 2" style="width: 200px">
      <div class="input-group ">
        <div class="ivu-input-wrapper ivu-input-type ivu-date-picker-editor">
          <i class="ivu-icon ivu-icon-ios-calendar-outline ivu-input-icon ivu-input-icon-normal"  @click.nactive="showWeeks = !showWeeks; loadWeek()"></i>
          <input autocomplete="off"  spellcheck="false" v-model="reportDatas.weeklyDate" type="text" readonly="readonly" class="ivu-input" :placeholder="reportDatas.weeklyDate"> <!---->
        </div>
      </div>
      <!--选择周-->
      <div class="week-box" v-show="showWeeks">
        <!--表头-->
        <div class="week-box_header clearfix">
            <Button class="left btn btn-default" @click="reportDatas.year= reportDatas.year - 1;loadWeek()">
              <i class="fa glyphicon fa-chevron-left"></i>
            </Button>
             <div class=" left text-center week-box_header-year">{{reportDatas.year}}</div>
            <Button class="right btn-default" @click="reportDatas.year=reportDatas.year + 1;loadWeek()">
              <i class="fa glyphicon fa-chevron-right"></i>
            </Button>
        </div>
        <!--信息-->
        <div class="week-box_info clearfix">
          <div class="col-sm-6 text-center">月</div>
          <div class="col-sm-6 text-center">周</div>
        </div>
        <!--内容-->
        <div class="week-box_content clearfix">
          <div class="pull-left">
            <Button class="btn btn-default btn-sm col-sm-4" v-for='(item,index) in monthArr' @click="monthToggle(index)" :key="index" :class="{active:index==reportDatas.month}">{{item}}月</Button>
          </div>
          <div class="pull-left">
            <Button class=" btn-default btn-sm col-sm-12" style="font-size: 14px;"  v-for="(week,index) in weeks" :key="index" :class="{active:week ==reportDatas.weeklyDate}"   @click="weekToggle(index,week)" >{{week}}</Button>
          </div>
        </div>
        <!--按钮组-->
        <div class="week-box_footer clearfix">
          <div class="pull-right">
            <Button class="btn-primary btn-width-70" @click="choose()">确定</Button>
            <Button class="btn-default btn-width-70 mar-left-5" @click="showWeeks = false">取消</Button>
          </div>
        </div>
      </div>
    </div>
    <div class="data" v-show="reportDatas.workReportType == 3">
      <div class="input-group ">
        <Col span="12">
        <DatePicker :editable=false type="month" format="yyyy-MM"   v-model="reportDatas.monthDate"  style="width: 200px"></DatePicker>
        </Col>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getWeek,
    getDate
  } from '@/libs/tools'
  import report from '../module';
    export default {
        name: "report-type",
        data(){
          return{
            // 汇报类型切换
            types : [
              { type: null, name: "全部" },
              { type: 1, name: "日报" },
              { type: 2, name: "周报" },
              { type: 3, name: "月报" }
            ],
            monthArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12],
            typeText:null,
            showWeeks:false,
            weeksData : [],
            weeks:"",
            temp:"",
            currentWeek:0,
          }
        },
      props:{
        reportDatas:Object,
        workReportType:Number,
      },
      methods:{
        // 获取当前是第几周
         getMonthWeek (a, b, c) {
          var date = new Date(a, parseInt(b), c),
            w = date.getDay(), //周几
            d = date.getDate(); //几号
          return Math.ceil((d + 6 - w) / 7);
        },
        geturrentWeek(){
          let currentWeek=this.getMonthWeek(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) < 0 ? 0 :this.getMonthWeek(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) - 1;
          this.currentWeek = currentWeek < 0 ? 0 : currentWeek;
        },
        // 切换类型
        toggle() {
          let self= this;
          self.showWeeks = false;
          self.today();
          if (self.reportDatas.workReportType == 2) {
            self.reportDatas.date = null;
            report.api.report.weekSearch({ year: self.reportDatas.year }).then(function(result) {
              self.weeks = self.weeksData[self.month];
              // 设置默认本周;
              self.reportDatas.weeklyDate= result[new Date().getMonth()][self.currentWeek];
              //扁平化获取的周
              self.reportDatas.resultWeeks = result.join().split(',');
              //获取当前年度第几周
              self.reportDatas.currentIndex=self.reportDatas.resultWeeks.indexOf(self.reportDatas.weeklyDate)

            })
          }
        },
        weekToggle(index, info) {
          this.temp = info;
          this.reportDatas.weeklyDate = info;
        },
        // 月
        monthToggle(month) {
          this.reportDatas.month = month ;
          this.weeks = this.weeksData[month];
        },
        // 确定选择
        choose() {
          this.showWeeks = false;
          this.reportDatas.currentIndex=this.reportDatas.resultWeeks.indexOf(this.temp)
        },
        // 日期
        today() {
          if (this.reportDatas.workReportType == 3) {
            var date = new Date();
            date.setDate(1);
            this.reportDatas.date = date;
          } else {
            this.reportDatas.date = new Date();
          }
        },
        // 获取当前天的周一和周日
        loadWeek() {
          if (!this.showWeeks) return;
          report.api.report.weekSearch({ year: this.reportDatas.year }).then(result=> {
            this.weeksData = result;
            this.weeks =this.weeksData[this.reportDatas.month];
          })
        },
      },
      watch:{
        workReportType: {
            handler: function (val, oldVal) {
              this.toggle()
           },
        }
      },
      created(){
        this.geturrentWeek();
      }
    }
</script>

<style lang="less" scoped>
  /*选择周*/
  .weeks{
    position: relative;
    z-index: 100;
  }
   /*.ivu-input{*/
    /*text-align: center;*/
  /*}*/
  .weeks .form-control:disabled, .form-control[readonly] {
    background-color: #fff;
    opacity: 1;
  }
  .btn-width-70{
    width: 70px;
  }
  .items{
    display: inline-block;
  }
  .btn-default:active:hover, .btn-default.active:hover, .open>.dropdown-toggle.btn-default:hover, .btn-default:active:focus, .btn-default.active:focus, .open>.dropdown-toggle.btn-default:focus, .btn-default:active.focus, .btn-default.active.focus, .open>.dropdown-toggle.btn-default.focus {
    color: #333;
    background-color: #d4d4d4;
    border-color: #8c8c8c;
  }
  .input-group-btn button{
    margin-left: -1px;
    height: 34px;
    width: 34px;
  }
  .week-box{
    position: absolute;
    top: 34px;
    left: 0;
    /*height: 250px;*/
    min-width: 442px;
    background-color: #FFFFFF;
    border: 1px solid #CCCCCC;
    border-radius: 5px;
    padding-top: 5px;
  }

  .week-box .btn-default{
    border-color: transparent;
    background: #ffff;
    font-size: 14px;

  }

  .week-box_header-year{
    display: inline-block;
    height: 30px;
    width: 80%;
    margin: 0 auto;
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
  .week-box_info div{
    float: left;
  }
  .week-box_info div:first-of-type{
    border-right: 1px solid #CCCCCC;

  }

  .week-box_content{
    border-bottom: 1px solid #CCCCCC;
  }
  .week-box_content .btn-default.active {
    border-color: #248bfe!important;
    color: #248bfe;
    background-color: transparent;
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

</style>
