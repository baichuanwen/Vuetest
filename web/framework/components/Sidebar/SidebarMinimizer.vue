<template>
  <div id="framework-sidebar-collapse">
    <i class="glyphicon glyphicon-menu-hamburger"></i>
  </div>
  <!-- @click="sidebarMinimize();brandMinimize();" -->
</template>
<script>

export default {
  name: 'sidebar-minimizer',
  methods: {
    sidebarMinimize () {
      document.body.classList.toggle('sidebar-minimized')
    },
    brandMinimize () {
      document.body.classList.toggle('brand-minimized')
    }
  }
}
</script>
<style scoped>
  .glyphicon {
    position: relative;
    top: -3px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    background: url("./images/ico.png") center no-repeat;
    height:24px;
    width: 25px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
 .sidebar-minimized #framework-sidebar-collapse {
    width: 50px;
    margin: 10px 0 0 0;
  }
  #framework-sidebar-collapse {
    height: 30px;
    width: 170px;
    margin: 10px 5px 0 5px;
    background: #42464E;
    color: #42464E;
    text-align: center;
    line-height: 30px !important;
    font-size: 18px;
    user-select: none;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    border-radius: 3px;
    margin-bottom: 5px;
  }
  .glyphicon-menu-hamburger:before {
    content: "\e236";
    opacity: 0;
  }

</style>
