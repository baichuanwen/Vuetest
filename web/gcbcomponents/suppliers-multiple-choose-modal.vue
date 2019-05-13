<template>
  <div class="modal-content" id="project_select">
    <!--<div class="modal-header">
        <h4 class="modal-title text-center">{{ title }}</h4>
    </div>-->

    <div class="modal-body">
      <div class="select_box">
        <span class="col-grey">供应商：</span>
        <div class="projects clearfix">
          <div class="item" v-for="(item, $index) in suppliers" :key="$index" @mouseover="currentProject = $index"
               @mouseout="currentProject = null"
               :class="{'active':currentProject == $index,'text-primary':item.isSelected}" @click="select(item)">
            <span :title="item.name">{{item.name}}</span>
          </div>
        </div>
      </div>

      <div class="selected_box">
        <span class="col-grey">已选({{selectedItem.length || 0}})：</span>
        <span v-show="!selectedItem.length">暂无已选</span>
        <div class="projects clearfix" v-show="selectedItem.length">
          <div class="item" v-for="(item, $index) in selectedItem" :key="$index" @mouseover="currentSelected = $index"
               @mouseout="currentSelected = null" :class="{'active':currentSelected == $index}">
            <span :title="item.name">{{item.name}}</span>
            <span class="item_close font-12" v-show="currentSelected == $index"
                  @click="deleteSelected(item,$index)">x</span>
          </div>
          <span class="text-danger remove" @click="remove()">清空</span>
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-primary btn-width-90" data-dismiss="modal" @click="confirm()">确定</button>
      <button type="button" class="btn btn-default btn-width-90" data-dismiss="modal" @click="cancel()">取消</button>
    </div>
  </div>
</template>

<script>
  import axios from '@/libs/axios'
  import config from "@/config/index"

  export default {
    props: ['opinions'],
    data() {
      return {
        host: config.apiHost + 'web/provider/search',
        defaults: {
          title: '选择供应商',
          selectedItem: [],
          isAuthData: false,
          isSubCompanyProject: false, //是否包含字部门下项目
          isIncludeCreatorProject: false //是否包含创建者
        },
        selectedItem: [],
        suppliers: {},
        currentProject: null,
        currentSelected: null
      }
    },
    methods: {
      // 选择项目
      select: function (item) {
        console.log(item.isSelected)
        if (item.isSelected) {
          console.log(this.selectedItem)
          this.selectedItem.forEach(function (v, i) {
            if (v.id == item.id) this.selectedItem.splice(i, 1)
          })
        } else {
          this.selectedItem.push(item)
        }
        item.isSelected = !item.isSelected
      },
      // 删除已选
      deleteSelected: function (item, index) {
        this.selectedItem.splice(index, 1)
        this.suppliers.forEach(function (v) {
          if (v.id == item.id) v.isSelected = false
        })
      },
      // 清空
      remove: function () {
        this.selectedItem = []
        this.suppliers.forEach(function (v) {
          v.isSelected = false
        })
      },

      cancel: function () {
        // !(options.cancel() === false) && $uibModalInstance.close();  TODO
      },

      confirm: function () {
        // !(options.confirm($scope.selectedItem) === false) && $uibModalInstance.close(); TODO
      }
    },
    mounted() {
      const self = this

      axios.request({
        url: self.host,
        data: {},
        method: 'post'
      }).then(function (suppliers) {
        // for (var i = 0; i < suppliers.records.length; i++) {
        //   var suppliers = suppliers.records.length[i]
        //   suppliers['isSelected'] = false
        // }
        self.suppliers = suppliers.records
        console.log(self.suppliers)
      })

      // this.title = this.options.title
      // if (this.options.selectedItem) {
      //   this.selectedItem = [].concat(this.options.selectedItem)
      // } else {
      //   this.selectedItem = []
      // }

      // api.basicSetting.searchSupplier({}).success(function (suppliers) {
      //   console.log(suppliers)
      //   this.suppliers = suppliers.records
      //   if (this.options.selectedItem && this.options.selectedItem.length) {
      //     this.suppliers.forEach(function (v, i) {
      //       this.selectedItem.forEach(function (val) {
      //         if (val.id == v.id) v.isSelected = true
      //       })
      //     })
      //   }
      // })
    }
  }
</script>

<style scoped>
  .col-grey {
    color: #939BA4;
  }
  .modal {
    position: relative;
  }
  .modal-header {
    display: none;
  }
  .modal-dialog {
    width: 99.9%;
    margin: 22px 1px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  .modal-content {
    border: #a4abb2;
    border-radius: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .modal-footer {
    padding: 25px 15px 30px;
  }
  #project_select .modal-body .select_box {
    position: relative;
    padding-left: 45px;
    min-height: 40px;
    max-height: 200px;
    overflow: auto;
  }
  #project_select .modal-body .select_box > span {
    position: absolute;
    top: 0;
    left: 0;
    line-height: 40px;
  }
  #project_select .modal-body .selected_box {
    position: relative;
    padding-left: 60px;
    min-height: 40px;
    max-height: 200px;
    overflow: auto;
    margin-top: 20px;
  }
  #project_select .modal-body .selected_box > span:first-of-type {
    position: absolute;
    top: 0;
    left: 0;
    line-height: 40px;
  }
  #project_select .modal-body .selected_box > span:last-of-type {
    line-height: 40px;
  }
  #project_select .modal-body .projects .item {
    box-sizing: border-box;
    padding: 0 10px;
    /*max-width: 200px;*/
    width: 33.33%;
    max-width: 230px;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
    position: relative;
    cursor: pointer;
  }
  #project_select .modal-body .projects .item.active {
    background-color: #f4f4f4;
    color: #248bfe;
  }
  #project_select .modal-body .projects .item_close {
    position: absolute;
    right: 2px;
    top: -6px;
    color: #AAAAAA;
    cursor: pointer;
    font-size: 18px;
    line-height: normal;
  }
  #project_select .modal-body .selected_box .projects {
    padding-right: 40px;
    position: relative;
  }
  #project_select .modal-body .selected_box .projects .remove {
    float: left;
    line-height: 40px;
    cursor: pointer;
  }
</style>
