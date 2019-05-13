<template>
  <div class="animated fadeIn">
    <div class="header clearfix">
      <div class="header-item">
        <span class="col-grey font-14">汇报类型</span>
        <Select @on-change="typeToggle" v-model= "typeText" style="width:150px">
          <Option :value="type.name" v-for="(type,index) in types" :key="index" > {{type.name}}</Option>
        </Select>
      </div>
      <div class="header-item">
        <span class="col-grey font-14">选择项目</span>
        <Input type="text" style="width: 180px"  @on-focus="projectSelect()"  v-model="projectText"  placeholder="请选择项目"/>
      </div>
      <div class="header-item">
        <span class="col-grey font-14">选择日期</span>
        <reportDateStatics :workReportType="reportDatas.workReportType" :reportDatas.sync="reportDatas"></reportDateStatics>
      </div>
      <div class="header-item">
        <span class="col-grey font-14">提交状态</span>
        <Select  v-model= "statuText"  @on-change="statuToggle"  style="width:150px">
          <Option :value="statu.name" v-for="(statu,index) in status" :key="index" > {{statu.name}}</Option>
        </Select>
      </div>
      <div class="header-item pull-right">
        <Button type="primary" class="btn-width-70" size="large" @click="statisticsSearch()">查找</Button>
        <Button type="default" class="btn-width-70" size="large" @click="clean()">清空</Button>
      </div>
    </div>
    <div class="content" v-if="datas.length">
      <!--控制按钮-->
      <div class="controls">
        <span class="pre pull-left fa fa-chevron-left" @click="pre()"></span>
        <span class="next pull-right fa fa-chevron-right" style="margin-right: 30px;" @click="next()"></span>
      </div>
      <div class="content-item" v-for="(data,index) in datas" :key="index">
        <h4 class="content-item-header">{{data.departmentName}}</h4>
        <!--主体-->
        <div class="content-item-body clearfix">
          <div class="col-sm-6 item-box" v-for="(item,iindex) in data.workReports" :key="iindex" ng-init="getIcon(item)">
            <div class="inner-box clearfix">
              <div class="avatar">
                <span v-show="!item.headImg">{{item.employeeName.charAt(item.employeeName.length - 1, 1)}}</span>
                <img v-if="item.headImg" error-src :src="buildDownloadUrl(item.headImg)">
              </div>
              <div class="pull-left">
                <p class="col-blue">{{item.employeeName}}</p>
                <p class="no-mar col-grey">{{item.createTime}}</p>
                <p class="no-mar text-danger" v-show="!item.createTime">未提交</p>
              </div>
              <Button type="primary" class="pull-left" v-show="!item.createTime&&!item.isCd" @click="remind(item)">提醒TA</Button>
              <Button type="primary" class="pull-left" disabled v-show="!item.createTime&&item.isCd">{{item.cdTime}}秒</Button>

            </div>
          </div>
        </div>
      </div>
      <div class="remind-btn">
        <button class="btn btn-primary" v-show="!isCd" @click="remindAll(datas)">一键提醒</button>
        <button class="count-down" disabled v-show="isCd">{{cdTime}}秒后再提醒</button>
      </div>
    </div>
    <div class="gcb-data-null text-center"v-if="!datas.length">
      <img src="../images/data-null.png" alt="">
      <p>暂无数据</p>
    </div>
  </div>

</template>

