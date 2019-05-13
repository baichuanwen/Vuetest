<template>
    <div class="animated fadeIn">
      <div class="header clearfix">
        <div class="header-item">
          <span class="col-grey font-14">汇报类型</span>
          <Select  @on-change="typeToggle" placeholder="全部" v-model= "typeText" style="width:150px">
            <Option v-for="(type,index) in types" :value="type.name" :key="index" > {{type.name}}</Option>
          </Select>
        </div>
        <div class="header-item">
          <span class="col-grey font-14">员工范围</span>
          <Select @on-change="rangeToggle" placeholder="直属下级/关注" v-model= "rangeText"  style="width:150px">
            <Option  v-for="(range,index) in ranges" :value="range.name" :key="index" > {{range.name}}</Option>
          </Select>
        </div>
        <div class="header-item">
          <span class="col-grey font-14">阅读情况</span>
          <Select   placeholder="未读" v-model= "statuText"  @on-change="statuToggle"  style="width:150px">
            <Option  v-for="(statu,index) in status" :value="statu.name" :key="index" > {{statu.name}}</Option>
          </Select>
        </div>
        <div class="header-item">
          <span class="col-grey font-14">选择项目</span>
          <Input type="text" style="width: 180px"  @on-focus="projectSelect()"  v-model="projectText"  placeholder="请选择项目"/>
        </div>
        <div class="header-item">
          <span class="col-grey font-14">开始时间</span>
          <DatePicker type="date"  v-model="pagesInfo.startDate" style="width: 180px"></DatePicker>
        </div>
        <div class="header-item">
          <span class="col-grey font-14">结束时间</span>
          <DatePicker type="date"   v-model="pagesInfo.endDate" style="width: 180px"></DatePicker>
        </div>
        <div class="header-item" style="float: right;">
          <Button type="primary" size="large" @click="reviewSearch({page:1})" >查找</Button>
          <Button size="large" @click="removeAll()">清空</Button>
        </div>
      </div>
      <div class="select-employee-outer">
        <div class="select-employee clearfix">
          <Button type="primary" size="large" @click="selectEmployee()">选择员工</Button>
          <div class="selected-employee clearfix" :class="{'selected-employee-show':showBox}" v-show="employee.length">
            <div class="quantity">已选人员共{{employee.length}}名：</div>
            <div class="employee">
              <span v-for="(item,index) in employee" :key="index">
                {{item.employeeName}}
                <label class="fa fa-close close-red" @click="deleteEmployee(index)"></label>
              </span>
            </div>
            <div class="empty-packup">
              <span @click="clean()">清空</span>
              <span class="text-primary" v-show="showBox" @click="showBox = false">收起</span>
              <span class="text-primary" v-show="!showBox" @click="showBox = true">展开</span>
            </div>
          </div>
        </div>
      </div>
      <br>
      <Row >
        <Col span="24"><span class="col-grey">选择：</span>
        <Select @on-change="exportRangeToggle"  placeholder="导出当前" v-model="exportRangeText" style="width:150px; margin-right:10px">
          <Option  v-for="(item,index) in exportRange" :value="item.name" :key="index">{{item.name}}</Option>
        </Select>
        <Select  v-model="exportFromText" placeholder="Word" @on-change="exportFromToggle" style="width:150px;margin-right:10px">
          <Option  v-for="(item,index) in exportFrom" :value="item.name" :key="index">{{item.name}}</Option>
        </Select>
        <Button type="primary" class="btn-width-90" size="large" @click="exports()" >导出</Button>
        </Col>
      </Row>
      <br>
      <reportList :isReportList=false :items="items" @showDetail2="saveListParams"></reportList>
      <br>
      <Page class="gcb-page" v-show="items.length"  :total="total" :current="pagesInfo.page" @on-change="changePage" show-total show-elevator ></Page>
      <div class="data-null text-center" v-show="!items.length">
        <!--<img src="/client/framework/images/data-null.png" alt="">-->
        <p>暂无数据</p>
      </div>
    </div>
