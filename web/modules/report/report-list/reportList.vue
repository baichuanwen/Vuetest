<template>
  <div class="animated fadeIn reportList">
       <Row class="right-search" :gutter="32">
        <div class="header clearfix">
            <div class="header-item">
                <span class="col-grey font-14">汇报类型</span>
                 <Select placeholder="全部"  @on-change="typeToggle" v-model= "typeText" style="width:150px">
                    <Option :value="type.name" v-for="(type,index) in types" :key="index" > {{type.name}}</Option>
                </Select>
            </div>
          <div class="header-item">
                <span class="col-grey font-14">选择项目</span>
                <Input type="text" style="width: 180px"  @on-focus="projectSelect()"  v-model="projectText"  placeholder="请选择项目"/>
          </div>
          <div class="header-item">
                <span class="col-grey font-14">开始时间</span>
                <DatePicker type="date"   v-model="pagesInfo.startDate" style="width: 180px"></DatePicker>
          </div>
            <div class="header-item">
                <span class="col-grey font-14">结束时间</span>
                <DatePicker type="date"   v-model="pagesInfo.endDate" style="width: 180px"></DatePicker>
            </div>
              <div class="header-item" style="float: right;">
                <Button type="primary" size="large" @click="listSearch()" >查找</Button>
                <Button size="large" @click="clean()">清空</Button>
              </div>
        </div>
     </Row>
     <br>
     <Row >
         <Col span="24"><span class="col-grey">选择：</span>
            <Select  placeholder="导出当前" @on-change="exportRangeToggle" v-model="exportRangeText" style="width:150px; margin-right:10px">
              <Option :value="item.name" v-for="(item,index) in exportRange" :key="index"  >{{item.name}}</Option>
           </Select>
            <Select  placeholder="Word" @on-change="exportFromToggle"  v-model="exportFromText" style="width:150px;margin-right:10px">
              <Option :value="item.name" v-for="(item,index) in exportFrom" :key="index" >{{item.name}}</Option>
           </Select>
            <Button type="primary" size="large" @click="exports()" >导出</Button>
         </Col>
    </Row>
    <br>
    <reportList :isReportList=true :items="items" @showDetail2="saveListParams"></reportList>
    <br>
    <Page class="gcb-page" v-show="items.length"  :total="total"  :current="pagesInfo.page" @on-change="changePage" show-total show-elevator ></Page>
    <div class="data-null text-center" v-show="!items.length">
      <!--<img src="/client/framework/images/data-null.png" alt="">-->
      <p>暂无数据</p>
    </div>
  </div>
