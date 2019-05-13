<template>
  <div class="animated fadeIn">
    <div class="header">
      <h4 class="title">首页</h4>
      <div class="operation clearfix">
        <Button type="primary"  size="large" class="btn-width-90 pull-left" ng-click="createFile()">创建共享</Button>
        <Button type="error" size="large" class="btn-width-90 mar-left-10 pull-left" ng-show="!isSearch && hasPermission(143)" ng-click="batchDelete()">删除</Button>
        <Input v-model="title" class="width-200 pull-right" icon="ios-search" placeholder="搜索文件..." @click.native="isSearch = true;listSearch({pageNo:1})" @keyup.native.enter="isSearch = true;listSearch({pageNo:1})"></Input>
      </div>
    </div>
    <div class="table">
      <table>
        <thead>
          <tr>
            <th ng-show="!isSearch && hasPermission(143)">
              <label>
                <input type="checkbox" ng-checked="isSelecteAll" ng-click="selectAll()">
                <i></i>
              </label>
            </th>
            <th >
              <div class="pull-left">文件夹名</div>
              <div class="pull-left date-img" ng-click="srotFile()"><img id="srotfile" src="/client/business/cloud/images/auto.png"></div>
            </th>
            <th></th>
            <th>创建者</th>
            <th>大小</th>
            <th>共享成员数</th>
            <th>
              <div class="pull-left">创建时间</div>
              <div class="pull-left date-img" ng-click="srot()"><img id="srot" src="/client/business/cloud/images/auto.png"></div>
            </th>
          </tr>
        </thead>
        <tbody>
         <!-- <tr ng-repeat="item in data track by $index" ng-mouseenter="visibi = false" ng-mouseleave="visibi = true" >
            <td class="text-center" ng-show="!isSearch && hasPermission(143)">
              <label>
                <input type="checkbox" ng-checked="item.isSelected" ng-click="select(item)">
                <i></i>
              </label>
            </td>
            <td class="text-left clearfix" style="width: 315px">
              <div class="pull-left img-box mar-right-10" ng-show="item.type != 1">
                <img error-src ng-src="{{item.src}}" ng-show="item.isImg">
                <img src="/client/framework/images/cad.png" ng-show="item.isCad">
                <img src="/client/framework/images/excel.png" ng-show="item.isExcel">
                <img src="/client/framework/images/pdf.png" ng-show="item.isPdf">
                <img src="/client/framework/images/ppt.png" ng-show="item.isPpt">
                <img src="/client/framework/images/word.png" ng-show="item.isWord">
                <img src="/client/framework/images/unknown.png" ng-show="item.isOther">
              </div>
              <img class="pull-left mar-5" src="/client/business/cloud/images/file.png" ng-show="item.type == 1">
              <span class="pull-left" ng-class="{'cursor-pot':item.type == 1}" title="{{item.fullName}}" ng-show="!item.showEdit" click-and-disable="goSub(item)" style="max-width:250px;text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">{{item.fullName}}</span>
              &lt;!&ndash;重命名&ndash;&gt;
              <form class="rename pull-left" ng-show="item.showEdit" ng-submit="confirmRename(item)">
                <input type="text" class="form-control" ng-model="item.subName" maxlength="{{item.type == 1? 60 : 250;}}">
                <span class="text-primary mar-left-5 cursor-pot" ng-click="confirmRename(item)">确定</span>
                <span class="col-grey mar-left-5 cursor-pot" ng-click="item.subName = item.temp;item.showEdit = false;">取消</span>
              </form>
            </td>
            &lt;!&ndash;ui调整4.0增&ndash;&gt;
            <td class="text-left handle-wrap"  >
              <div class="download" ng-show="item.type != 1" ng-class="{'isShow':visibi}" >
                <a class="text-primary mar-right-10" ng-show="item.type != 1 && item.canDownload" href="{{item.src}}" ng-click="downloadRecord(item);handleIsShow =false" target="_blank">
                  <img src="/client/business/cloud/images/download .png" alt="">
                </a>
              </div>

              <div class="more"  ng-click="handleIsShow = !handleIsShow"  ng-mouseleave="handleIsShow=false" ng-class="{'isShow':visibi}">
                <img ng-class="{'position':item.type === 1}" src="/client/business/cloud/images/more.png" alt="" >
              </div>
              <div class="handle" ng-show="handleIsShow" ng-mouseenter="handleIsShow =true" ng-mouseleave="handleIsShow=false">
                <div class="text-primary cursor-pot " ng-show="item.type == 2 && item.canEdit" ng-click="moveFile(item,2);handleIsShow = false">移动</div>
                &lt;!&ndash; 陈卫 时间2018.7.24 源码 &ndash;&gt;
                &lt;!&ndash; <div class="text-primary cursor-pot " ng-show="item.type == 2 && item.canDownload" ng-click="moveFile(item,1);handleIsShow = false">复制</div> &ndash;&gt;
                &lt;!&ndash; 更改后 &ndash;&gt;
                <div class="text-primary cursor-pot " ng-show="item.type == 1 && copyPermission" ng-click="moveFile(item,1);handleIsShow = false">复制</div>
                <div class="text-primary cursor-pot" ng-show="item.type == 2 && item.canEdit" ng-click="moveFile(item,1);handleIsShow =false">复制</div>
                <div class="text-primary cursor-pot " ng-show="item.type == 1" ng-click="share(item);handleIsShow =false">共享</div>
                <div class="text-primary cursor-pot " ng-show="item.canEdit" ng-click="delete($index,item);handleIsShow =false">删除</div>
                <div class="text-primary cursor-pot " ng-show="item.canEdit" ng-click="rename(item);handleIsShow =false">重命名</div>
                <div class="text-primary cursor-pot" ng-click="setTop(item);handleIsShow =false" ng-if="!item.top">置顶</div>
                <div class="text-primary cursor-pot" ng-click="cancleTop(item);handleIsShow =false" ng-if="item.top">取消置顶</div>
              </div>
            </td>
            <td class="text-left">
              <span ng-show="item.employeeName">{{item.employeeName}}</span>
              <span ng-show="!item.employeeName">-</span>
            </td>
            <td class="text-left">{{item.sizeToString}}</td>
            <td class="text-left text-primary">
              <span class="cursor-pot" ng-show="item.shareType !=1 && item.type == 1" ng-click="showEmployee(item)">{{item.shareSize}}</span>
              <span ng-show="item.shareType == 1 && item.type == 1">全体成员</span>
              <span ng-show="item.type != 1">-</span>
            </td>
            <td class="text-left">{{item.createTime | date:'yyyy-MM-dd HH:mm'}}</td>
          </tr>-->
        </tbody>
      </table>
    </div>
    <sharePubModal ref="sharePubModal"></sharePubModal>
  </div>
