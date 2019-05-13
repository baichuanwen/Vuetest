<template>
  <div class="sidebar">
    <!-- 模块设置 -->
    <SidebarHeader/>
    <!-- 模块 -->
    <nav class="sidebar-nav">
      <ul class="nav">
        <!-- 缩小 -->
        <SidebarMinimizer/>
        <SidebarApply></SidebarApply>
        <template>
          <Row>
            <Col span="8">
            <Menu :theme="theme2" ref="side_menu" :accordion="true" @on-open-change="onOpenChange" :open-names="openNames">
            <template  v-for="(item, index) in sidebar">
                <template v-if="item.children&&item.children.length>0">
                    <Submenu :name="item.title">
                    <template slot="title">
                        <i class="icon_position" :class="item.icon"></i>
                        {{item.title}}
                    </template>
                    <template v-if="item.children.length > 0" v-for="(sub, index) in item.children" :class="childrenItem">
                       <MenuItem :name="sub.title" v-if="sub.type === 'button'" @click.native="lableClick(sub)" :class='{"active":sub.isActive}'>
                        <span class="sub-nav-button" :title="sub.title">
                      <i class="fa" :class="sub.icon"></i> {{sub.title}}
                        </span>
                       </MenuItem>
                    <MenuItem :name="sub.title" v-else @click.native="lableClick(sub)" :class='{"active ivu-menu-item-active":sub.isActive}'>{{sub.title}}</MenuItem>
                     </template>
                        </Submenu>
                </template>
                <template v-else>
                <MenuItem :name="item.title" @click.native="lableClick(item)" :class='{"active ivu-menu-item-active":item.isActive}'>
                    <i class="icon_position" :class="item.icon" v-if="!item.isActive"></i>
                    <i class="icon_position" :class="item.icon+'-active'" v-else></i>
                    {{item.title}}
                </MenuItem>
              </template>
            </template>
        </Menu>
        </Col>
        </Row>
</template>
</ul>
</nav>

</div>
</template>
<script>
import Cookies from 'js-cookie'
import SidebarHeader from "./SidebarHeader";
import SidebarMinimizer from "./SidebarMinimizer";
import SidebarApply from "./SidebarAppy";
import { mapGetters } from "vuex";

export default {
  name: "sidebar",
  props: {
    // navItems: {
    //     type: Array,
    //     required: true,
    //     default: () => []
    // }
  },
  components: {
    SidebarHeader,
    SidebarMinimizer,
    SidebarApply
  },

  data() {
    return {
      subsidebar: {
        children: []
      },
      curSubItem: {},
      theme2: "dark",
      selected:"",
      openNames:[]
    };
  },
  computed: {
    ...mapGetters(["curNavItem", "sidebar"])
  },
  methods: {
    getCurItem() {
      let curItem = this.sidebar.find((item, index) => item.isActive);
      if (curItem) {
        this.curSubItem = curItem.children.find((item, index) => item.isActive);
        this.subsidebar = curItem;
      }
    },
    lableClick(item) {
      // 路由一样不刷新
      if (item.path == this.subsidebar.path) {
      } else {
        window.sessionStorage.clear();
        //this.subsidebar = item;
        this.getCurItem();
        this.$router.push({
          name: item.name
        })
      }
    },
    onOpenChange(name){
        //设置菜单展开子菜单的数组name
        localStorage.setItem('menu_opennames',name);
    }
  },
  mounted() {
    let open_names = localStorage.getItem('menu_opennames');
            if(open_names){
                this.openNames = [];
                this.openNames.push(open_names);
                this.$nextTick(()=>{
                    this.$refs.side_menu.updateOpened();
                })
            }
    this.getCurItem();
  }
}
</script>

<style lang="css" scoped>
.nav-link {
  cursor: pointer;
}
.icon_position {
  position: relative;
  left: 0;
  display: inline-block;
  width: 15px;
  height: 16px;
  top: 3px;
}
.ivu-menu-vertical .ivu-menu-submenu-title-icon {
  display: none;
}
.sub-nav-button {
  border: 1px solid rgba(255, 255, 255, 0.7);
  padding: 3px 10px;
  position: relative;
  left: -22px;
}
.active {
  background-color: #ffffff !important;
  color: #248bfe !important;
}
.icon-home {
  top: 0;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
  border: none;
  background-color: #252D39;
  color: rgba(255, 255, 255, 0.7);
}

.ivu-menu-dark.ivu-menu-vertical .active.ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
   border: none;
   background-color: #252D39;
   color: rgba(255, 255, 255, 0.7);
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item:hover {
  background-color: #ffffff !important;
  color: #248bfe;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active {
  background-color: #252D39 !important;
  color: rgba(255, 255, 255, 0.7);
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
  background-color: #ffffff !important;
  color: #248bfe;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .active.ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .active.ivu-menu-item-active:hover {
  background-color: #ffffff !important;
  color: #248bfe;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu .ivu-menu-item {
  padding-left: 66px !important;
}
.icon-home1 {
  background: url("../../../../static/img/icon/fun/home1.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-case {
  background: url("../../../../static/img/icon/fun/dashboard.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-dashboard {
  background: url("../../../../static/img/icon/fun/dashboard.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-announce {
  background: url("../../../../static/img/icon/fun/announce.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-approval {
  background: url("../../../../static/img/icon/fun/approval.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-certificate {
  background: url("../../../../static/img/icon/fun/certificate.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-attendance {
  background: url("../../../../static/img/icon/fun/attendance.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-cloud {
  background: url("../../../../static/img/icon/fun/cloud.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-contract {
  background: url("../../../../static/img/icon/fun/contract.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-inspection {
  background: url("../../../../static/img/icon/fun/inspection.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-invoice {
  background: url("../../../../static/img/icon/fun/invoice.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-knowledge {
  background: url("../../../../static/img/icon/fun/knowledge.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-project {
  background: url("../../../../static/img/icon/fun/project.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-projectworklog {
  background: url("../../../../static/img/icon/fun/projectworklog.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-quality {
  background: url("../../../../static/img/icon/fun/quality.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-report {
  background: url("../../../../static/img/icon/fun/report.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-security {
  background: url("../../../../static/img/icon/fun/security.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-system {
  background: url("../../../../static/img/icon/fun/system.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-task {
  background: url("../../../../static/img/icon/fun/task.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-labormanage {
  background: url("../../../../static/img/icon/fun/labormanage.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-inventory {
  background: url("../../../../static/img/icon/fun/inventory.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-purchase {
  background: url("../../../../static/img/icon/fun/purchase.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-basicsetting {
  background: url("../../../../static/img/icon/fun/basicsetting.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-wisdom {
  background: url("../../../../static/img/icon/fun/wisdom.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-home1-active {
  background: url("../../../../static/img/icon/fun/home1-active.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-wisdom-active {
  background: url("../../../../static/img/icon/fun/wisdom-active.png");
  background-repeat: no-repeat;
  background-position: center;
}
.icon-customForm-active {
  background: url("../../../../static/img/icon/fun/customForm-active.png");
  background-repeat: no-repeat;
  background-position: center;
}
</style>
