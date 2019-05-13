<template>
  <div id="project-manage-root" class="project">
    <div id="project-manage-map-mode" v-show="activeMode=='map'">
      <div id="project-manage-map-box"></div>
      <!--检索项-->
      <div id="project-manage-search-box" class="panel panel-default">
        <div class="panel-body">
          <form name="createForm" class="form-horizontal" role="form" novalidate>
            <div class="header clearfix">
              <div class="form-group" style="margin-bottom: 30px;">
                <div class="col-sm-12">
                  <Input type="text" icon="ios-search" placeholder="输入标签、编号、名称或负责人查询" name="projectName" v-model="searchRequest.projectName" on-click="search()" on-enter="search()" />
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-12">
                  <Dropdown trigger="click" class="selctOption col-sm-6 t-l" @on-click="selectProvince">
                    <a href="javascript:void(0)">
                      <span class="col-sm-12">{{searchRequest.province.province || '省'}}</span>
                      <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list" class="selctBox">
                      <DropdownItem v-for="(province, idx) in provinceOptions" :key="idx" :name="province.id" :selected="searchRequest.province.id==province.id">{{province.province}}</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  <Dropdown trigger="click" class="selctOption col-sm-6 t-r" @on-click="selectCity">
                    <a href="javascript:void(0)">
                      <span class="col-sm-12">{{searchRequest.city.city || '市'}}</span>
                      <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list" class="selctBox">
                      <DropdownItem v-for="(city, idx) in cityOptions" :key="idx" :name="city.id" :selected="searchRequest.city.id==city.id">{{city.city}}</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-12">
                  <Dropdown trigger="click" class="selctOption col-sm-6 t-l">
                    <a href="javascript:void(0)" v-model="searchRequest.projectStatus.label">
                      <span>项目状态</span>
                      <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list" class="selctBox">
                      <DropdownItem v-for="(option, idx) in projectStatusOptions" :key="idx" :name="option.label" on-click="searchRequest.projectStatus=option"
                                    :selected="searchRequest.projectStatus.value==option.value">{{option.label}}</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  <Dropdown trigger="click" @click="openDepartmentChooseModal()" class="selctOption col-sm-6 t-r">
                    <a href="javascript:void(0)" v-model="searchRequest.department.departmentName">
                      <span>项目状态</span>
                      <Icon type="ios-arrow-down"></Icon>
                    </a>
                  </Dropdown>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-12 text-right">
                  <Button type="primary" @click="search()">查询</Button>
                  <Button type="ghost" @click="clear2()">清空</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!--数据列表-->
      <div id="project-manage-result-box" class="panel panel-default">
        <div class="panel-body">
          <div class="row" style="height: 34px;">
            <div class="col-sm-12" style="line-height: 34px;padding-right: 0px;">共{{pagerResult.total || 0}}个项目</div>
            <div id="project-mode-choose-box" class="col-sm-7" style="padding: 0px;text-align: right;">
              <i-button :class="{'ivu-btn-primary':activeMode=='map', 'ivu-btn-ghost':activeMode=='list'}" @click="selectMode('map')">
                <i class="fa fa-map-marker"></i> 地图模式
              </i-button>
              <i-button :class="{'ivu-btn-primary':activeMode=='list', 'ivu-btn-ghost':activeMode=='map'}" @click="selectMode('list')">
                <i class="fa fa-list-ul"></i> 项目列表
              </i-button>
            </div>
          </div>
          <div class="row list">
            <!--zp 修改click 事件范围-->
            <div class="col-sm-12 block">
              <div class="result-item clearfix" :class="{'active':selectedItem==project}" v-for="(project, $index) in pagerResult.records" :key="$index"
                   click-and-disable="goToDetail(project)" @mouseenter="mouseenterItem(project)" @mouseleave="mouseleaveItem(project)">
                <div class="index-box" click-and-disable="goToDetail(project)">
                  <div :class="'icon' + ($index +1)"></div>
                </div>
                <div class="main-box" click-and-disable="goToDetail(project)">
                  <div class="header-box">
                    <div class="title-box"><a class="cursor-pot" click-and-disable="goDetail(project.id)" target="_blank">
                      <span class="projectName">{{project.projectName}}</span></a>
                    </div>
                    <div class="status-box"><span class="label label-info">{{['','在建','未开工','验收','终止','待勘察','竣工','工程筹备','勘察设计','已停工'][project.projectStatus]}}</span>
                    </div>
                  </div>
                  <div class="body-box">
                    <div class="info-box">
                      <div class="info-item">项目负责人：{{project.chargeEmployee ? project.chargeEmployee.employeeName : ''}}</div>
                      <div class="info-item">开工日期：{{project.startTime | date('yyyy-MM-dd')}}</div>
                      <div class="info-item">竣工日期：{{project.endTime | date('yyyy-MM-dd')}}</div>
                    </div>
                    <div class="img-box"><img
                      :src="project.iconFileUrl || '../../../../static/img/project-default.png'"
                      height="75" width="100"/></div>
                  </div>
                  <div class="top-box" v-show="!project.isTop && project.isHover" @click="setTop(project);$event.stopPropagation();">
                    <span class="label label-warning">置顶</span>
                  </div>
                  <div class="untop-box" v-show="project.isTop && project.isHover" @click="cancelTop(project);$event.stopPropagation();">
                    <span class="label label-danger">取消置顶</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row text-center" style="margin-top: 15px;">
            <div class="col-sm-12" style="display: inline-block">
              <Page :total="pagerResult.total"></Page>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="project-manage-list-mode" v-show="activeMode=='list'">列表模式
    </div>
  </div>
