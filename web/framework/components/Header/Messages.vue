<template>
  <b-nav-item class="d-md-down-none" @click="openMessageCenterPage">
    <span>消息通知</span><span class="badge-top">{{count}}</span>
  </b-nav-item>
</template>

<script>
  import Config from "@/config"
  import FrameWork from '../../module'
    export default {
        name: 'header-dropdown',
        data(){
            return {
              count:0,
            }
        },
        methods: {
            openMessageCenterPage(){
              let  MessageCenterPage = Config.host+ "client/framework/framework.html#/messageCenter"
              window.open(MessageCenterPage,"_self")
            },
        },
        mounted() {
          FrameWork.api.message.count({
            isRead: false
          }).then((data)=> {

            if(typeof data=="Number" ){
              this.count=data;
            }else{
              this.count=0
            }
          });
        }
    }
</script>

