<template>
  <b-nav-item-dropdown no-caret id="allApp">
      <slot slot="button-content">
        全部应用&nbsp;<span class="caret"></span>
      </slot>
    <b-dropdown-item style="display: none">
    </b-dropdown-item>
        <b-dropdown-item  @click="setting">
          <ul id="all-app"  uib-dropdown-menu="" role="menu" style="width: 1155px;">
            <li role="menuitem">
              <div id="framework-modules">
                <!-- ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-system" @click="openwindown(0)"></i>
                </div>
                <div class="module-label ng-binding">系统管理</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-announce" @click="openwindown(1)"></i>
                </div>
                <div class="module-label ng-binding">公告</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-inspection" @click="openwindown(2)"></i>
                </div>
                <div class="module-label ng-binding">日常巡检</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-report"@click="openwindown(3)"></i>
                </div>
                <div class="module-label ng-binding">工作汇报</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-quality"@click="openwindown(4)"></i>
                </div>
                <div class="module-label ng-binding">质量</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-security"@click="openwindown(5)"></i>
                </div>
                <div class="module-label ng-binding">安全</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-task" @click="openwindown(6)"></i>
                </div>
                <div class="module-label ng-binding">任务</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-approval" @click="openwindown(7)"></i>
                </div>
                <div class="module-label ng-binding">审批</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-project" @click="openwindown(8)"></i>
                </div>
                <div class="module-label ng-binding">项目看板</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-contract" @click="openwindown(9)"></i>
                </div>
                <div class="module-label ng-binding">合同管理</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-invoice" @click="openwindown(10)"></i>
                </div>
                <div class="module-label ng-binding">发票管理</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-knowledge" @click="openwindown(11)"></i>
                </div>
                <div class="module-label ng-binding">知识</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-check" @click="openwindown(12)"></i>
                </div>
                <div class="module-label ng-binding">考勤</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-cloud" @click="openwindown(13)"></i>
                </div>
                <div class="module-label ng-binding">企业云盘</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-projectWorkLog" @click="openwindown(14)" ></i>
                </div>
                <div class="module-label ng-binding">施工日志</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-certificate" @click="openwindown(15)"></i>
                </div>
                <div class="module-label ng-binding">证书</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-laborManage" @click="openwindown(16)"></i>
                </div>
                <div class="module-label ng-binding">劳务实名制</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-purchase" @click="openwindown(17)"></i>
                </div>
                <div class="module-label ng-binding">采购</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-inventory" @click="openwindown(18)"></i>
                </div>
                <div class="module-label ng-binding">库存</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-basicSetting" @click="openwindown(19)"></i>
                </div>
                <div class="module-label ng-binding">基础设置</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-wisdom" @click="openwindown(20)"></i>
                </div>
                <div class="module-label ng-binding">智能报表</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items --><!-- ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><div class="module-item ng-scope" ng-if="(module.name !='home' &amp;&amp; module.name !='projectWorkLog')||(module.name =='projectWorkLog'&amp;&amp; ($app.employee.isAdvanced == true || $app.company.isTry== true))" ng-repeat="module in $frame.modules.items" ng-click="$frame.modules.select(module)">
                <div class="module-icon">
                  <i class="icon icon-customForm" @click="openwindown(21)"></i>
                </div>
                <div class="module-label ng-binding">自定义表单</div>
              </div><!-- end ngIf: (module.name !='home' && module.name !='projectWorkLog')||(module.name =='projectWorkLog'&& ($app.employee.isAdvanced == true || $app.company.isTry== true)) --><!-- end ngRepeat: module in $frame.modules.items -->
              </div>
            </li>
          </ul>
        </b-dropdown-item>
      <!--<i class="fa fa-lock"></i>-->
    </b-nav-item-dropdown>

</template>

