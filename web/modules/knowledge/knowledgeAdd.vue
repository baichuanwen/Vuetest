<template>
  <div class="animated fadeIn knowledge-container" >
    <Row class="announce-add-top">
      <Col span="12">&nbsp;</Col>
      <Col span="12">
        <Button type="primary" @click="addKnowLedge()" size="large">保存</Button>
        <Button type="default" @click="cancel('knowledgeList')" size="large">取消</Button>
      </Col>
    </Row>
    <Row class="knowledge-add-center">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="标题:" prop="title">
          <Input v-model="formValidate.title" :maxlength="100" placeholder="请输入标题"></Input>
        </Form-item>
        <Form-item label="分类:">
          <Input v-model="categroyName" readonly @on-focus="createChooseTypeModal()"  placeholder="请选择分类"></Input>
        </Form-item>
        <FormItem label="正文:" prop="content" style="margin-bottom: 15px">
          <gcbUeditor :placeholder="ueconfig.placeholder"   :content="content" :config="ueconfig.config" :id="ueconfig.id" ref="ue"></gcbUeditor>
        </FormItem>
        <FormItem label="可见范围:">
            <Input size="large" v-model="showRange"  icon="person"readonly @on-focus="employeeMSelect()"  placeholder="请选择可见人员"></Input>
            <p class="tip"><i class="fa fa-exclamation-circle"></i>&nbsp; 提示：未选择人员，默认为全体人员</p>
        </FormItem>
        <gcbUpload v-model="appendix" ></gcbUpload>
      </Form>
    </Row>
    <Row class="bottom-btns">
      <Col>
        <Button type="primary" size="large" @click="addKnowLedge()">保存</Button>
        <Button @click="cancel('knowledgeList')" size="large">取消</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import knowledge from './module';
  import {getToken}from"@/libs/util"
  import {
    buildDownloadUrl,
    getFileType,
    hasPermission,
    getFileSize,
    fileUploads
  } from "@/libs/tools";
  export default {
      name: 'announce-add',
      data() {
        return {
          chosenTypes:[],
          activeTypeItem:[],
          categroyName:'',
          chosenProcessId:'',
          knowledgeCategoryId:null,
          formValidate: {
            title: '',
            content: '',
          },
          ruleValidate: {
            title: [
                { required: true, message: '请输入标题', trigger: 'blur' }
              ],
            content: [
                { required: true, message: '请输入正文', trigger: 'blur' },
              ]
          },
          // 编辑器配置文件
           ue1: "ue1",
            ueconfig: {
              id: 'ue1',
              placeholder: '',
              config: {
                initialFrameWidth: null,
                initialFrameHeight: 200
              }
            },
            classify:null,
            editor:null,
             //add
            childCategoryId:null,
            content:'',
            viewEmployeeIds:null,
            subRange:null,
            showRange:null,
            appendix:null,
        }
      },
      methods: {
        // 选择类型
        async createChooseTypeModal() {
          this.chosenTypes= await knowledge.api.classifyList({});
          this.showTypes = await this.$gcb.gcbKnowledgeType.open({datas: this.chosenTypes, knowledgeCategoryId:this.knowledgeCategoryId});
          if(!this.showTypes.length){
            this.categroyName="";
            this.chosenTypeId=null;
            return;
          }
          this.showTypes.forEach(element => {
            this.categroyName =element.categroyName;
            this.knowledgeCategoryId=element.id;
          });
        },
        addKnowLedge () {
          let self=this;
          this.formValidate.content = UE.getEditor(self.ue1).getContent();
          if (this.formValidate.title == '' ) {
                self.$gcb.tooltip.open({message: "请输入标题", icon:"warning", timeout: 1000})
                 return;
            };
            if(self.formValidate.content == ''){
              self.$gcb.tooltip.open({message: "请输入正文",icon:"warning", timeout: 1000});
              return;
            }
            if(self.formValidate.content.length > 3001){
              self.$gcb.tooltip.open({
                icon: "warning",
                message: "知识内容不可超过3000字！"
              });
              return;
            }
            let subParam = {
              "title": self.formValidate.title,
              "knowledgeCategoryId":self.knowledgeCategoryId,
              "content": self.formValidate.content || null,
              "viewEmployeeIds": self.subRange || null,
              "attachment": self.appendix || null
            }
            knowledge.api.createKnowledge(subParam).then((result)=> {
              self.$gcb.tooltip.open({ message: "新建成功", timeout: 2000 })
              self.$router.push({name:"knowledgeList"});
            })
         },
        // 取消
        cancel(routerName) {
          this.$gcb.gcbModal.open({
            content:"确定放弃当前添加内容",
            icon:"unknown"
          }).then(()=>{
            this.$router.push({name:routerName})

          })
        },
        // 选择人员
        async employeeMSelect() {
            this.employee = await this.$gcb.gcbEmployee.open({
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
      },
      mounted(){

      },
}
</script>
<style lang="less" scoped>
  .container-fluid{
    padding-bottom: 150px;
  }
 .announce-add-top {
        font-size: 16px;
        margin-bottom: 10px;
        button {
            width: 90px;
        }
        div:last-child {
            text-align: right;
        }
 }
   .ivu-input {
     font-size: 14px !important;

   }
 .knowledge-add-center {
       background: #fff;
       padding: 15px 20px 20px;
       .left {
            width: 100px;
            position: relative;
            float: left;
            font-weight: 500;
        }
      .title {
          font-size: 16px;
          height: 14px;
          line-height: 14px;
          border-left: 3px solid #248bfe;
          padding-left: 10px;
          margin-bottom: 15px;
          color: #248bfe;
          span {
              color: #ec412b;
          }
      }
      .tip {
        margin: 0;
        padding-left: 2px;
        color: #F4A21B;
        padding-top: 0px;
        font-size: 14px;
      }
    }
  .bottom-btns{
    padding-top: 20px;
    button {
      width: 90px;
    }
  }
</style>
