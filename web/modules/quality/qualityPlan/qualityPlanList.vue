<template>
  <div class="animated fadeIn">
      质量计划列表
    <div>
      <Button type="primary" @click="pageTransition(1)">新增</Button>
      <Button type="primary" @click="pageTransition(2)">编辑</Button>
      <Button type="primary" @click="pageTransition(3)">详情</Button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'quality-plan-list',
    data() {
      return {

      }
    },
    computed: {

    },
    mounted: function () {

    },
    methods: {
      pageTransition (type) {
        if (type == 1) {
          this.$router.push({name:"planAdd"})
        }
        if (type == 2) {
          this.$router.push({name:"planEdit"})
        }
        if (type == 3) {
          this.$router.push({name:"planDetail"})
        }
      }
    }
  }
</script>
<style lang="less">


</style>
