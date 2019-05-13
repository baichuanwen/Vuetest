<template>
  <div class="animated fadeIn">
    <Row class="right-search" :gutter="32">
      <div class="header clearfix" style="font-size: 14px">
        <div class="header-item">
          <span class="col-grey font-17">通知情况</span>
          <Select   v-model= "typeText1" style="width:150px">
            <Option :value="type1.name" v-for="(type1,index) in types1" :key="index" > {{types1.name}}</Option>
          </Select>
        </div>
        <div class="header-item">
          <span class="col-grey font-17">整改情况</span>
          <Select   v-model= "typeText2" style="width:150px">
            <Option :value="type2.name" v-for="(type2,index) in types2" :key="index" > {{types2.name}}</Option>
          </Select>
        </div>
        <div class="header-item">
          <span class="col-grey font-17">开始时间</span>
          <DatePicker type="date"   v-model="postData.startDate" style="width: 180px"></DatePicker>
        </div>
        <div class="header-item">
          <span class="col-grey font-14">结束时间</span>
          <DatePicker type="date"   v-model="postData.endDate" style="width: 180px"></DatePicker>
        </div>
        <div class="header-item" style="float: right; margin:10px 10px 0px 15px">
          <Button type="primary" size="large" @click="listSearch()" >查找</Button>
          <Button size="large" @click="clean()">清空</Button>
        </div>
      </div>
    </Row>
    <br>
    <Row >
      <Col span="24" style="width: 78%; padding-left:2%"><span class="col-grey">选择：</span>
      <Select placeholder="导出当前" v-model="exportRangeText" style="width:150px; margin-right:10px"   @on-change="exportRangeToggle(item.name)">
        <Option :value="item.name" v-for="(item,index) in exportRange" :key="index">{{item.name}}</Option>
      </Select>
      <Select placeholder="Excel" v-model="exportFromText" style="width:150px;margin-right:10px"  @on-change="exportFromToggle(item.name)">
        <Option :value="item.name" v-for="(item,index) in exportFrom" :key="index">{{item.name}}</Option>
      </Select>
      <Button type="primary" size="large" @click="exports()" >导出</Button>
      </Col>
      <div class="inspection-search" style="font-size: 14px">
        <Input style="width: 20%; margin-right: 2%" v-model="postData.searchName" icon="ios-search" placeholder="请输入项目名称或检查人查询" @click.native="listSearch()" @keyup.native.enter="search()"></Input>
      </div>
    </Row>
    <br>
    <Row>
      <div class="" >
        <div class="items" v-for="item in inspectionList" @click="showDetail(item.id)"  @mouseenter="showActive(item.id)" @mouseleave="showActive(0)">
          <div>
            <div class="icon btn-success lastName" style="background-color: #248bfe;border-color: #248bfe;border-radius: 25px;">
              <span>{{item.lastName}}</span>
            </div>
            <div style="margin-left: 70px">
              <div class="line-height-30">{{item.employeeName}}</div>
              <div class="line-height-30" style="color: gray;">{{item.createTime}}</div>
            </div>
          </div>
          <div class="report-content users">
            <div class="items-title font-16 line-height-30 " style="font-weight:bold;">{{item.projectName}}</div>
          </div>
          <div class="items-content line-height-30">{{item.content}}</div>
          <div>
            <div class="items-bottom" style="margin-top: 20px">
              <div class="pull-left" style="width:150px;border-right: 1px solid #e2e4e8;">
                <img v-show="item.isChanged == 0" src="../../inspection/images/noChanged.png">
                <img v-show="item.isChanged == 1" src="../../inspection/images/changed.png">
                <img v-show="item.isNotice == 0" src="../../inspection/images/noNotice.png">
                <img v-show="item.isNotice == 1" src="../../inspection/images/notice.png">
              </div>
              <label  class="fa fa-chain-broken col-grey"></label><span class="col-grey">附件 {{item.attachmentNum}}</span>
              <label  class="fa fa-commenting-o col-grey"></label><span class="col-grey">评论 {{item.commentNum}}</span>
              <div class="items-bottom-right" v-show="(active == item.id)">
                <button class="col-grey" style="border: none;background-color: #77484800;outline: none;" @click="goEdit($event,item.id)" >编辑</button>
                <button class="col-grey" style="border: none;background-color: #77484800;outline: none;" @click="deleteItem($event,item.id)">删除</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
      <Page class="gcb-page" style="margin-right: 25px;margin-bottom: 25px;"  :total="total" :current="postData.page" @on-change="changePage" show-total show-elevator ></Page>
    </Row>
    <div class="data-null text-center" v-show="!inspectionList.length">
      <!--<img src="/client/framework/images/data-null.png" alt="">-->
      <p style="margin: -90px 0 10px;">暂无数据</p>
    </div>
  </div>
