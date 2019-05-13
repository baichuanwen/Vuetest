<template>
  <div class="app">
    <!-- Header -->
    <AppHeader/>
    <div class="app-body">
      <!-- Sidebar -->
      <Sidebar/>
      <main class="main">
        <!-- Breadcrumb/面包屑 -->
        <!--<div class="breadcrumb-fixed">
          <Breadcrumb :list="list"/>
        </div>-->
        <!-- Main -->
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <!-- AppAside -->
      <!--<AppAside/>-->
    </div>
  </div>
</template>

<script>
    import {
        Header as AppHeader,
        Sidebar,
        Aside as AppAside,
        Breadcrumb
    } from './components/'
    import {
        mapActions
    } from 'vuex'
    export default {
        name: 'full',
        components: {
            AppHeader,
            Sidebar,
            AppAside,
            Breadcrumb
        },
        data() {
            return {
                sidebar: []
            }
        },
        methods: {
           ...mapActions([
                'formSidebar',
                'getCurNavItem',
                'getLoginData'
            ]),
        },
        computed: {
            name() {
                return this.$route.name
            },
            list() {
                return this.$route.matched
            }
        },
        watch: {
          $route(to){
            const self = this;
            //self.getCurNavItem(self.$route.path);
            self.getCurNavItem(self.$route);
            // 初始化sidebar
            self.formSidebar().then(res => {
                self.sidebar = res;
            })
          }
        },
        created() {
            const self = this
             //self.getCurNavItem(self.$route.path);
            self.getCurNavItem(self.$route);
            // 初始化sidebar
            self.formSidebar().then(res => {
                self.sidebar = res
            })


            // localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem("userMsg"))));

            // //在页面刷新时将vuex里的信息保存到localStorage里
            // window.addEventListener("beforeunload", () => {
            //     localStorage.setItem("userMsg", JSON.stringify(this.$store.state))
            // })
        }
    }
</script>