</template>
<script>
  import  sharePubModal from "../components/sharePubModal"
  export default {
    data() {
      return {
        categroyName:""

      }
    },
    components: {sharePubModal},
    methods:{
      createFile(){
        this.$refs.sharePubModal.open()

      }
    },
    created(){
    },
  }
</script>
<style lang="less" scoped >

  .mar-left-10{
    margin-left: 10px;
  }
  .width-200{
    width: 200px;
  }
  .header .operation {
    margin-top: 15px;
  }
  .mar-right-5 {
    margin-right: 5px;
  }
  .mar-5 {
    margin-top: 5px;
    margin-right: 10px;
  }
  .col-grey {
    color: #939BA4;
  }
  .header .title {
    font-size: 16px;
    margin-bottom: 20px;
    /*color: #666666;*/
  }
/*表格*/
  .table label {
    margin: 0;
  }

  .table tbody .rename {
    display: inline-block;
  }

  .table tbody .rename input {
    display: inline-block;
    width: auto;
  }

  .table tbody .img-box {
    display: inline-block;
    height: 30px;
    width: 30px;
  }

  .table tbody .img-box img {
    height: 100%;
    width: 100%;
  }

  .table tbody tr td {
    line-height: 30px;
    border-top: none;
  }

  .table tbody tr td:nth-child(1), .table thead tr th:nth-child(1) {
    width: 50px;
  }

  .table tbody tr td:nth-child(2), .table thead tr th:nth-child(2) {
    padding-left: 15px;
  }

  .table tbody tr td:nth-child(3), .table thead tr th:nth-child(3) {
    padding-left: 25px;
  }

  .date-img {
    margin-left: 5px;
  }
  /*操作选项ui调整4.0*/
  .handle-wrap {
    position: relative;
  }

  .handle-wrap div {
    display: inline-block;
  }

  .handle-wrap .more img {
    z-index: -1;
  }

  .handle-wrap .download {
    padding-right: 10px;
  }

  .handle-wrap .handle {
    position: absolute;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
  .handle-wrap .handle {
    text-align: center;
    width: 100px;
    /*padding: 5px 30px;*/
    z-index: 999;
    border-radius: 5px;
    border: 1px solid #e2e4e9;
  }
  .position {
    margin-left: 37px;
  }
  .text-primary:hover {
    /*display: inline-block;*/
    /*text-decoration: underline;*/
    background-color: #edf0f5;
    color: #248bfe;
  }
  .isShow{
    visibility: hidden;
  }

</style>
