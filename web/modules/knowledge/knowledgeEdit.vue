<template>
  <div class="animated fadeIn knowledge-container" >
    <Row class="announce-add-top">
      <Col span="12">&nbsp;</Col>
      <Col span="12">
      <Button type="primary" @click="updateKnowLedge()" size="large">保存</Button>
      <Button type="default" size="large" @click="cancel('myKnowledge')">取消</Button>
      </Col>
    </Row>
    <Row class="knowledge-add-center">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <Form-item label="标题:" prop="title">
          <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
        </Form-item>
        <Form-item label="分类:">
          <Input v-model="categroyName" readonly @on-focus="createChooseTypeModal()"  placeholder="请选择分类"></Input>
        </Form-item>
        <FormItem label="正文:" style="margin-bottom: 15px" prop="content">
          <gcbUeditor :placeholder="ueconfig.placeholder"   :content="content" :config="ueconfig.config" :id="ueconfig.id" ref="ue"></gcbUeditor>
        </FormItem>
        <FormItem label="可见范围:">
          <Input size="large" v-model="showRange"  icon="person"readonly @on-focus="employeeMSelect()"  placeholder="请选择可见人员"></Input>
          <p class="tip"><i class="fa fa-exclamation-circle"></i>&nbsp; 提示：未选择人员，默认为全体人员</p>
        </FormItem>
        <gcbUpload :attachment="attachment" v-model="appendix" ></gcbUpload>
      </Form>
    </Row>
    <Row class="bottom-btns">
      <Col>
      <Button type="primary" size="large" @click="updateKnowLedge()">保存</Button>
      <Button @click="cancel('myKnowledge')" size="large">取消</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import knowledge from './module';
  import {
    buildDownloadUrl,
    getFileType,
    hasPermission,
    getFileSize
  } from "@/libs/tools";
  export default {
    name: 'announce-add',
    data() {
      return {
        // 上传
        files:[],
        appendix:[],
        chosenTypes:[],
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
        rangIds:[],
        editor:null,
        range:[],
        attachment:[]
      }
    },
    methods: {
      getknowledgeDetails(){
        knowledge.api.knowledgeDetails({ id: this.$route.params.id }).then((result)=> {
          let  self=this;
          self.attachment=result.attachment || [];
          self.editor = UE.getEditor("ue1");
          result.employeeList = result.employeeList || [];
            this.showRange=[];
            result.employeeList.forEach(function(emp) {
              self.showRange.push(emp.employeeName);
              self.rangIds.push(emp.id);
              self.range.push({ employeeName: emp.employeeName, id: emp.id });
            });
            if (this.rangIds.length == 0) {
              self.rangIds = null;
            } else {
              self.showRange = this.showRange.join(",");
            }
          self.formValidate.title=result.title;
          self.editor.ready(function () {
            setTimeout(()=>{
              self.editor.setContent(result.content); // 确保UE加载完成后，放入内容。
            },500)
          });

          if(result.childCategory&&result.childCategory.categroyName){
            self.categroyName=result.childCategory.categroyName
          }
        })
      },
      // 选择类型
      async createChooseTypeModal() {
        this.chosenTypes= await knowledge.api.classifyList({});
        this.showTypes = await this.$gcb.gcbKnowledgeType.open({datas: this.chosenTypes});
        this.showTypes.forEach(element => {
          this.categroyName =element.categroyName;
          this.knowledgeCategoryId=element.id;
        });
      },
      updateKnowLedge() {
        let self=this;
         this.formValidate.content = UE.getEditor(self.ue1).getContent();
         console.log(this.formValidate.content)
         if (self.formValidate.title == '' ) {
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
           "attachment": self.appendix || null,
           "id":self.$route.params.id
         }
        knowledge.api.updateKnowledge(subParam).then(()=> {
            this.$gcb.tooltip.open({ message: "编辑成功", timeout: 1000 })
            this.$router.push({name:"myKnowledge"})

         });
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
    },
    mounted(){
      this.getknowledgeDetails()
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
      font-size: 14px;
      padding-left: 2px;
      color: #F4A21B;
      padding-top: 0px;
    }
  }
  .bottom-btns{
    padding-top: 20px;
    button {
      width: 90px;
    }
  }
  /*上传附件*/
  .upload_btn{
    margin-top: 5px;
  }

  .upload_img-box{
    height: 80px;
    width: 80px;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
  }

  .upload_text-box{
    margin-bottom: 15px;
  }

  .upload_img-delete{
    position: absolute;
    top: 0;
    right: 0;
    font-size: 19px;
    color: #CCCCCC;
  }

  .upload_img-delete.active{
    color: red;
  }

  .upload_file-size{
    margin-left: 15px;
  }

  .upload_file-delete{
    margin-left: 15px;
  }
</style>
