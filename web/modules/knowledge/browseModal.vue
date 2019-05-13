<template>
  <b-modal id="readModal" size="lg"  class="w-700"  ref="gcbReadRecord" >
    <div slot="modal-header">浏览记录</div>
    <Row>
      <Col span="24">
        <Input @click.native="searchBrowse()" @keyup.native.enter="searchBrowse()" autofocus v-model="searchText" style="margin-bottom: 10px;" icon="ios-search" placeholder="请输入用户姓名查询"></Input>
      </Col>
    </Row>
    <Row type="flex" :gutter="8" justify="center" align="bottom" class="code-row-bg readHistory">
      <Col span="4" style="margin-right:12px"><i-button :class="{ active: isRead == null }" @click="isRead = null;search(isRead)" size="large">全部（{{browser.allBrowse.length}}）</i-button></Col>
      <Col span="4"><i-button v-bind:class="{ active: isRead == '1' }" @click="isRead = '1';search(isRead)" size="large">已读（{{browser.isBrowse.length }}）</i-button></Col>
      <Col span="4"><i-button :class="{active: isRead == '2' }" @click="isRead = '2';search(isRead)" size="large">未读（{{browser.noBrowse.length}}）</i-button></Col>
    </Row>
    <Row class="employ-tree">
      <div class="table-box">
        <table class="gcb-table gcb-table-hover gcb-table-striped">
          <thead>
          <tr>
            <th class="text-left">部门</th>
            <th class="text-left">姓名</th>
            <th class="text-left">时间</th>
          </tr>
          </thead>
          <tbody>
          <tr  v-for="(data,index) in datas" :key="index">
            <td class="text-left">{{data.department?data.department.departmentName:"--"}}</td>
            <td class="text-left">{{data.employeeName||"--"}}</td>
            <td class="text-left" v-if="!data.createTime">未读</td>
            <td class="text-left" v-if="data.createTime">{{data.createTime | parseTime}}</td>
          </tr >
          </tbody>
        </table>
      </div>
    </Row>
    <div slot="modal-footer">
      <Button type="primary" size="large" @click="close">关闭</Button>
    </div>
  </b-modal>
</template>
<style lang="less" scoped>
  .table > thead > tr > th {
    border: 0;
    background: #e6e6e6;
    padding: 0px 15px;
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

<script>
  import knowledge from './module'
    export default {
        name: "browse-modal",
         data(){
          return{
            datas:{},
            searchText:"",
            isRead:null,
            browser:{
              allBrowse:[],
              isBrowse:[],
              noBrowse:[]
            },
            queryId:null,
          }
      },
      methods:{
          open() {
             this.$refs.gcbReadRecord.show();
          },
          close() {
              this.$refs.gcbReadRecord.hide();
              this.searchText="";
          },
          search() {
              if(this.isRead ==null){
                this.datas=this.browser.allBrowse;
              }
              else if(this.isRead=="1"){
                this.datas= this.browser.isBrowse
              }
              else if(this.isRead=='2'){
                this.datas=this.browser.noBrowse
              }
          },
        async searchBrowse(){
            this.browser= await knowledge.api.knowledgeBrowse({ "employeeName": this.searchText || null, "id": this.queryId });
            this.browser=Object.assign({allBrowse:[], isBrowse:[], noBrowse:[]}, this.browser);
            this.datas=self.browser;
            this.search();
        },
      },

      watch:{
          modalShow:function (val) {
              this.open()
          }
      },
      mounted(){
        this.searchBrowse();
      }


    }
</script>