<script>
  import{getDate,buildDownloadUrl} from '@/libs/tools'
  import report from '../module';
  import reportDateStatics from '../components/reportDateStatics';
  export default {
    name: 'announce-add',
    components:{ reportDateStatics},
    data() {
      return {
        reportDatas : {
          submitState:null,
          workReportType:1,
          date:new Date(),
          projectId:null,
          //不必提叫的参数
          year:new Date().getFullYear(),
          weeklyDate:null,
          monthDate:new Date(),
          isWeb: true,
          resultWeeks:[],
          currentIndex:0,
          month:new Date().getMonth()
        },

        types : [{ type: 1, name: "日报" }, { type: 2, name: "周报" }, { type: 3, name: "月报" }],
        typeText:"日报",
        statuText: "全部",
        status : [{type: null, name: "全部"}, {type: 1, name: "已提交"}, {type: 0, name: "未提交"}],
        projectText:"",
        datas:[],
        remindRequest:{
          type:null,
          date:null
        },
        lastNextMonth:null,
        isCd:false,
        cdTime:59,
      }
    },
    methods: {
      statisticsSearch () {
        let self=this;
        if (self.reportDatas.workReportType == 1) self.reportDatas.date =getDate(self.reportDatas.date,"yyyy-MM-dd");
        if (self.reportDatas.workReportType == 2) {self.reportDatas.date = self.reportDatas.year + "年" + self.reportDatas.weeklyDate;}
        if (self.reportDatas.workReportType == 3)self.reportDatas.date = getDate(self.reportDatas.monthDate,"yyyy-MM")
        if (!self.reportDatas.date && !self.reportDatas.weeklyDate) {
          self.$gcb.tooltip.open({
            message: "请选择筛选日期！",
            icon: "warning",
            timeout: 2000
          });
          return
        }
        report.api.report.statisticsSearch(self.reportDatas).then((result)=> {
          self.datas = result;
          // 提醒所需参数
          self.remindRequest.type = self.reportDatas.workReportType;
          self.remindRequest.date = self.reportDatas.date
        })
      },
      typeToggle(name) {
        let item=this.types.find(item=>item.name==name);
        this.reportDatas.workReportType = item.type;
        this.typeText = item.name
      },
      statuToggle(name){
        let item=this.status.find(items=>items.name==name);
        this.reportDatas.submitState = item.type;
        this.statuText = item.name
      },
      buildDownloadUrl(uuid) {
        return buildDownloadUrl(uuid)
      },
      // 选择项目（单选）
      async projectSelect() {
        let self=this;
        this.project = await this.$gcb.gcbProject.open({
          isAuthData: false,
          isSubCompanyProject: false,
          isIncludeCreatorProject: false
        });
        self.projectText= this.project.projectName;
        self.reportDatas.projectId=this.project.id;

      },
      // 清除筛选条件
      clean(){
        this.typeToggle(this.types[0].name);
        this.statuToggle(this.status[0].name);
        this.reportDatas.projectId = null;
        this.projectText = "";
        this.reportDatas.weeklyDate = null;
        this.statisticsSearch();
      },
      pre() {
        let self=this;
        if (self.reportDatas.workReportType == 1) {
          self.reportDatas.date = self.reportDatas.date.getTime() - 1000 * 60 * 60 * 24;
          self.statisticsSearch();
        }
        if (self.reportDatas.workReportType == 2) {
            self.reportDatas.currentIndex--;
            if(self.reportDatas.currentIndex<0){
              self.reportDatas.year--
              report.api.report.weekSearch({year:self.reportDatas.year }).then((result)=> {
                self.reportDatas.resultWeeks= result.join().split(',');
                self.reportDatas.currentIndex=self.reportDatas.resultWeeks.length-1;
                self.reportDatas.weeklyDate=self.reportDatas.resultWeeks[self.reportDatas.currentIndex];
                self.statisticsSearch();
              })
            }else{
              self.reportDatas.weeklyDate=self.reportDatas.resultWeeks[self.reportDatas.currentIndex];
              self.statisticsSearch();
            }
        }
        if (self.reportDatas.workReportType == 3) {
          let time=self.reportDatas.monthDate.setDate(1)
          time = self.reportDatas.monthDate.getTime() - 1000 * 60 * 60 * 24;
          self.reportDatas.monthDate=new Date(time);
          self.statisticsSearch();
        }

      },
      next() {
        let self=this;
        if (self.reportDatas.workReportType == 1) {
          self.reportDatas.date = self.reportDatas.date.getTime() + 1000 * 60 * 60 * 24;
          self.statisticsSearch();
        }
        if (self.reportDatas.workReportType == 2) {
            self.reportDatas.currentIndex++;
          if(self.reportDatas.currentIndex==self.reportDatas.resultWeeks.length-1){
            self.reportDatas.year++
            report.api.report.weekSearch({year:self.reportDatas.year }).then((result)=> {
              self.reportDatas.resultWeeks= result.join().split(',');
              self.reportDatas.currentIndex=0;
              self.reportDatas.weeklyDate=self.reportDatas.resultWeeks[0];
              self.statisticsSearch();
            })
          }else{
            self.reportDatas.weeklyDate=self.reportDatas.resultWeeks[self.reportDatas.currentIndex];
            self.statisticsSearch();
          }
        }
        if (self.reportDatas.workReportType == 3) {
          let time=self.reportDatas.monthDate.setDate(1)
          time = self.reportDatas.monthDate.getTime() + 31*1000 * 60 * 60 * 24;
          self.reportDatas.monthDate=new Date(time);
          self.statisticsSearch();
        }

      },
       remind (item) {
        this.$set(item,"isCd",true)
        this.$set(item,"cdTime",60)
         let stop = setInterval(()=> {
            item.cdTime-=1;
            if(item.cdTime == 0){
              clearInterval(stop);
              this.$set(item,"isCd",false)
            }
          },1000);
          report.api.report.remind(
            {
              employeeId:item.employeeId,
              isWeb:true,
              workReportType:this.remindRequest.type,
              reportDate:this.remindRequest.date
            }).then(()=> {
            this.$gcb.tooltip.open({
              message:"提醒成功",
              timeout:2000
            });
          })
        },
      remindAll(item) {
        let self=this;
        if (self.reportDatas.workReportType == 1) self.reportDatas.date =getDate(self.reportDatas.date,"yyyy-MM-dd");
        if (self.reportDatas.workReportType == 2) {
          self.reportDatas.date = self.reportDatas.year + "年" + self.reportDatas.weeklyDate;
        }
        if (self.reportDatas.workReportType == 3) self.reportDatas.date = getDate(self.reportDatas.date,"yyyy-MM");
        if (!self.reportDatas.date && !self.reportDatas.weeklyDate) {
          self.$gcb.tooltip.open({
            message: "请选择筛选日期！",
            icon: "warning",
            timeout: 2000
          });
          return
        }
        // 定时器
        this.isCd=true;
        let stop2 = setInterval(()=> {
          this.cdTime --;
          if(this.cdTime == 0) {
            clearInterval(stop2);
            this.isCd = false;
            this.cdTime=60
          }
        }, 1000);
        report.api.report.oneKeyRemind(this.reportDatas).then(()=> {
          this.$gcb.tooltip.open({
            message: "提醒成功",
            timeout: 2000
          });
        })
      }
    },
    mounted () {
      this.statisticsSearch();
    },
  }
