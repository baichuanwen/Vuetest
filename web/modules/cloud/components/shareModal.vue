<template>
  <div>
    <b-modal class="" size="lg" ref="gcbModal" >
      <div slot="modal-header" class="text-left">设置共享成员及权限</div>
      <Row :gutter="16">
        <i-col span="6"><div>柏传文 </div></i-col>
        <i-col  push="6" span="4"><button @click="deparmentMSelect()">添加部门 </button></i-col>
        <i-col  push="8" span="4"><button @click="employeeMSelect()"> 添加人员</button></i-col>
      </Row>
      <div class="modal-body clearfix" style="height: 450px;overflow-y:auto ">
        <Row :gutter="16" v-if="!deparment.length&&!employee.length">
          <i-col>
            <div>
              <h3>共享成员</h3>
              <p class="allUser item"><Checkbox :checked.sync="single">全体成员</Checkbox> <i class="close"></i> </p>
            </div>
          </i-col>
        </Row>
        <Row :gutter="16">
          <Col class="content" v-show="!!deparment.length">
            <Table  :columns="columns4" :data="deparment" @on-selection-change="show" v-show="!!deparment.length">
              <template slot-scope="{ row, index }" slot="fullName">
                <p class="item"> <span class="cursor-pot" >{{row.departmentName}}</span> <i @click="deleteItem(deparment,index)"></i></p>
              </template>
            </Table>
          </Col>
          <Col class="content" v-show="!!employee.length">
            <Table  :columns="columnsEmployee" :data="employee" v-show="!!employee.length"   @on-selection-change="show">
              <template slot-scope="{ row, index }" slot="fullName">
                <p class="item"> <span class="cursor-pot" >{{row.employeeName}}</span> <i @click="deleteItem(employee,index)"></i></p>
              </template>
            </Table>
          </Col>
        </Row>
      </div>
      <div slot="modal-footer" style="width: 100%;">
        <i-col span="6"><Button type="primary" @click="selectAll" style="margin-right: 8px;" size="large">全选</Button></i-col>
        <!--<i-col  span="4"><Button type="primary" style="margin-right: 8px;" size="large">设置权限</Button></i-col>-->
        <i-col span="4"><Button type="error" @click="deleteItems()"  size="large">删除</Button></i-col>
        <i-col span="4"  push="8"><Button type="primary" @click="editShare()"  size="large">保存</Button></i-col>
        <i-col span="4" push="7"> <Button type="default" size="large" @click="close">取消</Button></i-col>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import cloud from "../module"
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        single:false,
        fromFloderId:null,
        columns4: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
            sortable: true
          },
          {
            title: '共享部门',
            key: 'fullName',
            slot:"fullName"
          }
        ],
        columnsEmployee: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
            sortable: true
          },
          {
            title: '共享人员',
            key: 'fullName',
            slot:"fullName"
          }
        ],
        deparment:[],
        employee:[]
      }
    },
    methods: {
      //选中项
      show(index){
        this.deparment.map((item)=>{
            index.map((iitem)=>{
              if(item.id==iitem.id){
                item._checked=true;
              }
            })
        });
        this.employee.map((item)=>{
          index.map((iitem)=>{
            if(item.id==iitem.id){
              item._checked=true;
            }
          })
        })
      },
      selectAll(){
        this.deparment.map((item,index)=>{
          this.$set(item,"_checked",false)
          this.$set(item,"_checked",true)
        });
        this.employee.map((item,index)=>{
          this.$set(item,"_checked",false)
          this.$set(item,"_checked",true)
        })
      },
      // 选择部门
      async deparmentMSelect() {
       let deparment = await this.$gcb.gcbDeparment.open({
          multiple:true
        })
         this.deparment=Object.values(deparment)
      },
      // 选择人员
      async employeeMSelect() {
        this.employee = await this.$gcb.gcbEmployee.open({
          // 单选多选模式
          multiple: true,
          isAuthData: false,
          isIncludeSelf: true,
          isIncludeDescendants: true,
          selectItem: this.employee
        });
        if(this.employee.length>=0){
          this.subRange=[];
          this.showRange=[];
          this.employee.map((item,index)=>{
            this.showRange.push(item.employeeName)
            this.subRange.push(item.id)
          })
          this.showRange= this.showRange.join(",");
        }
      },
      //确定
      editShare(){
        let fileUsers=[],fileDepartments=[];
        this.deparment.map((item)=>{
           fileDepartments.push({departmentId:(item.departmentId||item.id)})
        });
        this.employee.map(item=>{
          fileUsers.push({employeeId:(item.employeeId||item.id)})
        })
        cloud.api.editShare({
          id:this.fromFloderId,
          fileUsers,
          fileDepartments
        }).then(()=>{
           this.close();
           this.$emit("searchList")
        })

      },
      //shanchuxuanzhong
      deleteItems(){
        let temp1=[],temp2=[];
        this.deparment.map((item,index)=>{
         if(!item._checked){
           temp1.push(item)
         }
        });
        this.employee.map((item,index)=>{
          if(!item._checked){
            temp2.push(item)
          }
        });
        this.deparment=temp1;
        this.employee=temp2;
        this.$forceUpdate();
      },
      deleteItem(data,index){
        data.splice(index,1)
      },
      open(item) {
        this.$nextTick(_=>{
          this.$refs.gcbModal.show();
        })
        if(item){
          this.fromFloderId=item.id;
        }
        this.curItem={};
        this.breads=[];
      },
      close() {
        this.deparment=[];
        this.employee=[];
        this.$refs.gcbModal.hide()
      },
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  table{
    border: none !important;
  }
  tr{
    border:none !important;
  }
  td {
    cursor: pointer;
    padding: 10px;
    border: none;

    img{
      margin-right: 10px;
    }
  }
  td:hover{
    background: rgba(0,0,0,.1);
  }
  .item{

    position: relative;

    i{
      position: absolute;
      right: 20px;
      top: 5px;
      width: 20px;
      height: 20px;
      background: url("../cad.png")  center no-repeat;
      -webkit-background-size: 20px 20px;
      background-size: 20px 20px;
      display: none;
      z-index: 1000;
    }
    &:hover {
      i{
        display: block;
      }
    }
  }
</style>
