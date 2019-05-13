<template>
  <div class="animated fadeIn"  @refresh="refresh()" ref="editClassify">
    <div class="header">
      <div class="pull-right">
        <Button type="primary" size="large" @click="addClassify('main')">添加分类</Button>
      </div>
    </div>
    <div class="list" v-for="classify in classifys" v-if="classifys.length>0">
      <div class="listHead clearfix">
        <span class="font-18 lh40 pull-left">{{classify.categroyName}}</span>
        <span class="lh45 pull-left colGrey">&nbsp;({{classify.childs&&classify.childs.length||0}}条)</span>
        <div class="handle">
          <div class="text-success w90" @click="editClassify('main',classify)"><span class="point">编辑</span></div>
          <div class="text-danger w90" @click="createDeleteModal('main',classify)"><span class="point">删除</span></div>
        </div>
        <div class="pull-right">
            <span class="colGreen lh40 point" @click="addClassify('sub',classify)">
                <i class="fa fa-plus-circle font-18"></i>
                添加子分类
            </span>
          <span class="text-primary lh40 point">
                <span v-if="classify.showChild" @click="classify.showChild=false;">
                    收起&nbsp;<i class="fa fa-angle-up"></i>
                </span>
                 <span v-if="!classify.showChild" @click="classify.showChild=true;">
                    展开&nbsp;<i class="fa fa-angle-down"></i>
                </span>
            </span>
        </div>
      </div>
      <div class="listContent" v-if="classify.showChild">
        <div class="contentItem" v-for="c in classify.childs">
          {{c.categroyName}}
          <div class="pull-right">
            <span class="text-primary point w90" @click="editClassify('sub',c)">编辑</span>
            <div class="line"></div>
            <span class="text-danger point w90" @click="createDeleteModal('sub',c)">删除</span>
          </div>
        </div>
      </div>
    </div>
    <div class="gcb-data-null" v-if="classifys.length==0">
      <div class="text-center">
        <img src="./images/data-null.png" alt="">
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import knowledge from './module'
  import editClassifyModal from './editClassifyModal.vue'
    export default {
        name: "knowledge-classify",
        data(){
          return{
            classifys:[],
            indexs:[],
            editClassifyModal:null,
            modalOption:{
              subParam:{}
            },
            toNewClassifyName:false,
          }
        },
        methods:{
            refresh() {
              let  self =this;
              this.indexs = [];
              this.classifys.forEach(function(classify){
                if(classify.showChild){
                  self.indexs.push(classify.id);
                }
              });
              knowledge.api.classifyList({}).then(result=> {
                 if(!result.length){result=[]}
                self.classifys = result;
                self.classifys.forEach((item,index)=>{
                    if (this.indexs.indexOf(item.id) >= 0) {
                      this.$set(item, 'showChild', true)
                    } else {
                      this.$set(item, 'showChild', false)
                    }
                });
              })
            },
          chooseType(type,item){
              let self=this;
            if(type=="main"){
              self.modalOption={
                type:"add",
                title:"添加分类",
                subTitle:"请输入分类名称",
                subParam:{"categroyName":""},
              }
            }else if(type=="sub"){
              self.modalOption={
                type:"add",
                title:"添加子分类",
                subTitle:"请输子入分类名称",
                subParam:{"categroyName":"","parentId":item.id}
              }
            }
          },
            creatModal(type,item){
              return new Promise((resolve) => {
               let  self=this;
                const Modal = Vue.extend(editClassifyModal);
                self.editClassifyModal = new Modal({
                  data() {
                    return {
                      type: self.modalOption.type,
                      title: self.modalOption.title,
                      subTitle: self.modalOption.subTitle,
                      subParam: self.modalOption.subParam,
                      toEditClassifyName: self.toEditClassifyName
                    }
                  }
                })
                const component = self.editClassifyModal.$mount();
                document.body.appendChild(component.$el)
                self.editClassifyModal.$on('action', function (button) {
                  self.editClassifyModal.close();
                  setTimeout(() => {
                    document.body.removeChild(component.$el);
                  }, 500)
                  resolve(button)
                })
                self.editClassifyModal.open()
              })
            },

            addClassify(type,item){
              let self=this;
              this.chooseType(type,item)
              this.creatModal(type,item).then((categroyName)=>{
                self.modalOption.subParam.categroyName=categroyName;
                if(self.modalOption.subParam.categroyName==''||self.modalOption.subParam.categroyName==undefined){
                 return;
                }
                knowledge.api.createClassify(self.modalOption.subParam).then(()=>{
                      self.refresh()
                })
              })
            },
          editClassify(type,item){
            let self=this;
            if(type=="main"){
              self.modalOption={
                type:"edit",
                title:"编辑分类",
                subTitle:"请输入分类名称",
                subParam:{"categroyName":""},
              }
            }else if(type=="sub"){
              self.modalOption={
                type:"edit",
                title:"编辑子分类",
                subTitle:"请输子入分类名称",
                subParam:{"categroyName":""}
              }
            }
              this.$set(self.modalOption.subParam,"categroyName",item.categroyName)
              this.$set(self.modalOption.subParam,"id",item.id);
              this.creatModal(type,item).then((categroyName)=>{
                self.modalOption.subParam.categroyName=categroyName;
              if(self.modalOption.subParam.categroyName==''||self.modalOption.subParam.categroyName==undefined){
                return;
              }

              knowledge.api.updateClassify(self.modalOption.subParam).then(()=>{
                self.refresh()
              })
            })

          },
          // 删除模板
          async createDeleteModal (type,item) {
              if(type=="main"&& item.childs&&item.childs.length){
                  await  this.$gcb.tooltip.open({
                    title:"提示",
                    message:"请先删除子项 !",
                    icon:"warning",
                  })
                  return false;
              }else{
                  await  this.$gcb.gcbModal.open({
                    title:"提示",
                    content:"确定删除吗？删除后不可恢复。",
                    icon:"danger",
                  })
              }
              await knowledge.api.deleteClassify({id:item.id});
              await this.refresh(self.indexs);
          }
        },
        mounted(){
            this.refresh()
        },
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
