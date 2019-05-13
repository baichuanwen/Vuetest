<template>
  <header class="app-header navbar">
    <Company></Company>
    <!--&lt;!&ndash; 全屏 &ndash;&gt;-->
    <!--<button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">-->
      <!--<span class="navbar-toggler-icon"></span>-->
    <!--</button>-->
    <!-- 头像按钮 -->
    <b-navbar-nav class="ml-auto">
      <!-- 工程星盘入口 -->
      <b-nav-item class="d-md-down-none">
       <span>工程星盘</span>
      </b-nav-item>
      <!--全部应用 -->
        <allApp></allApp>
      <!--消息-->
        <Messages></Messages>
      <!-- 客服入口 -->
      <b-nav-item class="d-md-down-none" href="http://wpa.qq.com/msgrd?v=3&amp;uin=2891524572&amp;site=qq&amp;menu=yes" target="_blank">
       <span>客服</span>
      </b-nav-item>
      <!-- 头像 -->
      <Avatar></Avatar>
    </b-navbar-nav>
    <!--<button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">-->
      <!--<span class="navbar-toggler-icon"></span>-->
    <!--</button>-->
  </header>
</template>
<script>
    import Avatar from './Avatar.vue'
    import Company from './Company.vue'
    import allApp from './allApp.vue'
    import Messages from './Messages.vue'
    export default {
        name: 'c-header',
        components: {
            Company,
            Avatar,
          allApp,
          Messages
        },
        methods: {
            sidebarToggle(e) {
                e.preventDefault()
                document.body.classList.toggle('sidebar-hidden')
            },
            sidebarMinimize(e) {
                e.preventDefault()
                document.body.classList.toggle('sidebar-minimized')
            },
            mobileSidebarToggle(e) {
                e.preventDefault()
                document.body.classList.toggle('sidebar-mobile-show')
            },
            asideToggle(e) {
                e.preventDefault()
                document.body.classList.toggle('aside-menu-hidden')
            },

        },
      mounted(){


      },
    }
</script>
