<template>
  <div id="homeWork">
    <div class="header clearfix">
      <div class="left">
        <div class="img">
          <img src="../../../static/img/home/logo.png" style="width:56px;height:56px;background-color: #ccc;">
        </div>
        <div class="leftContent">
          <h3>{{employeeName}}，{{systemGreetData.greetWord}}</h3>
          <p>{{systemGreetData.greetSentence}}</p>
        </div>
      </div>
      <div class="right">
        <div class="rightContent">
          <h3>{{systemGreetData.solarCalendar}}</h3>
          <p>{{systemGreetData.lunarCalendar}}</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="common clearfix">
        <div class="notice">
          <div class="tittle clearfix">
            <h4 class="pull-left">公告</h4>
            <p class="pull-right">更多</p>
          </div>
          <ul class="list">
            <li class="clearfix" v-if="noticeData&&noticeData.length" :class="{ 'fontColor': item.isRead }" v-for="item in noticeData">
              <span class="span1">{{item.createTime | YYYYMMDD }}</span>
              <span class="span2">{{item.title}}</span>
              <span class="span3">发布人：{{item.publisher}}</span>
            </li>
            <div class="prompt" v-if="!noticeData.length">
              <img src="../../../static/img/home/work-report-un-submit.png" />
              <span>暂无公告</span>
            </div>
          </ul>
        </div>
        <div class="attendance">
          <div class="tittle">
            <h4 class="pull-left">考勤</h4>
          </div>
          <!-- <div class="data-body" v-show="!attendanceData.isPast">
              <div class="attendance-item" v-for="timeInterval in attendanceData.timeIntervals track by $index">
                <div>
                  <div class="row">
                    <div class="col-sm-5 attendance-pre">
                      <div v-if="data.shiftType==1">{{timeInterval.beginTimeToString}}</div>
                      <div>上班</div>
                    </div>
                    <div class="col-sm-7 attendance-record-pre" v-show="!timeInterval.signInIsClock">无需打卡</div>
                    <div class="col-sm-7 attendance-record-pre" v-show="timeInterval.signInIsClock">
                      <div v-show="timeInterval.isCurrentTimeInterval">
                        <span class="attendance-record-time">{{timeInterval.positionLocuss[0].createTime | date:'HH:mm'}}</span>
                        <span v-show="timeInterval.positionLocuss[0].abnormalTime" class="text-danger">迟到</span>
                        <button v-show="timeInterval.positionLocuss.length == 0 && timeInterval.signInIsClock " @click="attendance(timeInterval)" type="button" class="btn btn-primary btn-sm">签到</button>
                      </div>
                      <div class="attendance-record-address">{{timeInterval.positionLocuss[0].address || timeInterval.positionLocuss[0].ip}}
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-5">-</div>
                    <div class="col-sm-7">-</div>
                  </div>
                  <div class="row">
                    <div class="col-sm-5 attendance-next">
                      <div v-if="data.shiftType==1">{{timeInterval.endTimeToString}}</div>
                      <div>下班</div>
                    </div>
                    <div class="col-sm-7 attendance-record-pre" v-show="!timeInterval.signOutIsClock">无需打卡</div>
                    <div class="col-sm-7 attendance-record-next" v-show="timeInterval.signOutIsClock">
                      <div v-show="timeInterval.isCurrentTimeInterval">
                        <span class="attendance-record-time">{{timeInterval.positionLocuss[1].createTime | date:'HH:mm'}}</span>
                        <span v-show="timeInterval.positionLocuss[1].abnormalTime" class="text-danger">早退</span>
                        <button v-show="timeInterval.positionLocuss.length != 0 && timeInterval.signOutIsClock" @click="attendance(timeInterval)" type="button" class="btn btn-primary btn-sm">签退</button>
                      </div>
                      <div class="attendance-record-address">{{timeInterval.positionLocuss[1].address || timeInterval.positionLocuss[1].ip}}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div> -->
          <!-- <div class="empty-body" v-show="attendanceData.isPast">暂无班次~</div> -->
        </div>
        <div class=" report">
          <div class="tittle">
            <h4 class="pull-left">工作汇报</h4>
          </div>
          <div class="contentReport">
            <div class="panel-body">
              <div class="data-body" v-if="!!report">
                <div>
                  <img src="../../../static/img/home/work-report-submit.png" />今日已提交
                </div>
                <button type="button" class="ivu-btn ivu-btn-primary">编辑</button>
              </div>
              <div class="data-body" v-if="!report">
                <div>
                  <img src="../../../static/img/home/work-report-un-submit.png" />今日未提交</div>
                <button type="button" class="ivu-btn ivu-btn-primary">立即新增</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="approveAll">
        <ul class="tagList" v-if="backlogSearchResultData1">
          <li @click="backlogSearchBtn({'page':1,'type':null})" :class="{'primary':!backlogSearchData.type,'btn-default':backlogSearchData.type}">全部（{{backlogSearchResultData1.total||0}}）</li>
          <li @click="disabledBtn({'page':1,'type':'2'})" :class="{'primary':backlogSearchData.type=='2','btn-default':backlogSearchData.type!='2',
                  'disabledBtn':!backlogSearchResultData1.userData.processTotal}">审批（{{backlogSearchResultData1.userData.processTotal||0}}）</li>
          <li @click="disabledBtn({'page':1,'type':'1'})" :class="{'primary':backlogSearchData.type=='1','btn-default':backlogSearchData.type!='1',
                  'disabledBtn':!backlogSearchResultData1.userData.taskTotal}">任务（{{backlogSearchResultData1.userData.taskTotal||0}}）</li>
          <li @click="disabledBtn({'page':1,'type':'3'})" :class="{'primary':backlogSearchData.type=='3','btn-default':backlogSearchData.type!='3',
                  'disabledBtn':!backlogSearchResultData1.userData.qualityTotal}">质量（{{backlogSearchResultData1.userData.qualityTotal||0}}）</li>
          <li @click="disabledBtn({'page':1,'type':'4'})" :class="{'primary':backlogSearchData.type=='4','btn-default':backlogSearchData.type!='4',
                  'disabledBtn':!backlogSearchResultData1.userData.safetyTotal}">安全（{{backlogSearchResultData1.userData.safetyTotal||0}}）</li>
        </ul>
        <div class="contentList" v-if="backlogSearchResultData">
          <div class="content" v-show="backlogSearchResultData1.records.length">
            <div class="left" @click="leftApproveBtn()"><img src="../../../static/img/home/home-left.png" alt=""></div>
            <div class="middle">
              <ul class="list">
                <li class="message-item" v-for="matter in backlogSearchResultData.records">
                  <!-- 审批 -->
                  <div v-show="matter.type===2" class="box">
                    <div class="message-item-header clearfix">
                      <div class="message-status">
                        <span class="label label-warning" style="background-color:#4dd0e1" v-if="matter.matter.processStatusNameShow=='通过'||matter.matter.processStatusNameShow=='同意'">{{matter.matter.recordStatusNameShow}}</span>
                        <span class="label label-warning" style="background-color:#ff517a" v-if="matter.matter.processStatusNameShow=='未通过'">{{matter.matter.recordStatusNameShow}}</span>
                        <span class="label label-warning" style="background-color:#f6be1a" v-if="matter.matter.processStatusNameShow=='审批中'">{{matter.matter.recordStatusNameShow}}</span>
                        <span class="label label-warning" style="background-color:#ff517a" v-if="matter.matter.processStatusNameShow=='终止'">{{matter.matter.recordStatusNameShow}}</span>
                        <span class="label label-warning" style="background-color:#8c9eff" v-if="matter.matter.processStatusNameShow=='已撤回'">{{matter.matter.recordStatusNameShow}}</span>
                      </div>
                      <div class="message-tag">
                        <span class="label label-warning">审批</span>
                      </div>
                      <div class="message-title">
                        <label>{{matter.matter.processName}} - {{matter.matter.processTypeName}}</label>
                      </div>
                    </div>
                    <div class="message-item-content">申请内容：{{matter.matter.processName}}</div>
                    <div class="message-item-footer">
                      <div class="message-text">
                        <span>申请人：</span>{{matter.matter.employeeName}}</div>
                      <div class="message-text">
                        <span>下一级审批人：</span>{{matter.matter.approveEmployeeName}}</div>
                      <div class="message-text">
                        <span>停留时间：</span>{{matter.matter.residenceTimeShow}}</div>
                      <div class="message-date">{{matter.matter.updateTimeShow}}</div>
                    </div>
                  </div>
                  <!-- 任务 -->
                  <!-- taskResponsibleDetail  taskAssignmentDetail taskParticipatedDetail-->
                  <div v-show="(matter.type===1&&matter.matter.taskStatus===1)||(matter.type===1&&matter.matter.taskStatus===2)" class="box">
                    <div class="message-item-header clearfix">
                      <div class="message-status">
                        <!-- 我负责详情 -->
                        <span class="label label-warning" style="background-color:#f6be1a" v-if="matter.matter.taskStatus===1">待接受</span>
                        <span class="label label-warning" style="background-color:#8c9eff" v-if="matter.matter.taskStatus===2">进行中</span>
                        <!-- 我分派的详情 -->
                        <span class="label label-warning" style="background-color:#f6be1a" v-if="matter.matter.taskStatus===3">待审核</span>
                        <span class="label label-warning" style="background-color:#ec412b" v-if="matter.matter.taskStatus===4">已完成</span>
                        <span class="label label-warning" style="background-color:#f6be1a" v-if="matter.matter.recordStatusNameShow===6">已拒绝</span>
                        <span class="label label-warning" style="background-color:#f6be1a" v-if="matter.matter.recordStatusNameShow===8">已撤销</span>
                        <!-- <span class="label label-warning"  style="background-color:#f6be1a" v-if="matter.matter.recordStatusNameShow===1">待整改</span> -->
                      </div>
                      <div class="message-tag">
                        <span class="label label-warning">任务</span>
                      </div>
                      <div class="message-title">
                        <label v-if="matter.matter.taskStatus===1">{{matter.matter.title}}</label>
                        <label v-if="matter.matter.taskStatus===2">{{matter.matter.title}}</label>
                      </div>
                    </div>
                    <div class="message-item-content">{{matter.matter.content}}</div>
                    <div class="message-item-footer">
                      <div class="message-text"><span>分派人：</span>{{matter.matter.assignEmployeeName}}</div>
                      <div class="message-text"><span>负责人：</span>{{matter.matter.chargeEmployeeName }}</div>
                      <!--<div class="message-label">参与人：</div><div class="message-text">{{matter.participants}}</div>-->
                      <div class="message-date">{{matter.matter.updateTime | YYYYMMDDHHMM }}</div>
                    </div>
                  </div>
                  <div v-show="matter.type===1&&matter.matter.taskStatus===3" class="box">
                    <div class="message-item-header clearfix">
                      <div class="message-status">
                        <!-- 我负责详情 -->
                        <span class="label label-warning" style="background-color:#f6be1a" v-if="matter.matter.taskStatus===1">待接受</span>
                        <span class="label label-warning" style="background-color:#8c9eff" v-if="matter.matter.taskStatus===2">进行中</span>
                        <!-- 我分派的详情 -->
                        <span class="label label-warning" style="background-color:#f6be1a" v-if="matter.matter.taskStatus===3">待审核</span>
                        <span class="label label-warning" style="background-color:#ec412b" v-if="matter.matter.taskStatus===4">已完成</span>
                        <span class="label label-warning" style="background-color:#f6be1a" v-if="matter.matter.recordStatusNameShow===6">已拒绝</span>
                        <span class="label label-warning" style="background-color:#f6be1a" v-if="matter.matter.recordStatusNameShow===8">已撤销</span>
                        <!-- <span class="label label-warning"  style="background-color:#f6be1a" v-if="matter.matter.recordStatusNameShow===1">待整改</span> -->
                      </div>
                      <div class="message-tag">
                        <span class="label label-warning">任务</span>
                      </div>
                      <div class="message-title">
                        <label>{{matter.matter.title}}</label>
                      </div>
                    </div>
                    <div class="message-item-content">{{matter.matter.content}}</div>
                    <div class="message-item-footer">
                      <div class="message-text"><span>分派人：</span>{{matter.matter.assignEmployeeName}}</div>
                      <div class="message-text"><span>负责人：</span>{{matter.matter.chargeEmployeeName }}</div>
                      <!--<div class="message-label">参与人：</div><div class="message-text">{{matter.participants}}</div>-->
                      <div class="message-date">{{matter.matter.updateTime | YYYYMMDDHHMM}}</div>
                    </div>
                  </div>
                  <!-- 质量 -->
                  <div v-show="matter.type===3" class="box">
                    <div class="message-item-header clearfix">
                      <div class="message-status">
                        <span class="label label-warning" style="background-color:#f6be1a" v-if="matter.matter.changeStatus===1">待整改</span>
                        <span class="label label-warning" style="background-color:#8c9eff" v-if="matter.matter.changeStatus===2">待复检</span>
                        <span class="label label-warning" style="background-color:#f6be1a" v-if="matter.matter.changeStatus===3">通过</span>
                        <span class="label label-warning" style="background-color:#ec412b" v-if="matter.matter.changeStatus===4">未通过</span>
                      </div>
                      <div class="title clearfix">
                        <div class="message-tag">
                          <span class="label label-warning">质量</span>
                        </div>
                        <div class="message-title">
                          <label>{{matter.matter.projectName}}</label>
                        </div>
                      </div>
                    </div>
                    <div class="message-item-content">整改要求：{{matter.matter.changedRequire }}</div>
                    <div class="message-item-footer">
                      <div class="message-text"><span>整改人：</span>{{matter.matter.changeEmployeeName}}</div>
                      <div class="message-text"><span>检查人：</span>{{matter.matter.reCheckerName }}</div>
                      <div class="message-date">{{matter.matter.updateTime | YYYYMMDDHHMM }}</div>
                    </div>
                  </div>
                  <!-- 安全 -->
                  <div v-show="matter.type===4" class="box" ui-sref="securityRectifyReformDetail({id:matter.matter.id})">
                    <div class="message-item-header clearfix">
                      <div class="message-status">
                        <span class="label label-warning" style="background-color:#f6be1a" v-if="matter.matter.changeStatus===1">待整改</span>
                        <span class="label label-warning" style="background-color:#8c9eff" v-if="matter.matter.changeStatus===2">待复检</span>
                        <span class="label label-warning" style="background-color:#f6be1a" v-if="matter.matter.changeStatus===3">通过</span>
                        <span class="label label-warning" style="background-color:#ec412b" v-if="matter.matter.changeStatus===3">未通过</span>
                      </div>
                      <div class="message-tag">
                        <span class="label label-warning">安全</span>
                      </div>
                      <div class="message-title">
                        <label>{{matter.matter.projectName}}</label>
                      </div>
                    </div>
                    <div class="message-item-content">整改要求：{{matter.matter.changedRequire }}</div>
                    <div class="message-item-footer">
                      <div class="message-text"><span>整改人：</span>{{matter.matter.changeEmployeeName}}</div>
                      <div class="message-text"><span>检查人：</span>{{matter.matter.reCheckerName }}</div>
                      <div class="message-date">{{matter.matter.updateTime | YYYYMMDDHHMM }}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="right" @click="rightApproveBtn()">
              <img src="../../../static/img/home/home-right.png" alt="">
            </div>
          </div>
          <!--暂无数据-->
          <div class="data-null text-center" v-show="backlogSearchResultData&&!backlogSearchResultData1.records.length">
            <img src="../../../static/img/data-null.png" alt="">
            <p>暂无数据</p>
          </div>
        </div>
      </div>

      <!-- 我的数据 -->
      <div class="bgcText">
        <div class="content">
          <img src="../../../static/img/home/line-left.png" alt="">
          <div class="text">我的数据</div>
          <img src="../../../static/img/home/line-right.png" alt="">
        </div>
      </div>

      <div class="myInformation clearfix">
        <div class="attendance">
          <div class="tittle clearfix">
            <h4 class="pull-left">考勤</h4>
            <div class="pull-right titleDate">
              <Col span="12">
              <DatePicker :value="attendanceTime" v-model="attendanceTime" format="yyyy年MM月" type="month" placeholder="Select month" style="width: 200px"></DatePicker>
              </Col>
            </div>
          </div>
          <div class="content" v-if="attendanceData">
            <div class="top">
              <p>出勤
                <span> {{attendanceData.attendanceCount || 0}}</span> 天</p>
            </div>
            <div class="bottom clearfix">
              <div class="list">
                <p class="p1">
                  <span>{{attendanceData.lateCount || 0}}</span> 次</p>
                <p class="p2">迟到</p>
              </div>
              <div class="line"></div>
              <div class="list">
                <p class="p1">
                  <span>{{attendanceData.leaveEarlyCount || 0}}</span> 次</p>
                <p class="p2">早退</p>
              </div>
              <div class="line"></div>
              <div class="list">
                <p class="p1">
                  <span>{{attendanceData.missintCardCount || 0}}</span> 次</p>
                <p class="p2">缺卡</p>
              </div>
            </div>
          </div>
        </div>
        <div class="report">
          <div class="tittle clearfix">
            <h4 class="pull-left">我的日报</h4>
            <div class="pull-right titleData">
              <span class="fatherSpan">
                <span class="span1" :class="{'span':!reportTitleIsShow}" @click="reportTitleBtn1()">本月汇总</span>
                <span :class="{'span':reportTitleIsShow}" @click="reportTitleBtn2()">年度汇总</span>
              </span>
            </div>
          </div>
          <!-- <div class="content">
                      <div class="top">
                        <p>已提交
                          <span>{{workReportSummaryData.submitQty||0}}</span> 篇</p>
                      </div>
                      <div class="bottom clearfix">
                        <div class="list">
                          <p class="p1">
                            <span>{{workReportSummaryData.browerQty||0}}</span> 次</p>
                          <p class="p2">浏览量</p>
                        </div>
                        <div class="line"></div>
                        <div class="list">
                          <p class="p1">
                            <span>{{workReportSummaryData.commentQty||0}}</span> 次</p>
                          <p class="p2">评论量</p>
                        </div>
                        <div class="line"></div>
                        <div class="list">
                          <p class="p1">
                            <span>{{workReportSummaryData.praiseQty||0}}</span> 次</p>
                          <p class="p2">点赞量</p>
                        </div>
                      </div>
                      </div> -->
        </div>
        <div class="assignment">
          <div class="tittle clearfix">
            <h4 class="pull-left">我的任务</h4>
            <div class="pull-right titleBar">
              <span v-for="item in assignmentTittleData " :class="{'titleBarSpan':item.type==index}" @click="assignmentTittleBtn(item)">{{item.name}}</span>
            </div>
          </div>
          <div class="content clearfix">
            <div class="list">
              <div class="complete" @click="completeBtn()">
                <p class="p1">{{totalCount.complateCount||0}}</p>
                <p class="p2">已完成</p>
              </div>
            </div>
            <div class="list">
              <div class="noComplete" @click="noCompleteBtn({type:1})">
                <p class="p1">{{totalCount.unComplateCount||0}}</p>
                <p class="p2">未完成</p>
              </div>
            </div>
            <div class="list">
              <div class="delay" @click="delayBtn({type:2})">
                <p class="p1">{{totalCount.delayCount||0}}</p>
                <p class="p2">已延期</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- 考勤统计 汇报统计 -->
      <div class="statistics clearfix">
        <div class="left">
          <div class="tittle">
            <h4>团队考勤</h4>
            <p class="ptime">{{checkData.date| YYYYMMDD }}</p>
            <p class="pday" @click="checkBtn()" v-if="ischeckDay">看今日</p>
            <p class="pday" @click="checkBtn()" v-if="!ischeckDay">看昨天</p>
          </div>
          <div class="content">
            <div id="myChartCheck" style="width: 550px;height: 420px;margin: 0 auto;"></div>
          </div>
        </div>
        <div class="right">
          <div class="tittle">
            <h4>汇报统计</h4>
            <p class="ptime">{{reportData.date}}</p>
            <p class="pday" @click="reportBtn()" v-if="isReportDay">看今日</p>
            <p class="pday" @click="reportBtn()" v-if="!isReportDay">看昨天</p>
          </div>
          <div id="myChartReport" style="width: 550px;height: 420px;margin: 0 auto;"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import dashboard from "./module";
