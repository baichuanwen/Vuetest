<template>
 <!-- <div class="modal-content">
    <div class="modal-header">
      <h4 class="modal-title text-center">创建共享文件夹</h4>
    </div>
    <div class="modal-body">
      <div class="main-title">
        <span class="font-16">请输入共享文件夹名称：</span>
      </div>
      <input type="text" class="form-control" maxlength="60" ng-model="request.name">
      <div class="clearfix">
            <span class="pull-right col-grey">
                <span class="col-939 font-12">{{request.name.length ||0}}/60</span>
            </span>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary btn-width-90" data-dismiss="modal" ng-click="create()">确定</button>
      <button type="button" class="btn btn-default btn-width-90  mar-left-5" ng-click="cancel()">取消</button>
    </div>
  </div>-->

  <b-modal id="readModal" size="lg"  class="w-700"   ref="gcbReadRecords" >
    <div slot="modal-header">创建共享文件夹</div>
    <div class="modal-content">
      <div class="modal-body clearfix newTypeModal">
        <div>请输入共享文件夹名称：</div>
        <div style="width: 100%;padding:10px 0 5px 0;">
          <input type="text" autofocus class="form-control" :maxlength="60" style="width: 100%;" v-model="request.name">
        </div>
        <div class="clearfix">
              <span class="text-danger" v-show="(request.name==''||request.name==undefined)&& toEditClassifyName">
                  {{subTitle}}
              </span>
          <span class="colGrey pull-right" style="color:#bdc7d2;">
                  {{subParam.categroyName.length||0}}/60
          </span>
        </div>
      </div>
    </div>
    <div slot="modal-footer">
      <Button type="primary" size="large" @click="handleAction(subParam.categroyName)">确定</Button>
      <Button type="default" size="large" @click="close">取消</Button>
    </div>
  </b-modal>
</template>

<script>
  export default {
   data(){
     return{}
   },
    methods:{
      open() {
        this.$refs.gcbReadRecords.show();
      },
      close() {
        this.$refs.gcbReadRecords.hide();
      },
      handleAction(button) {
        this.$emit('action', button)
      },
    },
    mounted(){

    }
  }
</script>
<style lang="less" scoped>
  .header{
    height: 60px;
    line-height: 60px;
  }
  .font-18{
    font-size: 18px;
  }
  .w90{
    width: 90px;
  }
  .form-control:focus {
    border-color: #0093dd;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(0, 147, 221, 0.6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(0, 147, 221, 0.6);
  }
  .ml5{
    margin-left: 5px;
  }
  .lh40{
    line-height: 40px;
  }
  .lh45{
    line-height: 45px;
  }
  .point{
    cursor: pointer;
  }
  .list{
    padding: 10px 20px;
    background-color: #fff;
    margin-bottom:10px;
  }
  .colGreen{
    color:#4aa55d;
  }
  .modal-content{
    border: none;
  }
  .colGrey{
    color: #939BA4;
  }
  .listHead .handle{
    float: left;
    width: 120px;
    height: 30px;
    line-height: 30px;
    background-color: #F8F8F8;
    border-radius: 15px;
    margin-top:5px;
    margin-left:60px;
  }
  .listHead .pull-right .colGreen{
    margin-right:40px;
  }
  .listHead .handle div{
    width: 50%;
    float: left;
    text-align: center;
  }
  .listContent{
    border-top:1px dashed #ddd;
  }
  .contentItem{
    font-size: 14px;
    padding:20px 0;
  }
  .contentItem .pull-right{
    position: relative;
  }
  .contentItem .pull-right span{
    float: left;
    width: 60px;
    text-align: center;
  }
  .contentItem .pull-right .line{
    position: absolute;
    right: 50%;
    height: 10px;
    top:5px;
    border-left:1px solid #e2e4e8;
  }
</style>