</template>
 <script>
 import report from '../module';
 import{getDate,buildDownloadUrl} from '@/libs/tools'
 import  reportList from "../components/reportItemsList.vue"
 export default {
     data () {
        return {
            // 汇报类型切换
            types : [
                { type: null, name: "全部" },
                { type: 1, name: "日报" },
                { type: 2, name: "周报" },
                { type: 3, name: "月报" }
            ],
            typeText:"",
            pagesInfo:{
                workReportType:null,
                page:1,
                pageSize:10,
                startDate:null,
                projectId:null,
                endDate:null,
                isWeb:true
            },
              total:0,
              project:[],
              projectText:"",
             listIds:[],
          // 导出参数
            range : 1,
            exportRangeText : "",
            exportRange : [{ type: 1, name: "导出当前" }, { type: 2, name: "导出全部" }],
            from : 2,
            exportFromText : "",
            exportFrom :[{ type: 1, name: "Word" }, { type: 2, name: "PDF" }],
            // 列表查询
            items:[],
        }
     },
      components:{reportList},
      mounted () {
        this.getStorage()
      },
     methods: {
       // 类型选择
       typeToggle(name) {
         let item=this.types.find(item=>item.name==name);
         this.pagesInfo.workReportType = item.type;
         this.typeText = item.name
       },
       //存储
        getStorage(){
          let $scope=this;
          if (sessionStorage.getItem("request")) {
            $scope.pagesInfo = JSON.parse(sessionStorage.getItem("request"));
            var temp = JSON.parse(sessionStorage.getItem("param"))
            $scope.projectText = temp.projectText || "";
            $scope.project = temp.project || null;
            $scope.total = temp.total;
          }
          $scope.listSearch($scope.pagesInfo)
        },
       //跳转详情
       saveListParams(userId){
         let request = {
           listIds: this.listIds,
           condition: {
             workReportType: this.pagesInfo.workReportType,
             startDate: this.pagesInfo.startDate,
             endDate: this.pagesInfo.endDate,
             projectId: this.pagesInfo.projectId
           },
           page: this.pagesInfo.page,
           pageSize: this.pagesInfo.pageSize,
           total: this.total
         }
         this.$router.push({name:"reportDetail",params :{ id: userId,request}})
       },
       // 清空搜索条件
        clean() {
            this.pagesInfo.workReportType = null;
            this.typeText = "全部";
            this.pagesInfo.startDate = null;
            this.pagesInfo.endDate = null;
            this.pagesInfo.projectId = null;
            this.projectText = "";
           this.listSearch({ page: 1 });
        },
       //查询
        listSearch(SearchRequest) {
            let  self= this;
            if (self.pagesInfo.startDate) {
                self.pagesInfo.startDate =getDate(self.pagesInfo.startDate,'yyyy-MM-dd') ;
            } else {
                self.pagesInfo.startDate = null;
            }
            if (self.pagesInfo.endDate) {
                self.pagesInfo.endDate = getDate(self.pagesInfo.endDate,'yyyy-MM-dd');
            } else {
                self.pagesInfo.endDate = null;
            }
            report.api.report.listSearch(self.pagesInfo).then(function(pagerResult) {
              self.items = pagerResult.records;
                // 当前页所有ID
                self.listIds = [];
                 pagerResult.records.forEach(function(v, i) {
                    self.listIds.push(v.id);
                 });
                self.total = pagerResult.total;
                // 存参数
                sessionStorage.setItem("request", JSON.stringify(self.pagesInfo));
                sessionStorage.setItem("param", JSON.stringify({ projectText: self.projectText, project: self.project, typeText: self.typeText, total: pagerResult.total }));
            });
        },
       // 导出类型切换
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
       // 导出
        exports() {
            let self=this;
            if (self.range == 1) {
              let pageParams=Object.assign(self.pagesInfo,{page: 1, pageSize: 10,});
              if (self.from == 1) {
                report.api.report.exportWord(pageParams);
              } else {
                  report.api.report.exportPdf(pageParams);
              }
            }
            if (self.range == 2) {
              let pageParams=Object.assign(self.pagesInfo,{page: null, pageSize: null,});
              if (self.from == 1) {
                  report.api.report.exportWord(pageParams);
              } else {
                  report.api.report.exportPdf(pageParams);
              }
            }
        },
       //分页
       changePage(page) {
         this.pagesInfo.page = page
         this.listSearch(this.pagesInfo)
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
 }
 </script>
<style scoped>
  .reportList {
    padding-bottom: 150px;
  }
button{
  width: 90px;
}
.header-item {
  display: inline-block;
  margin: 10px 15px;
}
 .col-grey{
    color: #939BA4;
}

.wd100{
    width: 120px;
}

.no-mar{
    margin: 0;
}

.text-them{
    color: #248bfe;
}

.dropdown-menu{
    min-width: 160px;
}

.arrow-padding{
    padding-left: 14px!important;
    padding-right: 15px!important;
}

/*头部*/
.header{
  /*margin-top: 15px;*/
    padding: 15px;
    background-color: white;
}
.text-primary {
  color: #248bfe !important;
}
.btn-info {
  background-color: #8c9eff;
  border-color: transparent;
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

/*导出*/
.export{
    margin: 10px 0;
    /*padding: 0 30px;*/
}

.export .header-item{
    margin: 10px 5px;
}

</style>
