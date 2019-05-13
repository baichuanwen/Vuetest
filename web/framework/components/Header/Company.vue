<template>

  <div class="header-company">
    <b-img :src="buildDownloadUrl(curCompany.logoUuid)" rounded="circle"   width="50" height="50"/>
    <b-nav-item-dropdown  no-caret class="avatar-box" >
      <slot slot="button-content">
        <span class="span-avatar">{{ curCompany.companyName }}</span>
      </slot>
      <b-dropdown-item v-for="(citem,index) in cusCompany"  @click="switchCom(citem)" :key="index">{{ citem.companyName }}</b-dropdown-item>
    </b-nav-item-dropdown>

  </div>

</template>

<script>
import { mapActions } from "vuex";
import { buildDownloadUrl } from "@/libs/tools";
import { getToken } from "@/libs/util";
import FrameWork from "../../module";
export default {
  name: "header-dropdown",
  data: () => {
    return {
      curCompany: {},
      cusCompany: []
    };
  },
  methods: {
    ...mapActions(["getCusCompany", "getLoginData"]),
    switchCom(item) {
      const self = this;
      self.curCompany = item;
      FrameWork.api.employee
        .loginCompany({
          companyId: item.id
        })
        .then(function(data) {
          self.getLoginData().then(res => {
            window.location.reload();
          });
        });
    },
    buildDownloadUrl(uuid) {
      return buildDownloadUrl(uuid);
    }
  },
  mounted() {
    // 获取公司
    this.getLoginData().then(data => {
      this.curCompany = data.company;
      this.getCusCompany().then(res => {
        this.cusCompany = this.cusCompany.concat(res);
      });
    });
  }
};
</script>
<style lang="less" scoped>
.header-company img {
  margin: 0 15px;
  float: left;
}
.avatar-box {
  padding: 0 15px;
  height: 50px;
  line-height: 48px;
  font-size: 14px;
}
.app-header.navbar .nav-item {
  float: left;
}
.avatar-box:hover,
.avatar-box:active {
  color: #fff;
  background-color: #65aeff !important;
  border-color: #65aeff !important;
}
.company-dropdown .button {
  color: #fff;
  background-color: transparent;
}
.header-company .dropdown-menu {
  height: 400px;
  overflow-y: auto;
}
</style>
