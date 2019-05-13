<template>
  <div class="sidebar-heading">
    <span class="sidebar-heading-icon">
       <!-- <i class="glyphicon glyphicon-triangle-bottom"></i> -->
    </span>
    <span class="sidebar-heading-title">应用</span>
    <span class="sidebar-heading-manage">
       <i class="glyphicon glyphicon-cog" @click="modalOpen"></i>
    </span>
  </div>
</template>
<script>
  import {
    mapActions
  } from 'vuex'
export default {
  name: '',
  methods: {
    ...mapActions([
      'formSidebar',
    ]),
    modalOpen(){
      this.$gcb.gcbCustomModules.open({}).then(res=>{
        this.formSidebar();
      })
    }
  }
}
</script>
<style scoped>
.sidebar-heading {
    height: 40px;
    background: #252D39;
    line-height: 40px;
    position: relative;
    cursor: pointer;
    overflow: hidden;
  }
  .sidebar-heading-icon {
    display: inline-block;
    float: left;
    width: 22px;
    height: 40px;
    text-align: center;
  }
  .glyphicon {
    position: relative;
    top: -6px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .glyphicon-cog:before {
    opacity: 0;
    content: "\e019";
  }
.glyphicon-cog{
  width: 24px;
  height: 26px;
  background: url("./images/config.png") center no-repeat;
}
.glyphicon-triangle-bottom{
    width: 20px;
    height: 22px;
    background: url("./images/down-cio.png") center no-repeat;
}
.glyphicon-triangle-bottom:before {
    opacity: 0;
    content: "\e252";
}
 .sidebar-heading-title {
    display: inline-block;
    float: left;
    width: 80px;
    height: 40px;
    color: #fff;
    line-height: 40px;
    position: relative;
    cursor: pointer;
  }
 .sidebar-heading-manage {
    display: inline-block;
    float: left;
    height: 40px;
    width: 52px;
    text-align: right;
 }
</style>
