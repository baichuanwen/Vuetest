<template>
  <div>
    <b-modal class=""  id="sidebar-app-setting" size="lg" ref="gcbModal">
      <div slot="modal-header" class="text-center">应用设置</div>
      <div>
        <div id="framework-custom-modules" class="clearfix">
          <div class="module-group">
            <div class="module-item clearfix"  v-for="module in modules.slice(1,8)">
              <div class="module-icon"><i class="icon" :class="module.module.icon"></i></div>
              <div class="module-title" ng-click="toggle(module);">{{module.module.title}}</div>
              <div class="module-toggle"> <i-switch :value="module._up"  @on-change="change(module)" /></div>
            </div>
          </div>
          <div class="module-group">
            <div class="module-item clearfix"  v-for="module in modules.slice(8,15)">
              <div class="module-icon"><i class="icon" :class="module.module.icon"></i></div>
              <div class="module-title" ng-click="toggle(module);">{{module.module.title}}</div>
              <div class="module-toggle"> <i-switch  :value="module._up" @on-change="change(module)" /></div>
            </div>
          </div>
          <div class="module-group" style="border: none;">
            <div class="module-item clearfix"  v-for="module in modules.slice(15,22)">
              <div class="module-icon"><i class="icon" :class="module.module.icon"></i></div>
              <div class="module-title" ng-click="toggle(module);">{{module.module.title}}</div>
              <div class="module-toggle"> <i-switch :value=module._up @on-change="change(module)" /></div>
            </div>
          </div>
        </div>
      </div>
      <div slot="modal-footer">
        <Button type="primary" style="margin-right: 8px;"  @click="handleAction">确定</Button>
        <Button type="default"  @click="close">取消</Button>
      </div>
    </b-modal>
  </div>
</template>
<script>
  import gcbModules from "@/config"
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        modules:[],
        customModules:[],
        switch1: true,
        options: {
          title:"提示",
          content:"",
          subMessage:"",
          icon:"success"
        },
      }
    },
    methods: {
      handleAction(button) {
         button=this.customModules;
        this.$emit('action', button);
      },
      change (item) {
        item._up=!item._up;
        this.customModules=[];
        this.modules.map((module,index)=>{
          if(!module.routes||!module.routes.name)return;
          if(!module._up){
           this.customModules.push(module.routes.name)
          }
        })
        localStorage.setItem("customModules",this.customModules.join())
      },
      open() {
        this.$refs.gcbModal.show()
      },
      close() {
        this.$refs.gcbModal.hide()
      },
    },
    mounted() {
      this.modules=gcbModules.gcbModules;
      this.customModules= localStorage.getItem("customModules");
      if(this.customModules){
        this.customModules.split(",");
      }else{
        this.customModules=[];
      }
      this.modules.map((item,index)=>{
        item._up=true;
        if(!item.routes||!item.routes.name)return;
        if(this.customModules.indexOf(item.routes.name)>-1){
          item._up=false;
        }
      })
    }
  }
</script>

<style lang="less" scoped>

  .modal-footer .ivu-btn {
    width: 60px;
  }
  .modal-body {
    position: relative;
    padding: 15px;
  }
  .ivu-switch-checked {
    border-color: #4BD963;
    background-color: #4BD963;
  }
  .ivu-switch {
    width: 30px;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
  }
  .ivu-switch-checked:after {
    left: 12px;
  }
  .ivu-switch:after {
    top: 2px;
    content: '';
    width: 14px;
    height: 14px;
  }
  .module-toggle {
    font-size: 25px;
    width: 65px;
    height: 40px;
    float: left;
    cursor: pointer;
  }
  .module-item {
    border: none;
    padding: 15px 5px 5px 5px;
    clear: both;
  }
  .module-group {
    width: 222px;
    border-right: 1px #ccc solid;
    float: left;
  }
  .content{
    text-align: center;
    line-height: 100px;
    font-size: 16px;
  }
  .module-icon .icon {
    width: 40px;
    height: 40px;
    display: inline-block;
  }
  .module-icon {
    text-align: center;
    font-size:30px;
    width: 60px;
    height: 40px;
    color: #248bfe;
    float: left;
  }
  .module-title {
    font-size: 14px;
    width: 80px;
    height: 40px;
    padding: 10px 5px 5px 5px;
    float: left;
    cursor: pointer;
  }
  .module-toggle {
    font-size: 25px;
    width: 65px;
    height: 40px;
    float: left;
    cursor: pointer;
  }

  .module-icon .icon.icon-announce {
    background: url("../../../static/img/icon/setting/announce.png");
  }

  .module-icon .icon.icon-approval {
    background: url("../../../static/img/icon/setting/approval.png");
  }

  .module-icon .icon.icon-certificate {
    background: url("../../../static/img/icon/setting/certificate.png");
  }

  .module-icon .icon.icon-attendance {
    background: url("../../../static/img/icon/setting/check.png");
  }

  .module-icon .icon.icon-cloud {
    background: url("../../../static/img/icon/setting/cloud.png");
  }

  .module-icon .icon.icon-contract {
    background: url("../../../static/img/icon/setting/contract.png");
  }

  .module-icon .icon.icon-inspection {
    background: url("../../../static/img/icon/setting/inspection.png");
  }

  .module-icon .icon.icon-invoice {
    background: url("../../../static/img/icon/setting/invoice.png");
  }

  .module-icon .icon.icon-knowledge {
    background: url("../../../static/img/icon/setting/knowledge.png");
  }

  .module-icon .icon.icon-project {
    background: url("../../../static/img/icon/setting/project.png");
  }

  .module-icon .icon.icon-projectWorkLog {
    background: url("../../../static/img/icon/setting/projectWorkLog.png");
  }

  .module-icon .icon.icon-quality {
    background: url("../../../static/img/icon/setting/quality.png");
  }

  .module-icon .icon.icon-report {
    background: url("../../../static/img/icon/setting/report.png");
  }

  .module-icon .icon.icon-security {
    background: url("../../../static/img/icon/setting/security.png");
  }

  .module-icon .icon.icon-system {
    background: url("../../../static/img/icon/setting/system.png");
  }

  .module-icon .icon.icon-task {
    background: url("../../../static/img/icon/setting/task.png");
  }

  .module-icon .icon.icon-labormanage {
    background: url("../../../static/img/icon/setting/labormanage.png");
  }

  .module-icon .icon.icon-inventory {
    background: url("../../../static/img/icon/setting/inventory.png");
  }

  .module-icon .icon.icon-purchase {
    background: url("../../../static/img/icon/setting/purchase.png");
  }

  .module-icon .icon.icon-basicsetting {
    background: url("../../../static/img/icon/setting/basicsetting.png");
  }

  .module-icon .icon.icon-wisdom {
    background: url("../../../static/img/icon/setting/wisdom.png");
  }
</style>