</template>
<script>
  import report from '../module';
  import  reportList from "../components/reportItemsList.vue"
  export default {
    name: 'report-review',
    data() {
      return {
        items:[],
        pagesInfo:{
          page:1,
          pageSize:10,
          workReportType:null,
          employeeScope:1,
          readingSituation:0,
          projectId:null,
          isWeb:true,
          startDate:null,
          endDate:null,
          employeeIds:[]
        },
        types : [{ type: null, name: "全部" }, { type: 1, name: "日报" }, { type: 2, name: "周报" }, { type: 3, name: "月报" }],
        typeText : "",
        rangeText : "",
        ranges :[{ type: 1, name: "直属下级/关注" }, { type: null, name: "全部" }],
        statuText : "",
        status :[{ type: 0, name: "未读" }, { type: 1, name: "已读" }, { type: null, name: "全部" }],
        projectText:"",
        total:0,
      //  选择员工
        employee:[],
        showBox:false,
        //daochu
        range : 1,
        exportRangeText:'',
        exportRange:[{ type: 1, name: "导出当前" }, { type: 2, name: "导出全部" }],
        from:1,
        exportFromText:"",
        exportFrom : [{ type: 1, name: "Word" }, { type: 2, name: "PDF" }],
      }
    },
    components:{reportList},
    methods: {
      typeToggle(name) {
        let item=this.types.find(item=>item.name==name);
        this.pagesInfo.workReportType = item.type;
        this.typeText = item.name
      },
      // 员工范围切换
      rangeToggle(name) {
        let item=this.ranges.find(item=>item.name==name);
        this.pagesInfo.employeeScope = item.type;
        this.rangeText = item.name
      },
      // 阅读情况切换
      statuToggle(name) {
        let item=this.status.find(item=>item.name==name);
         this. pagesInfo.readingSituation = item.type;
         this.statuText = item.name
      },
      // 清空筛选
      removeAll () {
        this.typeToggle(null);
        this.rangeToggle(1);
        this.statuToggle(0);
        this.startDate = null;
        this.endDate = null;
        this.pagesInfo.projectId = null;
        this.projectText = "";
        this.reviewSearch({ page: 1 });
      },
      // 导出
      exportRangeToggle(name) {
        let item=this.exportRange.find(item=>item.name==name);
        this.exportRangeText = item.name;
        this.range = item.type;
      },
      exportFromToggle(name) {
        let item=this.exportFrom.find(item=>item.name==name);
        this.exportFromText = item.name;
        this.from = item.type;
      },
      // 跳转详情
      saveListParams(userId) {
        report.api.report.reviewIds(this.pagesInfo).then((result)=>{
          this.listIds = result;
          this.$router.push({name:"reportDetailReview",params :{id: userId,listIds:result}})
        })
      },
      exports() {
        let $scope=this;
        if (this.range == 1) {
          let pageParams=Object.assign($scope.pagesInfo,{page: 1, pageSize: 10});
          if (this.from == 1) {
            report.api.report.exportReviewWord(pageParams);
          } else {
            report.api.report.exportReviewPdf(pageParams);
          }
        }
        if (this.range == 2) {
          let pageParams=Object.assign($scope.pagesInfo,{page: null, pageSize: null});
          if (this.from == 1) {
            report.api.report.exportReviewWord(pageParams);
          } else {
            report.api.report.exportReviewPdf(pageParams);
          }
        }
      },
      listSearch(SearchRequest){
        this.reviewSearch(SearchRequest)
      },
      // 拉数据
      reviewSearch(SearchRequest) {
        let $scope=this;
        if (SearchRequest) {
          for (var k in SearchRequest) {
            $scope.pagesInfo[k] = SearchRequest[k];
          }
        };
        if (!$scope.pagesInfo.startDate) {
          $scope.pagesInfo.startDate = null;
        }
        if (!$scope.pagesInfo.endDate) {
          $scope.pagesInfo.endDate = null;
        }
        report.api.report.reviewSearch($scope.pagesInfo).then((pagerResult)=> {
          $scope.items = pagerResult.records;
          $scope.total = pagerResult.total;
          // 当前页所有ID
          $scope.listIds = [];
          pagerResult.records.forEach(function(v, i) {
            $scope.listIds.push(v.id);
          });
          // 存参数
          sessionStorage.setItem("request", JSON.parse(JSON.stringify($scope.pagesInfo)));
          sessionStorage.setItem("param", { employees: $scope.employees, projectText: $scope.projectText, project: $scope.project, statuText: $scope.statuText, rangeText: $scope.rangeText, typeText: $scope.typeText, total: pagerResult.total });
        });
      },

      //分页
      changePage(page) {
        this.pagesInfo.page = page
        this.listSearch(this.pagesInfo)
      },
      // 选择人员
      async selectEmployee() {
        this.employee = await this.$gcb.gcbEmployee.open({
          multiple: true,
          isAuthData: true,
          isIncludeSelf: false,
          isIncludeDescendants: true,
          selectItem: this.employee
        });
        if(this.employee.length>=0){
          this.subRange=[];
          this.showRange=[];
          this.employee.map((item,index)=>{
            this.showRange.push(item.employeeName)
            this.subRange.push(item.id)
          })
          this.showRange= this.showRange.join(",");
        }
      },
      deleteEmployee(index) {
        let $scope =this;
        $scope.employee.splice(index, 1);
        if ($scope.employee.length) {
            $scope.pagesInfo.employeeIds = [];
            $scope.employee.forEach(function(v) {
              // v.$select = false;    清除单项筛选数据
              $scope.pagesInfo.employeeIds.push(v.id);
            });
          $scope.reviewSearch({ page: 1 });
        } else {
          $scope.reviewSearch({ page: 1, employeeIds: [] });
        }
      },
      clean() {
        this.employee = [];
        this.reviewSearch({ page: 1, employeeIds: [] });
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
        self.pagesInfo.projectId=this.project.id;
      },
    },
    mounted(){
      this.reviewSearch();
    },
  }