</template>

<script>
  import './projectList.css'
  import $project from '../module'
  import frame from '../../../framework/module'
  import { buildDownloadUrl, hasPermission, forEach } from '@/libs/tools'

  export default {
    name: "projectList",
    data() {
      return {
        activeMode: '',
        searchRequest: {
          projectName: '',
          page:1,
          pageSize: 15,
          province: {
            id: '',
            province: ''
          },
          city: {
            id: '',
            city: ''
          },
          projectStatus: {
            value: null,
            label: ''
          },
          department: {
            id: null,
            departmentName: ''
          }
        },
        provinceOptions: [],
        cityOptions: [],
        selectall: false,
        projectEdit: hasPermission(42), // 项目编辑权限
        projectEditStatus: true, //显示编辑或完成icon
        //zp 添加项目看板 对于编辑权限的放出 “模版下载”、“模版导入”、“导出”功能
        hasPermission: hasPermission,
        projectNatureOptions: [
          {value:1, label:"新建"},
          {value:2, label:"扩建"},
          {value:3, label:"改建"},
          {value:4, label:"复建"},
          {value:5, label:"迁建"},
          {value:6, label:"拆建"},
          {value:10, label:"其他"}
        ],
        projectStatusOptions: [
          {value: 7, label: "工程筹备", select: false},
          {value: 8, label: "勘察设计", select: false},
          {value: 5, label: "待勘察", select: false},
          {value: 2, label: "未开工", select: false},
          {value: 1, label: "在建", select: false},
          {value: 3, label: "验收", select: false},
          {value: 6, label: "竣工", select: false},
          {value: 4, label: "终止", select: false},
          {value: 9, label: "已停工", select: false}
        ],
        projectStatusOptionsModify: [
          {value: 7, label: "工程筹备", select: false},
          {value: 8, label: "勘察设计", select: false},
          {value: 5, label: "待勘察", select: false},
          {value: 2, label: "未开工", select: false},
          {value: 1, label: "在建", select: false},
          {value: 3, label: "验收", select: false},
          {value: 6, label: "竣工", select: false},
          {value: 4, label: "终止", select: false}
        ],
        map: null,
        pagerResult: [],
        selectedItem: null,
      }
    },
    // 创建前状态
    beforeCreate() {},
    // 创建完毕状态
    created() {},
    //  挂载前状态
    beforeMount() {},
    // 挂载结束状态
    mounted() {
      let that = this
      let mode = localStorage.getItem("project-manage-mode")
      that.activeMode = mode || "map"
      that.searchRequest.projectStatusList = []
      that.map = new AMap.Map("project-manage-map-box",{
        zoom: 12
      })
      that.search()
      frame.api.region.query({}).then(function(provinces){
        that.provinceOptions = provinces
        // console.log(that.provinceOptions)
      })
    },
    methods: {
      selectMode(mode) {
        this.activeMode = mode
        localStorage.setItem("project-manage-mode", mode)
      },
      selectProvince(provinceId) {
        let that = this
        if(that.searchRequest.province && (that.searchRequest.province.id == provinceId)){
          return
        }
        that.provinceOptions.forEach(function (province) {
          if(province.id === provinceId) {
            that.searchRequest.province = province
          }
        })
        that.cityOptions = []
        that.searchRequest.city = []
        frame.api.region.query({parentId:provinceId}).then(function(citys){
          that.cityOptions = citys
        })
      },
      selectCity(cityId) {
        let that = this
        console.log(cityId)
        that.cityOptions.forEach(function (city) {
          if(city.id === cityId) {
            that.searchRequest.city = city
          }
        })
        console.log(that.searchRequest.city)
      },
      openDepartmentChooseModal() {

      },
      clear2() {
        this.searchRequest.province = null
        this.searchRequest.city = null
        this.searchRequest.projectStatus = null
        this.searchRequest.department = null
        this.cityOptions = []
        this.projectStatusOptions.forEach(function (projectStatus) {
          projectStatus.select = false
        })
        this.searchRequest.projectStatusList = []
      },
      search(searchRequest) {
        let that = this
        searchRequest && Object.assign(that.searchRequest, searchRequest)
        $project.api.project.infoSearch({
          isIncludeCreatorProject: true,
          isIncludeSubordinateProject: true,
          page: that.searchRequest.page,
          pageSize: that.searchRequest.pageSize,
          projectName: that.searchRequest.projectName,
          provinceId: that.searchRequest.province ? that.searchRequest.province.id : null,
          cityId: that.searchRequest.city ? that.searchRequest.city.id : null,
          projectStatus: that.searchRequest.projectStatus ? that.searchRequest.projectStatus.value : null,
          departmentId: that.searchRequest.department ? that.searchRequest.department.id : null,
          projectStatusList: that.searchRequest.projectStatusList ? that.searchRequest.projectStatusList : null
        }).then(function(pagerResult){
          console.log(pagerResult.records)
          that.pagerResult = pagerResult
          // that.pagerResult.records.forEach(function (project) {
          //   project.isHover = false
          // })
          that.map.remove(that.map.getAllOverlays())

          for(var i = 0 ;i < pagerResult.records.length ; i++){
            let project = pagerResult.records[i]
            project.iconFileUrl = buildDownloadUrl(project.iconUuid)
            project.$index = i
            project.select = false
            if(!project.longitude || !project.latitude){
              continue
            }

            (function(project, i){
              var marker =  new AMap.Marker({
                icon : new AMap.Icon({
                  image:"http://ditu.amap.com/assets/img/poi-marker.png",
                  size: new AMap.Size(44, 44),
                  imageOffset:new AMap.Pixel((i > 9 ? (i - 10) : i) * -44, -44 * (i > 9 ? 4 : 3)),
                  imageSize:new AMap.Size(437, 262)
                }),
                position : [project.longitude, project.latitude],
                map : that.map
              });

              marker.on('mouseover', function(e){
                marker.setIcon(
                  new AMap.Icon({
                    image:"http://ditu.amap.com/assets/img/poi-marker.png",
                    size: new AMap.Size(44, 44),
                    imageOffset:new AMap.Pixel((i > 9 ? (i - 10) : i) * -44, -44 * (i > 9 ? 2 : 1)),
                    imageSize:new AMap.Size(437, 262)
                  })
                )
              })

              marker.on('mouseout', function(e){
                if(project == that.selectedItem){
                  return
                }
                marker.setIcon(
                  new AMap.Icon({
                    image:"http://ditu.amap.com/assets/img/poi-marker.png",
                    size: new AMap.Size(44, 44),
                    imageOffset:new AMap.Pixel((i > 9 ? (i - 10) : i) * -44, -44 * (i > 9 ? 4 : 3)),
                    imageSize:new AMap.Size(437, 262)
                  })
                )
              })

              let infoWindow = new AMap.InfoWindow({
                offset : new AMap.Pixel(24, -24)
              })
              marker.on('click', function(e){
                // infoWindow.setContent(project.projectName);
                infoWindow.setContent("<a href='#/projectPanel?id="+ project.id +"' target='_blank' id='isMouseLeave_"+ project.id +"' style='color: #939ba4;text-decoration: none;'>"+project.simpleName+"</a>")
                infoWindow.open(that.map, e.target.getPosition())

                $("#isMouseLeave_"+ project.id).parent().parent().unbind("mouseenter")
                $("#isMouseLeave_"+ project.id).parent().parent().unbind("mouseleave")
              })

              project.cover = {marker:marker,infoWindow:infoWindow}
            })(project, i)

          }
          // pagerResult.records.length
          //自动缩放到 显示地图上所有标记点
          that.map.setFitView()
        })
      },
      goToDetail(project) {
        var url = $state.href("http://www.baidu.com", {id : project.id }, {reload: true})
        window.open(url, "_blank")
      },
      mouseenterItem(project) {
        let that = this
        project.isHover = true
        that.$forceUpdate()

        if(!project.longitude || !project.latitude){
          return
        }

        let marker = project.cover.marker
        let infoWindow = project.cover.infoWindow
        marker.setIcon(
          new AMap.Icon({
            image:"http://ditu.amap.com/assets/img/poi-marker.png",
            size: new AMap.Size(44, 44),
            imageOffset:new AMap.Pixel((project.$index > 9 ? (project.$index - 10) : project.$index) * -44, -44 * (project.$index > 9 ? 2 : 1)),
            imageSize:new AMap.Size(437, 262)
          })
        )
        infoWindow.setContent("<a href='#/projectPanel?id="+ project.id +"' target='_blank' id='isMouseLeave_"+ project.id +"' style='color: #939ba4;text-decoration: none;'>"+project.simpleName+"</a>")
        infoWindow.open(that.map, marker.getPosition())
        that.map.setCenter(marker.getPosition())

        //自动缩放到 显示地图上所有标记点
        that.map.setFitView()

        //避免两个DOM重叠 mouseenter 闪烁
        $("#isMouseLeave_"+ project.id).parent().parent().bind("mouseenter", function () {
          marker.setIcon(
            new AMap.Icon({
              image:"http://ditu.amap.com/assets/img/poi-marker.png",
              size: new AMap.Size(44, 44),
              imageOffset:new AMap.Pixel((project.$index > 9 ? (project.$index - 10) : project.$index) * -44, -44 * (project.$index > 9 ? 2 : 1)),
              imageSize:new AMap.Size(437, 262)
            })
          )
          infoWindow.setContent("<a href='#/projectPanel?id="+ project.id +"' target='_blank' id='isMouseLeave_"+ project.id +"' style='color: #939ba4;text-decoration: none;'>"+project.simpleName+"</a>")
          infoWindow.open(that.map, marker.getPosition())
          that.map.setCenter(marker.getPosition())

          //自动缩放到 显示地图上所有标记点
          that.map.setFitView()
        })
      },
      mouseleaveItem(project) {
        let that = this
        project.isHover = false
        that.$forceUpdate()
        if(!project.longitude || !project.latitude){
          return
        }

        let marker = project.cover.marker
        let infoWindow = project.cover.infoWindow
        marker.setIcon(
          new AMap.Icon({
            image:"http://ditu.amap.com/assets/img/poi-marker.png",
            size: new AMap.Size(44, 44),
            imageOffset:new AMap.Pixel((project.$index > 9 ? (project.$index - 10) : project.$index) * -44, -44 * (project.$index > 9 ? 4 : 3)),
            imageSize:new AMap.Size(437, 262)
          })
        )
        infoWindow.close(that.map, marker.getPosition())
        that.map.setCenter(marker.getPosition())
        //自动缩放到 显示地图上所有标记点
        that.map.setFitView()

        $("#isMouseLeave_"+ project.id).parent().parent().bind("mouseleave", function () {
          marker.setIcon(
            new AMap.Icon({
              image:"http://ditu.amap.com/assets/img/poi-marker.png",
              size: new AMap.Size(44, 44),
              imageOffset:new AMap.Pixel((project.$index > 9 ? (project.$index - 10) : project.$index) * -44, -44 * (project.$index > 9 ? 4 : 3)),
              imageSize:new AMap.Size(437, 262)
            })
          )
          infoWindow.close(that.map, marker.getPosition())
          that.map.setCenter(marker.getPosition())
          //自动缩放到 显示地图上所有标记点
          that.map.setFitView()
        });
      },
      setTop(project) {
        let that = this
        $project.api.project.top({id:project.id}).then(function(){
          that.search()
        })
      },
      cancelTop(project) {
        let that = this
        $project.api.project.cancelTop({id:project.id}).then(function(){
          that.search()
        })
      }
    }
  }
</script>

<style scoped>

</style>