import {
  getWeek,
  buildDownloadUrl,
  getFileType,
  hasPermission,
  getFileSize
} from "@/libs/tools";
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
// require('echarts/lib/chart/pie')
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "dashboard",
  components: {},
  data: function () {
    return {
      store: this.$store.state,
      homeMenuList: [],
      viewPermission: null,
      employeeName: null,
      systemGreetData: {},
      noticeData: [],
      report: null, //汇报
      backlogSearchResultData1: {
        userData: {},
        records: []
      }, //审批
      backlogSearchResultData: {
        userData: null,
        records: []
      }, //审批
      backlogSearchData: {
        page: 1,
        pageSize: 6,
        type: null // 类型 1任务2审批3质量4安全
      },
      backlogSearchData1: {
        page: 1,
        pageSize: 6,
        type: null // 类型 1任务2审批3质量4安全
      },
      maxTotal: null,
      attendanceTime: null,
      attendanceData: null,
      reportTitleIsShow: false,
      workReportSummaryData: null,
      assignmentTittleData: [
        { name: "我负责的", type: 1 },
        { name: "我分派的", type: 2 },
        { name: "我参与的", type: 3 }
      ],
      index: 1,
      totalCount: {
        // complateCount:null
      },
      ischeckDay: false,
      checkData: {},
      isReportDay: false,
      reportData: {},
      viewPermissionData: {},
      isDisplayData: {}
    };
  },
  methods: {
    /* 模块是否显示 权限*/
    listMenuData() {
      console.log(2);
      var that = this;
      dashboard.api.home.homeMenuList({}).then(request => {
        request.forEach(function (item) {
          switch (item.id) {
            //"物资统计"
            case 2:
              item.viewPermission = hasPermission([
                170,
                171,
                172,
                173,
                174,
                175,
                176,
                177,
                178,
                184,
                185,
                186,
                196,
                197,
                198,
                199
              ]); //查看权限
              break;
            //项目统计
            case 3:
              item.viewPermission = hasPermission([
                144,
                234,
                130,
                131,
                145,
                132,
                133,
                146
              ]); //查看权限
              break;
            case 4:
              item.viewPermission = hasPermission([119]);
              break;
          }
          that.$set(
            that.viewPermissionData,
            "viewPermission" + item.id,
            item.viewPermission
          );
          that.$set(that.isDisplayData, "isDisplay" + item.id, item.isDisplay);

          item.children.forEach(function (ritem) {
            // ritem.icon = '/client/framework/images/home/home-' + ritem.id + '.png';
            switch (ritem.id) {
              //"物资"
              case 5:
                ritem.viewPermission = hasPermission([
                  170,
                  171,
                  172,
                  173,
                  174,
                  175,
                  176,
                  177,
                  178,
                  184,
                  185,
                  186
                ]);
                break;
              //库存
              case 6:
                ritem.viewPermission = hasPermission([196, 197]);
                break;
              //采购
              case 7:
                ritem.viewPermission = hasPermission([198, 199]);
                break;
              //施工日志
              case 8:
                ritem.viewPermission = hasPermission([135, 144]);
                break;
              //质量
              case 9:
                ritem.viewPermission = hasPermission([130, 131, 145, 239, 240]);
                break;
              //安全
              case 10:
                ritem.viewPermission = hasPermission([132, 133, 146, 243, 244]);
                break;
              //考勤
              case 11:
                ritem.viewPermission = hasPermission([119]);
                break;
              //施工日志
              case 12:
                // ritem.viewPermission = $scope.checkviewPermission
                break;
            }
            that.$set(
              that.viewPermissionData,
              "viewPermission" + ritem.id,
              ritem.viewPermission
            );
            that.$set(
              that.isDisplayData,
              "isDisplay" + ritem.id,
              ritem.isDisplay
            );
          });
        });
        this.homeMenuList = request;
      });
    },
    // isDisplayBtn(params) {
    //   // console.log(this.$options.methods.listMenuData)
    //   if (this.homeMenuList) {
    //     this.homeMenuList.forEach(function (item) {
    //       if (item.id == params) {
    //         if (item.viewPermission) {
    //           console.log(item.isDisplay)
    //           return item.isDisplay
    //         } else {
    //           return false
    //         }
    //       }
    //       item.children.forEach(function (ChildItem) {
    //         if (ChildItem.id == params) {
    //           if (ChildItem.viewPermission) {
    //             return ChildItem.isDisplay
    //           } else {
    //             return false
    //           }
    //         }
    //       })
    //     })
    //   }
    // },
    /* 工作台欢迎词 */
    systemGreetFun(params) {
      let that = this;
      dashboard.api.home.systemGreet({}).then(result => {
        that.systemGreetData = result;
      });
    },
    /* 公告 */
    lastUnReadFun(params) {
      dashboard.api.home.lastUnRead({}).then(result => {
        this.noticeData = result;
      });
    },
    /* 我的日报 */
    reportFun() {
      dashboard.api.home.index({}).then(report => {
        this.report = !!report && report.id ? report : null;
      });
    },
    /* 审批 */
    backlogSearchBtn1() {
      dashboard.api.home
        .backlogSearch(this.backlogSearchData1)
        .then(request => {
          this.backlogSearchResultData1 = request;
        });
    },
    backlogSearchBtn(params) {
      this.backlogSearchData = Object.assign(this.backlogSearchData, params);
      dashboard.api.home.backlogSearch(this.backlogSearchData).then(request => {
        this.backlogSearchResultData = request;
        this.maxTotal = Math.ceil(
          request.total / this.backlogSearchData.pageSize
        );
      });
    },
    disabledBtn(params) {
      if (
        this.backlogSearchResultData1.userData.processTotal &&
        params.type == "2"
      ) {
        this.backlogSearchBtn(params);
      } else if (
        this.backlogSearchResultData1.userData.taskTotal &&
        params.type == "1"
      ) {
        this.backlogSearchBtn(params);
      } else if (
        this.backlogSearchResultData1.userData.qualityTotal &&
        params.type == "3"
      ) {
        this.backlogSearchBtn(params);
      } else if (
        this.backlogSearchResultData1.userData.safetyTotal &&
        params.type == "4"
      ) {
        this.backlogSearchBtn(params);
      }
    },
    /* 上一页 */
    leftApproveBtn(params) {
      this.backlogSearchData.page--;
      if (this.backlogSearchData.page === 0) {
        this.backlogSearchData.page = 1;
        this.$gcb.tooltip.open({
          message: "已是第一页",
          icon: "warning",
          timeout: 1000
        });
      } else {
        this.backlogSearchBtn(this.backlogSearchData);
      }
    },
    rightApproveBtn(params) {
      this.backlogSearchData.page++;
      if (this.backlogSearchData.page > this.maxTotal) {
        this.backlogSearchData.page = this.maxTotal;
        this.$gcb.tooltip.open({
          message: "已是最后一页",
          icon: "warning",
          timeout: 1000
        });
      } else {
        this.backlogSearchBtn(this.backlogSearchData);
      }
    },
    calendarTitleSearchBtn(params) {
      dashboard.api.home.calendarTitleSearch({ date: params }).then(request => {
        this.attendanceData = request;
      });
    },
    workReportSummaryBtn(params) {
      // dashboard.api.home.workReportSummary({ type: params }).then((request) => {
      //   this.workReportSummaryData = request;
      // })
    },
    reportTitleBtn1() {
      this.reportTitleIsShow = false;
      // this.workReportSummaryBtn(1)
    },
    reportTitleBtn2() {
      this.reportTitleIsShow = true;
      // this.workReportSummaryBtn(2)
    },
    taskTotalSearchBtn(params) {
      dashboard.api.home.taskTotalSearch({ type: params }).then(request => {
        this.totalCount = request;
      });
    },
    assignmentTittleBtn(params) {
      this.index = params.type;
      this.taskTotalSearchBtn(params.type || 1);
    },
    /* 团队考勤 */
    checkBtn() {
      this.ischeckDay = !this.ischeckDay;
      if (this.ischeckDay) {
        // 今天
        dashboard.api.home.statisWorkbench({ type: 1 }).then(request => {
          this.checkData = request;
          this.drawLineCheck(request);
        });
      } else {
        //昨天
        dashboard.api.home.statisWorkbench({ type: 2 }).then(request => {
          this.checkData = request;
          this.drawLineCheck(request);
        });
      }
    },
    drawLineCheck(request) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChartCheck"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b}"
        },
        color: [
          "#248BFE",
          "#4ED1E1",
          "#5FBE67",
          "#F3CD49",
          "#DF5667",
          "#7D4BD8"
        ],
        calculable: true,
        series: [
          {
            name: "",
            type: "pie",
            radius: ["40%", "60%"],
            itemStyle: {
              normal: {
                /* 显示文字 */
                label: {
                  show: true,
                  textStyle: {
                    fontWeight: 200,
                    fontSize: 14 //文字的字体大小
                  }
                },
                /* 显示线 */
                labelLine: {
                  show: true
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: "center",
                  /* 鼠标触摸的文字大小 */
                  textStyle: {
                    fontSize: "16",
                    fontWeight: "bold"
                  }
                }
              }
            },
            /* 数据 */
            data: [
              {
                value: request.normal,
                name: "正常出勤：" + request.normal + "人"
              },
              {
                value: request.absenceCount,
                name: "缺卡：" + request.absenceCount + "人"
              },
              {
                value: request.lateCount,
                name: "迟到：" + request.lateCount + "人"
              },
              {
                value: request.leaveCount,
                name: "请假：" + request.leaveCount + "人"
              },
              {
                value: request.positionExceptionCount,
                name: "签到点异常：" + request.positionExceptionCount + "人"
              },
              {
                value: request.leaveEarlyCount,
                name: "早退：" + request.leaveEarlyCount + "人"
              }
            ]
          }
        ]
      });
    },
    reportBtn() {
      this.isReportDay = !this.isReportDay;
      if (this.isReportDay) {
        // 今天
        dashboard.api.home.submmitStatiscs({ type: 1 }).then(request => {
          this.reportData = request;
          this.drawLineReport(request);
        });
      } else {
        //昨天
        dashboard.api.home.submmitStatiscs({ type: 2 }).then(request => {
          this.reportData = request;
          this.drawLineReport(request);
        });
      }
    },
    drawLineReport(request) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChartReport"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b}"
        },
        color: ["#248BFE", "#4ED1E1"],
        calculable: true,
        series: [
          {
            name: "",
            type: "pie",
            radius: ["40%", "60%"],
            itemStyle: {
              normal: {
                /* 显示文字 */
                label: {
                  show: true,
                  textStyle: {
                    fontWeight: 200,
                    fontSize: 14 //文字的字体大小
                  }
                },
                /* 显示线 */
                labelLine: {
                  show: true
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: "center",
                  /* 鼠标触摸的文字大小 */
                  textStyle: {
                    fontSize: "16",
                    fontWeight: "bold"
                  }
                }
              }
            },
            /* 数据 */
            data: [
              {
                value: request.submmitQty,
                name: "已提交：" + request.submmitQty + "人"
                //  selected: true
              },
              {
                value: request.unSubmmitQty,
                name: "未提交：" + request.unSubmmitQty + "人"
                //  selected: true
              }
            ]
          }
        ]
      });
    },
    followProjectListBtn() {
      dashboard.api.home.homeProjectList({}).then(request => { });
    }
  },
  watch: {
    attendanceTime(newVal, oldVal) {
      this.calendarTitleSearchBtn(newVal);
    }
  },
  mounted() {
    let that = this;
    that.attendanceTime = new Date();
    /* 工作台欢迎词 */
    that.employeeName = that.store.user.employee.employeeName;
    that.listMenuData();
    that.systemGreetFun();
    that.lastUnReadFun();
    that.reportFun();
    that.backlogSearchBtn1();
    that.backlogSearchBtn();
    that.calendarTitleSearchBtn();
    // that.workReportSummaryBtn(1)
    that.taskTotalSearchBtn(1);
    that.checkBtn(); //团队考勤
    that.reportBtn(); //汇报统计
    that.followProjectListBtn(); //关注项目

    // this.$set(this.viewPermissionData,'viewPermissionData1' ,true)
    //       console.log(this.viewPermissionData)
    // this.$gcb.gcbModal.open({
    //   title: "提示",
    //   content: "确定删除吗？",
    //   subMessage: "删除后不可恢复",
    //   icon: "danger",
    // }).then(() => {
    //   knowledge.api.deleteKnowledge({ id: this.queryId }).then((result) => {
    //     this.$router.push({ name: "knowledgeList" })
    //   });
    // })
    // self.$gcb.tooltip.open({ message: "请输入标题", icon: "warning", timeout: 1000 })
  }
};
</script>
<style lang="less" scoped slot-scope="true">
#homeWork {
  p {
    margin: 0;
  }
  height: 100%;
  width: 100%;
  background-color: #f0f2f5;
  padding: 15px;
  .bgcText {
    height: 56px;
    position: relative;
    .content {
      position: absolute;
      height: 56px;
      width: 240px;
      display: flex;
      left: 50%;
      transform: translate(-50%);
      img {
        width: 70px;
        height: 2px;
        position: relative;
        top: 60%;
      }
      .text {
        padding-top: 25px; // line-height: 56px;
        color: #939ba4;
        margin: 0 20px;
      }
    }
  }
  /* 公告 */
  .prompt {
    text-align: center;
    margin-top: 50px;
  }
  .header {
    border-radius: 2px;
    height: 96px;
    background-color: #fff;
    .left {
      float: left;
      .img {
        margin: 20px;
        float: left;
        img {
          width: 100%;
          height: 100%;
          border-radius: 28px;
        }
      }
      .leftContent {
        float: left;
        h3 {
          font-size: 20px;
          margin-top: 20px;
          margin-bottom: 10px;
          font-weight: 500;
        }
        p {
          color: #939ba4;
          font-size: 16px;
        }
      }
    }
    .right {
      float: right;
      margin-right: 20px;
      .rightContent {
        h3 {
          font-size: 20px;
          margin-top: 20px;
          margin-bottom: 10px;
          font-weight: 500;
        }
        p {
          color: #939ba4;
          float: right;
          font-size: 16px;
        }
      }
    }
  }
  .content {
    margin-bottom: 20px;
    .common {
      margin-top: 20px;
      // min-width: 1180px;
      .notice {
        border-radius: 2px;
        float: left;
        width: 50%;
        height: 200px;
        background-color: #fff;
        overflow: hidden;
        .tittle {
          height: 40px;
          border-bottom: 1px solid #edf0f5;
          overflow: hidden;
          h4 {
            line-height: 40px;
            margin: 0 0 0 20px;
            font-size: 16px;
          }
          p {
            line-height: 40px;
            margin: 0 20px;
            font-size: 14px;
            color: #939ba4;
            cursor: pointer;
          }
        }
        .list {
          li {
            color: #333333;
            margin: 0 20px 0 25px;
            height: 40px;
            line-height: 40px;
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            cursor: pointer;
            .span1 {
              width: 120px;
            }
            .span2 {
              margin-right: 30px;
              -webkit-box-flex: 1;
              -moz-box-flex: 1;
              -webkit-flex: 1;
              -ms-flex: 1;
              flex: 1;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            .span3 {
              width: 210px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
          .fontColor {
            color: #939ba4;
          }
        }
      }
      .attendance {
        border-radius: 2px;
        margin-left: 1%;
        float: left;
        width: 28%;
        height: 200px;
        background-color: #fff;
        position: relative;
        .btn-sm {
          padding: 7px 32px;
        }
        .tittle {
          height: 40px;
          border-bottom: 1px solid #edf0f5;
          overflow: hidden;
          h4 {
            line-height: 40px;
            margin: 0 0 0 20px;
            font-size: 16px;
          }
        }
        .data-body {
          height: 160px;
          overflow: auto;
          padding: 20px 25px 20px 25px;
          .attendance-item {
            // overflow: auto;
            // >div{
            //   overflow:scroll;
            // }
          }
          .attendance-pre {
            color: #939ba4;
            font-size: 14px;
          }
          .attendance-next {
            color: #939ba4;
          }
          .attendance-record-address {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 14px;
            color: #939ba4;
          }
          .attendance-record-time {
            font-size: 24px;
            color: #333;
          }
        }
        .empty-body {
          position: absolute;
          top: 60px;
          left: 30px;
        }
      }
      .report {
        border-radius: 2px;
        float: left;
        margin-left: 1%;
        width: 20%;
        height: 200px;
        background-color: #fff;
        .tittle {
          height: 40px;
          border-bottom: 1px solid #edf0f5;
          overflow: hidden;
          h4 {
            line-height: 40px;
            margin: 0 0 0 20px;
            font-size: 16px;
          }
        }
        .btn-block {
          border-radius: 0;
        }
      }
      .contentReport {
        .panel-body {
          height: 160px;
          padding: 0;
          text-align: center;
          .data-body {
            > div {
              height: 128px;
              line-height: 128px;
            }
            .ivu-btn {
              width: 100%;
              border-radius: 0;
            }
          }
        }
      }
    }
    /* 审批 */
    .approveAll {
      border-radius: 2px;
      margin-top: 20px;
      height: 370px;
      background-color: #fff;
      .tagList {
        border-bottom: 1px solid #edf0f5;
        padding-left: 20px; // height: 40px;
        // line-height: 40px;
        li {
          display: inline-block;
          margin-bottom: 0;
          font-weight: normal;
          text-align: center;
          vertical-align: middle;
          -ms-touch-action: manipulation;
          touch-action: manipulation;
          cursor: pointer;
          background-image: none;
          white-space: nowrap;
          height: 50px;
          line-height: 50px;
          padding: 0px 5px;
          font-size: 16px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        > li:hover {
          background-color: transparent;
          color: #939ba4;
        }
        .primary {
          border: none;
          background-color: #fff;
          color: #248bfe;
          border-bottom: 2px solid #248bfe;
        }
      }
      .contentList {
        height: 320px;
        .content {
          display: flex;
          height: 100%;
          .left {
            width: 100px;
            position: relative;
            cursor: pointer;
            img {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          }
          .middle {
            flex: 1;
            min-width: 920px;
            .list {
              display: flex;
              margin-top: 20px; // overflow-x: auto;
              li {
                flex: 1;
                display: inline-block;
                max-width: 226px;
                min-width: 134px;
                height: 270px;
                margin: 0px 10px;
                -webkit-box-shadow: 0px 6px 14px 0px rgba(189, 199, 210, 0.4);
                box-shadow: 0px 6px 14px 0px rgba(189, 199, 210, 0.4);
                -moz-box-shadow: 0px 6px 14px 0px rgba(189, 199, 210, 0.4);
                border-radius: 4px;
                padding: 0 20px;
                cursor: pointer;
                .message-item-header {
                  .message-status {
                    text-align: right;
                    margin-top: -1px;
                    margin-right: -20px;
                    .label {
                      border-radius: 0 15px 15px 12px;
                      font-size: 12px;
                      padding: 2px 12px;
                      color: #fff;
                    }
                  }
                  .message-tag {
                    float: left;
                  }
                  .message-title {
                    > label {
                      padding-left: 10px;
                      width: 72%;
                      float: left;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }
                  }
                }
                .message-item-content {
                  margin-top: 10px;
                  margin-bottom: 10px;
                  height: 97px;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 5;
                  overflow: hidden;
                  color: #939ba4;
                }
                .message-item-footer {
                  position: relative;
                  height: 100px;
                  .message-text {
                    min-width: 100px;
                    font-size: 12px;
                    line-height: 18px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    span {
                      color: #939ba4;
                    }
                  }
                  .message-date {
                    position: absolute;
                    right: 0;
                    bottom: 10px;
                    font-size: 12px;
                    color: #939ba4;
                  }
                }
                /* 审批 */
                .approve-box {
                  .message-status {
                    span {
                      background: #4dd0e1;
                    }
                  }
                }
              }
            }
          }
          .right {
            width: 100px;
            position: relative;
            cursor: pointer;
            img {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }
          }
        }
      }
    }
    /* 我的数据 */
    .myInformation {
      // height: 230px;
      .attendance {
        float: left;
        width: 32.6%;
        height: 100%;
        background-color: #fff;
        .tittle {
          height: 50px;
          border-bottom: 1px solid #edf0f5;
          h4 {
            line-height: 50px;
            margin: 0 0 0 20px;
            font-size: 16px;
            width: 100px;
          }
          .titleDate {
            margin: 8px 20px 0 0; // width: 140px;
            .input-group {
              width: 100px;
            }
            .form-control {
              padding: 6px 10px;
            }
          }
        }
        .content {
          .top {
            margin-top: 25px;
            text-align: center;
            p {
              font-size: 14px;
              color: #333;
              span {
                font-size: 28px;
                color: #8c9eff;
              }
            }
          }
          .bottom {
            margin: 28px 30px;
            .list {
              width: 33%;
              float: left;
              text-align: center;
              .p1 {
                font-size: 12px;
                color: #bdc7d2;
                span {
                  font-size: 24px;
                  color: #ff8a65;
                }
              }
              .p2 {
                color: #939ba4;
                font-size: 14px;
              }
            }
            .line {
              float: left;
              width: 1px;
              height: 30px;
              margin-top: 10px;
              background-color: #e2e4e9;
            }
          }
        }
      }
      .report {
        float: left;
        width: 32.7%;
        height: 100%;
        background-color: #fff;
        margin-left: 1%;
        .tittle {
          height: 50px;
          border-bottom: 1px solid #edf0f5;
          h4 {
            line-height: 50px;
            margin: 0 0 0 20px;
            font-size: 16px;
            width: 100px;
          }
          .titleData {
            line-height: 50px;
            color: #248bfe;
            margin-right: 30px;
            .fatherSpan {
              border: 1px solid #248bfe;
              display: inline-block;
              height: 28px;
              line-height: 26px;
              border-radius: 14px;
              span {
                display: inline-block;
                padding: 0px 20px;
                font-size: 12px;
                cursor: pointer;
              }
              .span1 {
                margin-right: -20px;
              }
              .span {
                background: linear-gradient(to right, #4895f6 0%, #4e5ef6 100%);
                z-index: 100;
                color: #fff;
                border-radius: 15px;
              }
            }
          }
        }
        .content {
          .top {
            margin-top: 25px;
            text-align: center;
            p {
              font-size: 14px;
              color: #333;
              span {
                font-size: 28px;
                color: #8c9eff;
              }
            }
          }
          .bottom {
            margin: 28px 30px;
            .list {
              width: 33%;
              float: left;
              text-align: center;
              .p1 {
                font-size: 12px;
                color: #bdc7d2;
                span {
                  font-size: 24px;
                  color: #4ed1e1;
                }
              }
              .p2 {
                color: #939ba4;
                font-size: 14px;
              }
            }
            .line {
              float: left;
              width: 1px;
              height: 30px;
              margin-top: 10px;
              background-color: #e2e4e9;
            }
          }
        }
      }
      .assignment {
        float: left;
        width: 32.7%;
        height: 100%;
        background-color: #fff;
        margin-left: 1%;
        .tittle {
          height: 50px;
          border-bottom: 1px solid #edf0f5;
          h4 {
            line-height: 50px;
            margin: 0 0 0 20px;
            font-size: 16px;
            width: 100px;
          }
          .titleBar {
            margin-right: 25px;
            line-height: 50px;
            span {
              margin: 5px;
              color: #bdc7d2;
              cursor: pointer;
              padding: 15px 0;
            }
            span:hover {
              color: #248bfe;
              border-bottom: 2px solid #248bfe;
            }
            .titleBarSpan {
              color: #248bfe;
              border-bottom: 2px solid #248bfe;
            }
          }
        }
        .content {
          margin: 56px 30px 44px;
          .list {
            width: 33.3%;
            float: left;
            text-align: center;
            color: #fff;
            .complete {
              width: 80px;
              height: 80px;
              background: linear-gradient(
                45deg,
                rgba(77, 208, 225, 1),
                rgba(16, 234, 180, 1)
              );
              border-radius: 40px;
              margin: 0 auto;
              cursor: pointer;
            }
            .noComplete {
              width: 80px;
              height: 80px;
              background: linear-gradient(
                45deg,
                rgba(246, 181, 26, 1),
                rgba(255, 233, 44, 1)
              );
              border-radius: 40px;
              margin: 0 auto;
              cursor: pointer;
            }
            .delay {
              width: 80px;
              height: 80px;
              background: linear-gradient(
                45deg,
                rgba(255, 126, 99, 1),
                rgba(255, 77, 85, 1)
              );
              border-radius: 40px;
              margin: 0 auto;
              cursor: pointer;
            }
            .p1 {
              margin: 0;
              padding-top: 13px;
              font-size: 24px;
            }
            .p2 {
              margin: 0;
              font-size: 12px;
            }
          }
        }
      }
    }
    .statistics {
      // height: 460px;
      margin-top: 20px;
      .left {
        width: 49.5%;
        float: left;
        height: 470px;
        background-color: #fff;
        margin-right: 1%;
        .tittle {
          height: 50px;
          border-bottom: 1px solid #edf0f5;
          overflow: hidden;
          display: flex;
          h4 {
            line-height: 50px;
            margin: 0 0 0 20px;
            font-size: 16px;
            width: 100px;
          }
          .ptime {
            flex: 1;
            text-align: center;
            line-height: 50px;
            color: #939ba4;
            font-size: 16px;
          }
          .pday {
            width: 70px;
            line-height: 50px;
            color: #248bfe;
            font-size: 16px;
            cursor: pointer;
          }
        }
        .content {
          height: 420px;
        }
      }
      .right {
        width: 49.5%;
        float: left;
        height: 470px;
        background-color: #fff;
        .tittle {
          height: 50px;
          border-bottom: 1px solid #edf0f5;
          overflow: hidden;
          display: flex;
          h4 {
            line-height: 50px;
            margin: 0 0 0 20px;
            font-size: 16px;
            width: 100px;
          }
          .ptime {
            flex: 1;
            text-align: center;
            color: #939ba4;
            line-height: 50px;
            font-size: 16px;
          }
          .pday {
            width: 70px;
            line-height: 50px;
            color: #248bfe;
            font-size: 16px;
            cursor: pointer;
          }
        }
        .content {
          height: 420px;
        }
      }
    }
  }
}
</style>