</script>

<style lang="less" scoped>
  .col-grey{
    color: #939BA4;
  }
  .wd100{
    width: 120px;
  }
  .btn-width-90 {
    width: 90px;
    padding-left: 0;
    padding-right: 0;
  }
  /*头部*/
  .header{
    margin-top: 15px;
    padding: 15px;
    background-color: white;

    .header-item{
      display: inline-block;
      margin: 10px 15px;
    }
    .header-item input{
      display: inline-block;
      width: 160px;
    }

    .header-item > span{
      margin-right: 5px;
    }

    .header-item .data{
      width: 160px;
      display: inline-block;
      margin: 0;
      vertical-align: middle;
    }
  }

  /*选择员工*/
  .select-employee-outer{
    padding: 15px;
    margin-top: 15px;
    background-color: white;
  }

  .select-employee{
    /* padding: 0px 20px 10px 20px;*/
    /*margin: 10px 0px;*/
  }

  .select-employee .btn-select{
    line-height: 80px;
    margin-bottom: 1px;
  }

  .select-employee .btn-select input{
    margin: 0px 15px;
  }

  .selected-employee{
    padding: 0 20px;
    margin-top: 20px;
    height: 40px;
    overflow: hidden;
  }

  .selected-employee--show{
    height: auto;
    overflow: visible;
  }

  .selected-employee .quantity{
    float: left;
    width: 134px;
    line-height: 40px;
    padding-left: 8px;
  }

  .selected-employee .employee{
    float: left;
    width:70%;
  }

  .selected-employee .empty-packup{
    line-height: 40px;
    float: right;
  }

  .selected-employee .employee span{
    display: inline-block;
    white-space:nowrap;
    padding: 3px 8px;
    margin: 5px;
    border: 1px solid #E9e9e9;
    background-color: #f6f6f7;
  }

  .selected-employee span label{
    padding-left: 11px;
  }

  .close-red{
    color: red;
  }

  .empty-packup span{
    display: inline-block;
    margin: 0px 10px;
  }

  .empty-packup span:first-child{
    color: #939BA4;
  }

  /*导出*/
  .export{
    margin: 10px 0;
    /*padding: 0 30px;*/
  }

  .export .header-item{
    margin: 10px 5px;
  }
  .user{
    height: 50px;
    padding-left: 65px;
  }

  .user div{
    line-height:25px;
    margin: 2px 0;
    font-size: 20px;
  }

  .user div:first-child{
    color: #1b56a5;
  }

  .items{
    padding: 30px;
    background-color: white;
    border-bottom: 1px solid #f5f5f5;
  }

  .items:hover{
    cursor:pointer ;
    background-color: #f5f5f5;
  }

  /*.items:hover .items-title{
      color: #0093dd;
  }*/

  .main .report-content{
    padding-left:65px;
  }

  .items-title{
    font-size: 16px;
    margin: 5px 0;
  }

  .items-content{
    line-height: 21px;
    max-height: 63px;
    overflow: hidden;
  }

  .items-bottom span{
    width: 100px;
    /*line-height:95px;*/
  }

  .items-bottom-left{
    float: left;
    width: 200px;
    margin-top: 30px;
    border-right: 1px solid #f1f1f1;
  }

  .items-bottom-left input:first-child{
    margin-right: 16px;
  }

  .items-bottom label{
    padding:0px 16px 0px 30px;
  }

  .items-bottom label:first-of-type{
    padding: 0 16px 0 50px;
  }

  .items-bottom-right{
    float: right;
  }

  .items-bottom-right span{
    padding-right: 20px;
  }

  .items-bottom-right span:last-child{
    padding-right: 20px;
  }
</style>








