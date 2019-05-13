<template>
  <b-modal id="readModal" size="lg"  class="w-700"  ref="gcbReadRecord" >
    <div slot="modal-header">点赞记录</div>
    <Row>
      <Col span="24">
      <Input @click.native="searchBrowse()" @keyup.native.enter="searchBrowse()" autofocus v-model="searchText" style="margin-bottom: 10px;" icon="ios-search" placeholder="请输入用户姓名查询"></Input>
      </Col>
    </Row>
    <Row class="employ-tree">
      <div class="table-box">
        <table class="table table-striped table-hover ">
          <thead>
          <tr>
            <th class="text-left">部门</th>
            <th class="text-left">姓名</th>
            <th class="text-left">时间</th>
          </tr>
          </thead>
          <tbody>
          <tr  v-if="datas.length" v-for="data in datas">
            <td class="text-left">{{data.departmentName}}</td>
            <td class="text-left">{{data.employeeName}}</td>
            <td class="text-left" v-if="data.createTime">{{data.createTime | parseTime}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </Row>
    <div slot="modal-footer">
      <Button type="primary" class=" btn-primary btn-width-90" size="large" @click="close">关闭</Button>
    </div>
  </b-modal>
</template>
<script>
  import report from '../module'
  export default {
    name: "like-modal",
    data(){
      return{
        datas:[],
        searchText:null,
        workReportId:null,
      }
    },
    methods:{
      open(resault,id) {
        this.datas=resault;
        this.workReportId=id;
        this.$refs.gcbReadRecord.show();
      },
      close() {
        this.datas=[];
        this.workReportId=null;
        this.searchText=null;
        this.$refs.gcbReadRecord.hide();
      },
      searchBrowse(){
        if(this.searchText=="")this.searchText=null;
        let request = {workReportId:this.workReportId,employeeNameLike:this.searchText };
        report.api.report.praiseSearch(request).then((result)=>{
          this.datas=result;
        })
      },
    },
    mounted(){}
  }
</script>
<style lang="less" scoped>
  .table > thead > tr > th {
    border: 0;
    background: #e6e6e6;
    padding: 8px 15px;
    width: 33%;
  }
  .gcb-table tbody tr td {
    vertical-align: middle;
    font-size: 14px !important;
    padding: 12px 15px;
  }
  .text-left{
    padding-left: 15px;
  }
  #readModal .buttons {
    text-align: center;
    margin-bottom: 15px;
  }
  #readModal .modal-footer button {
    width: 90px;
    margin-left: 20px;
  }
  .readHistory {
    margin: 16px 0;
  }
  #readModal .active {
    background-color: #248bfe;
    color: #ffffff;
  }
  #readModal .table-box {
    height: 350px;
    overflow: auto;
  }
  #readModal .table tbody tr td {
    border-top: none;
  }
</style>