</script>
<style lang="less" scoped >
  .col-grey {
    color: #939BA4;
  }

  .col-blue {
    color: #1b56a5;
  }

  .wd100 {
    width: 120px;
  }

  .no-mar {
    margin: 0;
  }
  .col-sm-6 {
    width: 50%;
    float: left;
  }
  .font-12 {
    font-size: 12px;
  }

  .dropdown-menu {
    min-width: 160px;
  }

  .arrow-padding {
    padding-left: 14px !important;
    padding-right: 15px !important;
  }

  /*头部*/
  .header {
    margin-top: 15px;
    padding: 15px;
    background-color: white;
  }

  .header-item {
    display: inline-block;
    margin: 10px 15px;
  }

  .header-item input {
    display: inline-block;
    width: 160px;
  }

  .header-item > span {
    margin-right: 5px;
  }

  .header-item .data {
    width: 200px;
    display: inline-block;
    margin: 0;
    vertical-align: middle;
  }

  .controls {
    width: 100%;
    height: 54px;
    position: absolute;
    top: 50%;
    margin-top: -27px;
  }

  .controls .pre, .controls .next {
    height: 54px;
    line-height: 56px;
    width: 30px;
    color: white;
    display: block;
    background-color: #c0c0c0;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    font-size: 18px;
  }

  /*内容*/
  .content {
    margin-top: 15px;
  }

  .content-item {
    padding: 0px 35px 25px 35px;
    background-color: white;
  }

  .content-item-header {
    height: 50px;
    line-height: 50px;
    margin: 0;
    padding-left: 30px;
    border-bottom: 2px solid #E9E9E9;
  }

  .content-item-body {
    padding: 0 15px;
  }

  .content-item-body .item-box {
    border-bottom: 1px dashed #f5f5f5;
    padding: 20px 15px;
    /*padding-left: 0;*/
  }

  .content-item-body .item-box:nth-child(2n+1) .inner-box {
    border-right: 1px dashed #f5f5f5;
  }

  .content-item-body .inner-box {
    position: relative;
    padding-left: 60px;
  }

  .content-item-body .avatar {
    height: 50px;
    width: 50px;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    border-radius: 25px;
  }

  .content-item-body .avatar img {
    height: 100%;
    width: 100%;
    display: block;
  }

  .content-item-body .avatar span {
    height: 100%;
    width: 100%;
    display: block;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    background-color: #248bfe;
    color: white;
  }

  .content-item-body .inner-box button {
    margin-top: 10px;
    margin-left: 100px;
    /*margin-right: 50px;*/
  }
  /*一键提醒4.0*/
  .remind-btn {
    margin-top: 70px;
    display: flex;
    justify-content: center;
  }
  .remind-btn .btn {
    width: 240px;
    height: 40px;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    background-color: #248bfe;

  }
  .remind-btn .count-down{
    width: 240px;
    height: 40px;
    border-radius: 5px;
    font-size: 16px;
    color: #fff;
    background-color: #bdc7d2;
    border: none;
  }
</style>
