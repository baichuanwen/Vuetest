<template>
  <Row>
    <Row>
      <h3>混合组建</h3>
      <Col>
      <myMixin></myMixin>
      </Col>
    </Row>
    <Row>
      <h3>过滤器</h3>
      <Col>
      <span class="upload_file-size col-f1">{{1234234234|getFileSize }}</span>
      </Col>
    </Row>

    <Row>
      <h3>人员</h3>
      <Col>
        <Button type="primary" @click="employeeSelect">选择人员（单选）</Button>
        <Button type="primary" @click="employeeAgainSelect" v-if="employee.id">选择人员（单选 && 传值）</Button>
        <Button type="primary" @click="employeeMSelect">选择人员（多选 删除还有点问题）</Button>
        <Button type="primary" @click="employeeMAgainSelect" v-if="employee.length>0">选择人员（多选 && 传值）</Button>
        <p> 返回值：{{ employee }} </p>
      </Col>
    </Row>
    <Row>
      <h3>部门</h3>
      <Col>
        <Button type="primary" @click="deparmentSelect">选择部门（单选）</Button>
        <Button type="primary" @click="deparmentAgainSelect" v-if="deparment.id">选择部门（单选 && 传值）</Button>
        <Button type="primary" @click="deparmentMSelect">选择部门（多选）</Button>
        <Button type="primary" @click="deparmentMAgainSelect">选择部门（多选 && 传值）</Button>
        <p> 返回值：{{ deparment }} </p>
      </Col>
    </Row>
    <Row>
      <h3>项目</h3>
      <Col>
        <Button type="primary" @click="projectSelect">选择项目（单选）</Button>
        <Button type="primary" @click="projectMultipleSelect">选择项目（多选）</Button>
        <Button type="primary" @click="projectMAgainSelect" v-if="project.length>0">选择项目（多选 && 传值）</Button>
        <Button type="primary" @click="projectAgainSelect" v-if="project.id">选择项目（单选 && 传值）</Button>
        <Button type="primary" @click="projectMultipleSelect">选择项目（多选）</Button>
        <Button type="primary" @click="projectMAgainSelect" v-if="project">选择项目（多选 && 传值）</Button>
        <p> 返回值：{{ project }} </p>
      </Col>
    </Row>
    <!--<Row>-->
      <!--<h3>供应商</h3>-->
      <!--<Col>-->
        <!--<Button type="primary">选择供应商（单选）未实现</Button>-->
      <!--</Col>-->
    <!--</Row>-->
    <Row>
      <h3>证书</h3>
      <Col>
        <Button type="primary" @click="certificateSelect">证书类型</Button>
        <Button type="primary" @click="certificateAgainSelect" v-if="certificate.length > 0">证书类型(传值)</Button>
        <p> 返回值：{{ certificate }} </p>
      </Col>
    </Row>
    <Row>
      <h3>合同</h3>
      <Col>
        <Button type="primary" @click="contractSelect">选择合同</Button>
        <Button type="primary" @click="contractAgainSelect" v-if="contract.id">选择合同(传值)</Button>
        <p> 返回值：{{ contract }} </p>
      </Col>
    </Row>
  </Row>
</template>
<script>
  const myMixin={
    template:'<h1>holle mixin</h1>',
    props:[],
    methods:{
      hello(){
        console.log('this is mixin')
      },
      say(){
        console.log('I am mixin(say)')
      }
    },
    mounted(){
      this.say();
    }
  };

  export default {
    name: 'gcbdevcase',
    mixins:[myMixin],
    components:{myMixin},
    data() {
      return {
        listData: [],
        // 单选人员
        employee: {},
        deparment: {},
        project: {},
        certificate: [],
        contract: {},
        projectMultiple: {},
        deparmentMultiple: {},
        projectsss: {}
      }
    },
    created(){

    },
    mounted() {
      this.hello();
    },
    update(){

    },
    beforeRouteUpdate(){

    },
    methods: {
      hello(){
        console.log('this is hello')
      },
      // 选择人员（单选）
      async employeeSelect() {
        this.employee = await this.$gcb.gcbEmployee.open({
          isAuthData: false,
          isIncludeSelf: true,
          isIncludeDescendants: true,
        })
      },
      async employeeAgainSelect() {
        this.employee = await this.$gcb.gcbEmployee.open({
          // 单选多选模式
          isAuthData: false,
          isIncludeSelf: true,
          isIncludeDescendants: true,
          selectItem: this.employee
        })
      },
      async employeeMSelect() {
        this.employee = await this.$gcb.gcbEmployee.open({
          // 单选多选模式
          multiple: true,
          isAuthData: false,
          isIncludeSelf: true,
          isIncludeDescendants: true,
        })
      },
      async employeeMAgainSelect() {
        this.employee = await this.$gcb.gcbEmployee.open({
          // 单选多选模式
          multiple: true,
          isAuthData: false,
          isIncludeSelf: true,
          isIncludeDescendants: true,
          selectItem: this.employee
        })
      },

      // 选择部门（单选）
      async deparmentSelect() {
        this.deparment = await this.$gcb.gcbDeparment.open()
      },
      async deparmentAgainSelect() {
        this.deparment = await this.$gcb.gcbDeparment.open({
          selectItem: this.deparment
        })
      },
      async deparmentMSelect() {
        this.deparment = await this.$gcb.gcbDeparment.open({
          multiple:true
        })
      },
      async deparmentMAgainSelect() {
        this.deparment = await this.$gcb.gcbDeparment.open({
          multiple:true,
          selectItem: this.deparment
        })
      },
      // 选择项目（单选）
      async projectSelect() {
        this.project = await this.$gcb.gcbProject.open({
          isAuthData: false,
          isSubCompanyProject: false,
          isIncludeCreatorProject: false,
          multiple: false
        })
      },
      async projectAgainSelect() {
        this.project = await this.$gcb.gcbProject.open({
          isAuthData: false,
          isSubCompanyProject: false,
          isIncludeCreatorProject: false,
          selectItem: this.project
        })
      },

      // 选择证书类型
      async certificateSelect() {
        this.certificate = await this.$gcb.gcbCertificate.open({})
      },
      async certificateAgainSelect() {
        this.certificate = await this.$gcb.gcbCertificate.open({
          selectItem: this.certificate
        })
      },

      // 选择合同
      async contractSelect() {
        this.contract = await this.$gcb.gcbContract.open({
          projectId: null,
          selectItem: null,
          tag: null //0:付款 1:收款
        })
      },
      async contractAgainSelect() {
        this.contract = await this.$gcb.gcbContract.open({
          projectId: null,
          selectItem: null,
          tag: null, //0:付款 1:收款,
          selectItem: this.contract
        })
      },

      // 选择项目（多选）
      async projectMultipleSelect() {
        this.project = await this.$gcb.gcbProject.open({
          isAuthData: false,
          isSubCompanyProject: false,
          isIncludeCreatorProject: false,
          multiple: true
        })
        console.log(typeof (this.project))
      },
      async projectMAgainSelect() {
        this.project = await this.$gcb.gcbProject.open({
          isAuthData: false,
          isSubCompanyProject: false,
          isIncludeCreatorProject: false,
          multiple: true,
          selectItem: this.project
        })
      },
      async projectsssSelect() {
        this.projectsss = await this.$gcb.gcbprojectsss.open({
          isAuthData: false,
          isSubCompanyProject: false,
          isIncludeCreatorProject: false
        })
      }
    },
    filters:{

    },
    computed:{

    },
    watch:{

    },




  }
</script>
