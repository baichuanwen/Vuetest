<template>

    <b-nav-item-dropdown right no-caret class="avatar-box" >
      <slot slot="button-content">
          <span class="span-avatar">{{ userInfo.employeeName }}</span>
          <img v-if="userInfo.iconUuid" :src="buildDownloadUrl(userInfo.iconUuid)" class="img-icon">
          <span v-else class="radius-icon" v-text="employeeLastName"></span>
          <span class="caret"></span>
        </slot>
        <b-dropdown-item  @click="setting">
            个人设置
        </b-dropdown-item>
      <!--<i class="fa fa-user"></i>-->
      <b-dropdown-item  @click="openBindCustomerModal">
        工作台设置
      </b-dropdown-item>

        <b-dropdown-item @click="loginOut">
             退出
        </b-dropdown-item>
      <!--<i class="fa fa-lock"></i>-->
    </b-nav-item-dropdown>

</template>

<script>
  import Config from "@/config"
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
              employeeLastName:""
            }
        },
        methods: {
            ...mapActions([
                "getLoginData",
                'handleLogOut'
            ]),
            buildDownloadUrl(uuid) {
                return buildDownloadUrl(uuid)
            },
            setting() {
                let MessageCenterPage  = Config.host+ "client/framework/framework.html#/employeeHome"
                window.open(MessageCenterPage,"_self")
              },
            openBindCustomerModal(){
                let  homeSetting = Config.host+ "client/framework/framework.html#/homeSetting"
                 window.open(homeSetting,"_self")
            },
              loginOut() {
                const self = this
                self.handleLogOut().then(res => {
                //   window.open(Config.host+"client/login.html","_self")
                    self.$router.push({
                        path: '/'
                    })
                })
            }
        },
        mounted() {
              this.getLoginData().then((data)=> {
                this.userInfo = data.employee;
                this.employeeLastName=data.employee.employeeName||"";
                if(this.employeeLastName){
                  let lengths=this.employeeLastName.length;
                  this.employeeLastName=this.employeeLastName.charAt(lengths-1, 1)
                }
            });

        }
    }
</script>
<style scoped>
 .avatar-box {
   padding: 0 15px;
   height: 50px;
   line-height: 48px;
   font-size: 14px;
  }
 .avatar-box:hover,.avatar-box:active{
   color: #fff;
   background-color: #65aeff!important;
   border-color: #65aeff!important;
 }
 .img-icon {
    margin: 0 0px;
    width: 35px;
    height: 35px;
    border-radius: 25px;
  }
 .radius-icon {
   margin: 6px 0px;
   width: 35px;
   height: 35px;
    border-radius: 25px;
   line-height: 35px;
   display: inline-block;
   text-align: center;
   background-color: white;
   color: #248bfe;
 }
</style>
