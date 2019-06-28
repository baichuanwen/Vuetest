<template>
  <div class="animated fadeIn">
    <Row>
      <i-col span="24">首页</i-col>
    </Row>
    <Row>
      <i-col span="4"><i-button type="primary">上传文件</i-button><i-button type="error">删除</i-button></i-col>
      <i-col span="16">1</i-col>
      <i-col span="4"><i-input icon="ios-clock-outline" placeholder="请输入..." style="width: 200px"></i-input></i-col>
    </Row>
    <Row>
      <i-table border :columns="columns4" :data="data1"></i-table>
    </Row>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="100" :current="1" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import cloud from '../module';
  export default {
    data() {
      return {
        pagesInfo:{
          pageNo: 1,
          pageSize: 15,
          condition: null,
          isRecord: false,
          type: null
        },
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
            sortable: true
          },
          {
            title: '文件名',
            key: 'fullName'
          },
          {
            title: '创建者',
            key: 'employeeName'
          },
          {
            title: '大小',
            key: 'sizeToString',
            sortable: true
          },
          {
            title: '创建时间',
            key: 'createTime',
            sortable: true
          },
          {
            title: '操作',
            key: 'address'
          }
        ],
        data1: [

        ]

      }
    },
  methods:{

    },
    created(){
    },
    mounted(){
      let _this=this;
      let param=this.pagesInfo;
      cloud.api.myFileSearch(param).then( res=>{
        console.log(res)
        _this.data1=res.records;
      })
    },
  }
</script>
<style lang="less" scoped >

  .mar-left-10{
    margin-left: 10px;
  }
  .width-200{
    width: 200px;
  }
  .header .operation {
    margin-top: 15px;
  }
  .mar-right-5 {
    margin-right: 5px;
  }
  .mar-5 {
    margin-top: 5px;
    margin-right: 10px;
  }
  .col-grey {
    color: #939BA4;
  }
  .header .title {
    font-size: 16px;
    margin-bottom: 20px;
    /*color: #666666;*/
  }
/*表格*/
  .table label {
    margin: 0;
  }

  .table tbody .rename {
    display: inline-block;
  }

  .table tbody .rename input {
    display: inline-block;
    width: auto;
  }

  .table tbody .img-box {
    display: inline-block;
    height: 30px;
    width: 30px;
  }

  .table tbody .img-box img {
    height: 100%;
    width: 100%;
  }

  .table tbody tr td {
    line-height: 30px;
    border-top: none;
  }

  .table tbody tr td:nth-child(1), .table thead tr th:nth-child(1) {
    width: 50px;
  }

  .table tbody tr td:nth-child(2), .table thead tr th:nth-child(2) {
    padding-left: 15px;
  }

  .table tbody tr td:nth-child(3), .table thead tr th:nth-child(3) {
    padding-left: 25px;
  }

  .date-img {
    margin-left: 5px;
  }
  /*操作选项ui调整4.0*/
  .handle-wrap {
    position: relative;
  }

  .handle-wrap div {
    display: inline-block;
  }

  .handle-wrap .more img {
    z-index: -1;
  }

  .handle-wrap .download {
    padding-right: 10px;
  }

  .handle-wrap .handle {
    position: absolute;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
  .handle-wrap .handle {
    text-align: center;
    width: 100px;
    /*padding: 5px 30px;*/
    z-index: 999;
    border-radius: 5px;
    border: 1px solid #e2e4e9;
  }
  .position {
    margin-left: 37px;
  }
  .text-primary:hover {
    /*display: inline-block;*/
    /*text-decoration: underline;*/
    background-color: #edf0f5;
    color: #248bfe;
  }
  .isShow{
    visibility: hidden;
  }

</style>
