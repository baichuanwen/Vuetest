<template>
  <Breadcrumb style="cursor: pointer">
    <Breadcrumb-item @click.native="gobreadFrontFloader()">上一页</Breadcrumb-item>
    <Breadcrumb-item @click.native="goIndex()">首页</Breadcrumb-item>
    <Breadcrumb-item  v-for="(item,index) in breads" :key="index" @click.native="gobreadFloader(item)" >{{item.name}}</Breadcrumb-item>
  </Breadcrumb>
</template>

<script>
  export default {
   data(){
     return{
       sharePubName:"",
       isnull:false,
     }
   },
    computed:{
      breads:function () {
        return this.$store.state.cloud.breads;
      }
    },
    methods:{
      gobreadFloader(item){
        this.$store.commit("setCurItem",item)
        this.breads.forEach((iitem,index)=>{
          if(iitem.id==item.id){
            this.breads.splice(index + 1);
            this.$emit("searchList",JSON.stringify(item))
          }
        })
      },
      gobreadFrontFloader(){
        let length=this.breads.length
        if(length>1){
          let frontBread=this.breads[length-2]
          this.gobreadFloader(frontBread)
        }else{
          this.goIndex()
        }
      },
      goIndex(){
        this.$router.push({name:"CloudEnterprise"})
      },
    },
    mounted(){

    }
  }
</script>
<style lang="less" scoped>

  .ml5{
    margin-left: 5px;
  }

  .point{
    cursor: pointer;
  }

</style>