<script>
    import {
        getToken
    } from '@/libs/util'
    import {
        buildDownloadUrl
    } from '@/libs/tools'
    import {
        mapActions
    } from 'vuex'
    export default {
        name: 'header-dropdown',
        data: () => {
            return {
                userInfo: '',
              employeeLastName:"",
              array:[
                "http://dev.gcb365.com/client/framework/framework.html#/home",
                "http://dev.gcb365.com/client/framework/framework.html#/announceList",
                "http://dev.gcb365.com/client/framework/framework.html#/inspectionList",
                "http://dev.gcb365.com/client/framework/framework.html#/reportList",
                "http://dev.gcb365.com/client/framework/framework.html#/qualityPlanList",
                "http://dev.gcb365.com/client/framework/framework.html#/securityPlanList",
                "http://dev.gcb365.com/client/framework/framework.html#/taskResponsible",
                "http://dev.gcb365.com/client/framework/framework.html#/approvalApply",
                "http://dev.gcb365.com/client/framework/framework.html#/projectManage",
                "http://dev.gcb365.com/client/framework/framework.html#/contractList",
                "http://dev.gcb365.com/client/framework/framework.html#/invoiceList",
                "http://dev.gcb365.com/client/framework/framework.html#/knowledgeList",
                "http://dev.gcb365.com/client/framework/framework.html#/checkAttendance",
                "http://dev.gcb365.com/client/framework/framework.html#/cloudEnterprise",
                "http://dev.gcb365.com/client/framework/framework.html#/logList",
                "http://dev.gcb365.com/client/framework/framework.html#/certificateList",
                "http://dev.gcb365.com/client/framework/framework.html#/laborNameList",
                "http://dev.gcb365.com/client/framework/framework.html#/purchaseApplyList",
                "http://dev.gcb365.com/client/framework/framework.html#/inventoryEntryList",
                "http://dev.gcb365.com/client/framework/framework.html#/supplierList",
                "http://dev.gcb365.com/client/framework/framework.html#/overview",
                "http://dev.gcb365.com/client/framework/framework.html#/customFormList",
                "http://dev.gcb365.com/client/framework/framework.html#/organizationManage",
              ]
            }
        },
        methods: {
            ...mapActions([
                'handleLogOut'
            ]),
            buildDownloadUrl(uuid) {
                return buildDownloadUrl(uuid)
            },
          openwindown(index){
              let url=this.array[index];
            window.open(url,"_self")
          },
            setting() {
                const self = this

            },
            loginOut() {
                const self = this
                self.handleLogOut().then(res => {
                    self.$router.push({
                        path: '/'
                    })
                })
            }
        },
        mounted() {
            const store = this.$store.state

        }
    }
</script>
<style scoped>
  .icon-check:before{
    content: "" !important;
  }
  .app-header .navbar-nav .dropdown-menu-left {
    right: 0;
    left: auto;
  }
  #framework-modules {
    width: 1120px;
    padding: 0 100px 30px 100px;
    clear: both;
    margin: 0 auto;
  }
  #framework-modules .module-item {
    width: 75px;
    height: 125px;
    margin: 10px 20px;
    float: left;
    cursor: pointer;
  }
  #framework-modules .module-icon .icon {
    width: 60px;
    height: 60px;
    display: inline-block;
  }
  #framework-modules .module-item .module-label {
    width: 75px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #BFC3C8;
  }
  #framework-modules .module-icon .icon {
    width: 60px;
    height: 60px;
    display: inline-block;
  }

  #framework-modules .module-icon .icon.icon-announce {
    background: url("images/icon/app/announce.png");
  }

  #framework-modules .module-icon .icon.icon-approval {
    background: url("images/icon/app/approval.png");
  }

  #framework-modules .module-icon .icon.icon-certificate {
    background: url("images/icon/app/certificate.png");
  }

  #framework-modules .module-icon .icon.icon-check {
    background: url("images/icon/app/check.png");
  }

  #framework-modules .module-icon .icon.icon-cloud {
    background: url("images/icon/app/cloud.png");
  }

  #framework-modules .module-icon .icon.icon-contract {
    background: url("images/icon/app/contract.png");
  }

  #framework-modules .module-icon .icon.icon-inspection {
    background: url("images/icon/app/inspection.png");
  }

  #framework-modules .module-icon .icon.icon-invoice {
    background: url("images/icon/app/invoice.png");
  }

  #framework-modules .module-icon .icon.icon-knowledge {
    background: url("images/icon/app/knowledge.png");
  }

  #framework-modules .module-icon .icon.icon-project {
    background: url("images/icon/app/project.png");
  }

  #framework-modules .module-icon .icon.icon-projectWorkLog {
    background: url("images/icon/app/projectWorkLog.png");
  }

  #framework-modules .module-icon .icon.icon-quality {
    background: url("images/icon/app/quality.png");
  }

  #framework-modules .module-icon .icon.icon-report {
    background: url("images/icon/app/report.png");
  }

  #framework-modules .module-icon .icon.icon-security {
    background: url("images/icon/app/security.png");
  }

  #framework-modules .module-icon .icon.icon-system {
    background: url("images/icon/app/system.png");
  }

  #framework-modules .module-icon .icon.icon-task {
    background: url("images/icon/app/task.png");
  }

  #framework-modules .module-icon .icon.icon-laborManage {
    background: url("images/icon/app/laborManage.png");
  }

  #framework-modules .module-icon .icon.icon-inventory {
    background: url("images/icon/app/inventory.png");
  }

  #framework-modules .module-icon .icon.icon-purchase {
    background: url("images/icon/app/purchase.png");
  }

  #framework-modules .module-icon .icon.icon-basicSetting {
    background: url("images/icon/app/basicSetting.png");
  }

  #framework-modules .module-icon .icon.icon-wisdom {
    background: url("images/icon/app/wisdom.png");
  }

</style>