</template>

<script>
    import inspection from '../module';
    import {
      getWeek,
      buildDownloadUrl,
      getFileType,
      hasPermission,
      getFileSize
    }from "@/libs/tools";
    export default {
        name: "inspection-list",
        data(){
          return{
            //通知情况
            types1 : [
              { type: null, name: "全部" },
              { type: 0, name: "未通知" },
              { type: 1, name: "已通知" }
            ],
            //整改情况
            types2 : [
              { type: null, name: "全部" },
              { type: 0, name: "未整改" },
              { type: 1, name: "已整改" }
            ],
            postData: {
              endDate: "",
              exportType: null,
              isChanged: null,
              isNotice: null,
              page: 1,
              pageSize: 10,
              searchName: "",
              startDate: ""
            },
            listIds: [],
            total: 0,
            inspectionList: [],
            hasPermission: false,
            active:0,
            typeText1:null,
            typeText2:null,
            // 导出参数
            range : 1,
            exportRangeText : "导出当前",
            exportRange : [{ type: 1, name: "导出当前" }, { type: 2, name: "导出全部" }],
            from : 1,
            exportFromText : "Excel",
            exportFrom :[{ type: 0, name: "Excel" }, { type: 1, name: "PDF" }],
          }
        },
      watch: {
        typeText1:function () {
          this.types1.forEach((item,index)=>{
            if(item.name==this.typeText1){
              this.postData.isNotice=item.type
            }
          })
        },
        typeText2: function () {
          this.types2.forEach((item, index ) => {
            if (item.name == this.typeText2) {
              this.postData.isChanged = item.type
            }
          })
        },
      },
      methods: {
        isPermission(id) {
          if (this.userId == id && this.hasPermission(129)) {
            return true;
          } else {
            return false;
          }
        },
        showActive(index) {
          this.active = index;
        },
        // 导出类型切换
        exportRangeToggle(name) {
          let item = this.exportRange.find(item=>item.name==name);
          this.exportRangeText = item.name;
          this.range = item.type;
        },
        exportFromToggle(name) {
          let item = this.exportFrom.find(item=>item.name==name);
          this.exportFromText = item.name;
          this.from = item.type;
        },
        // 清空搜索条件
        clean() {
          this.postData.endDate = "";
          this.postData.searchName = "";
          this.postData.startDate = null;
          this.postData.projectId = null;
          this.typeText1 = "全部";
          this.typeText2 = "全部";
          this.listSearch();
        },
        changePage(page) {
          this.postData.page = page;
          this.listSearch();
        },
        //列表查找
        listSearch () {
            let that = this;
            inspection.api.inspection.listSearch(that.postData).then(result => {
              result.records.forEach(function (v, i) {
                that.listIds[i] = v.id;
                v.lastName = v.employeeName.charAt(v.employeeName.length - 1, 1);
              });
              that.inspectionList = result.records;
              that.total = result.total;
            });
          },
        //删除
        deleteItem($event,userId) {
          let self = this;
          this.$gcb.gcbModal.open({
            content: "确定删除该条巡查吗",
            icon: "danger",
          }).then(() => {
            inspection.api.inspection.deleteInspection({id: userId}).then(function () {
              self.$gcb.tooltip.open({
                message: "删除成功",
              })
              self.listSearch();
            });
          })
          $event.stopPropagation();
        },
        //分页
        changePage(page) {
          this.postData.page = page
          this.listSearch()
        },
        //跳转详情
        showDetail(userId){
          this.$router.push({name: "inspectionDetail", params: {id: userId}})
        },
        //跳转编辑
        goEdit($event,userId) {
          this.$router.push({name: "inspectionEdit", params: {id: userId}});
          $event.stopPropagation();
        },
        // 导出
        exports() {
          let self = this;
          if (self.range == 1) {
            if (self.from == 1) {
              inspection.api.inspection.exportExcel({
                exportFormatType: self.range,
                page: self.postData.page,
                pageSize: self.postData.pageSize,
                startDate: self.postData.startDate,
                endDate: self.postData.endDate,
                exportType: self.from,
                isChanged: self.postData.isChanged,
                isNotice: self.postData.isNotice,
                searchName: self.postData.searchName
              });
            } else {
              inspection.api.inspection.exportPdf({
                exportFormatType: self.range,
                page: self.postData.page,
                pageSize: self.postData.pageSize,
                startDate: self.postData.startDate,
                endDate: self.postData.endDate,
                exportType: self.from,
                isChanged: self.postData.isChanged,
                isNotice: self.postData.isNotice,
                searchName: self.postData.searchName,
              });
            }
          }
          if (self.range == 2) {
            if (self.from == 1) {
                inspection.api.inspection.exportExcel({
                exportFormatType: self.range,
                page: null,
                pageSize: null,
                startDate: self.postData.startDate,
                endDate: self.postData.endDate,
                exportType: self.from,
                isChanged: self.postData.isChanged,
                isNotice: self.postData.isNotice,
                searchName: self.postData.searchName,
              });
            } else {
              inspection.api.inspection.exportPdf({
                exportFormatType: self.range,
                page: null,
                pageSize: null,
                startDate: self.postData.startDate,
                endDate: self.postData.endDate,
                exportType: self.from,
                isChanged: self.postData.isChanged,
                isNotice: self.postData.isNotice,
                searchName: self.postData.searchName,
              });
            }
          }
        },

      },
      // 挂载结束状态
      mounted: function() {
        if(sessionStorage.getItem('vueParams')){
          this.postData = JSON.parse(sessionStorage.getItem('vueParams'));
          this.keyword = this.postData.searchName;
          this.listSearch(this.postData);
        }else{
          this.listSearch(this.postData);
        }
      }
    }
