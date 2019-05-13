<template>
  <div class="header-item">
    <span class="col-grey font-14">汇报类型</span>
    <Select @on-change="typeToggle" v-model= "typeText" style="width:150px">
      <Option :value="type.name" v-for="(type,index) in types" :key="index" > {{type.name}}</Option>
    </Select>
  </div>
</template>
<script>
    export default {
        name: "report-type",
        data(){
          return{
            // 汇报类型切换
            types : [
              { type: null, name: "全部" },
              { type: 1, name: "日报" },
              { type: 2, name: "周报" },
              { type: 3, name: "月报" }
            ],
            typeText:null,
          }
        },
      props:["reportDatas"],
      methods:{
        typeToggle(name) {
          let item=this.types.find(item=>item.name==name);
          this.reportDatas.workReportType = item.type;
          this.reportDatas.typeText = item.name
        },
      }
    }
</script>

<style scoped>
  .col-grey[data-v-5dbaf044] {
    color: #939BA4;
  }
  .header-item > span {
    margin-right: 5px;
  }
</style>