</script>

<style scoped>
  .lastName{
    height: 100%;
    width: 100%;
    display: block;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    background-color: #248bfe;
    color: white;
  }
  .line-height-30{
    line-height:30px;
  }
  button{
    width: 80px;
    height: 32px;
  }
  .header-item {
    display: inline-block;
    margin: 10px 15px;
  }
  .col-grey{
    color: #939BA4;
  }
  /*头部*/
  .header{
    /*margin-top: 15px;*/
    padding: 15px;
    background-color: white;
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
  /*内容*/
  .main .icon{
    width:50px;
    height:50px;
    border-radius:25px;
    /*background-color: #838EFD;*/
    color: #ffffff;
    font-weight: bolder;
    float: left;
  }

  .main .icon span{
    height: 100%;
    width: 100%;
    display: block;
    text-align: center;
    line-height: 50px;
    /*padding-left: 11px;*/
    font-size: 16px;
  }

  .items{
    padding: 30px;
    background-color: white;
    border-bottom: 1px solid #f5f5f5;
  }

  .items:hover{
    cursor:pointer ;
    background-color: #F1F1F1;
  }

  .items:hover .users>div{
    color: #0093dd;
  }

  .items-title{
    font-size: 16px;
    margin: 5px 0;
  }

  .font-16{
    font-size: 16px;
  }

  .items-content{
    line-height: 21px;
    max-height: 63px;
    overflow: hidden;
  }

  .items-bottom span{
    width: 100px;
  }

  .items-bottom-left input:first-child{
    margin-right: 16px;
  }

  .items-bottom label{
    padding:0px 16px 0px 30px;
  }

  .items-bottom label:first-of-type{
    padding: 0 16px 0 10px;
  }

  .items-bottom-right{
    float: right;
  }

  .items-bottom-right span{
    padding-right: 20px;
  }

  /*导出*/

  .export .header-item{
    margin: 10px 5px;
  }

  .inspection-search {
    text-align: right;
    margin-bottom: 10px;
  input {
    width: 300px;
    font-size: 14px;
  }
  }

</style>
