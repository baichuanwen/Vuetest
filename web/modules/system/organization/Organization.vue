<template>
  <div class="animated fadeIn">
    <Row>
        <Col span="6" class="organization-left">
          <gcbDeparmentTree :data="treeData" @itemSelect="treeItemSelect"></gcbDeparmentTree>
        </Col>
        <Col span="18" class="organization-right">
          <img class="right-banner" src="./images/banner1.png" alt="">
          <Row class="right-tool">
              <Button type="success" icon="plus" size="large" @click="addEmployee">添加员工</Button>
              <Button type="success" icon="plus" size="large">添加部门</Button>
              <Button type="primary" icon="ios-barcode" size="large">企业二维码</Button>
              <Button type="primary" icon="ios-compose" size="large">编辑部门</Button>
              <Button type="error" icon="trash-a" size="large">删除部门</Button>
          </Row>
          <Row class="right-search">
            <Col span="17">
              <Dropdown>
                  <Button type="default">
                      下拉菜单 <Icon type="arrow-down-b"></Icon>
                  </Button>
                  <DropdownMenu slot="list">
                      <DropdownItem>停用员工</DropdownItem>
                      <DropdownItem>启用员工</DropdownItem>
                  </DropdownMenu>
              </Dropdown>
              <Dropdown>
                  <Button type="default">
                      导入/导出 <Icon type="arrow-down-b"></Icon>
                  </Button>
                  <DropdownMenu slot="list">
                      <DropdownItem>导入Excel</DropdownItem>
                      <DropdownItem @click.native="exportExcel">导出Excel</DropdownItem>
                  </DropdownMenu>
              </Dropdown>
            </Col>
            <Col span="7">
              <Input v-model="postData.searchText" icon="ios-search" placeholder="姓名/账号/职务/手机"></Input>
            </Col>
          </Row>
          <Row>
            <table class="gcb-table gcb-table-hover">
                <thead>
                  <tr>
                      <th><label></label></th>
                      <th>姓名</th>
                      <th style="min-width: 60px;">性别</th>
                      <th>部门</th>
                      <th>职务</th>
                      <th>手机</th>
                      <th style="min-width: 210px;">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="eitem in listData">
                      <td width="30"></td>
                      <td>
                          <i class="company-owner" v-if="eitem.isCompanyOwner"></i>
                          {{eitem.employeeName}}
                      </td>
                      <td>{{eitem.gender == 1 ? "男" : "女"}}</td>
                      <td>{{eitem.department.departmentName}}</td>
                      <td>{{eitem.position.positionName}}</td>
                      <td>{{eitem.mobile}}</td>
                      <td>
                          <!--<button type="button" class="btn btn-sm btn-link" ng-click="employeeUpdateModal(employee)">编辑</button>
                          <button type="button" ng-if="!employee.isCompanyOwner&&!employee.isEnabled" class="btn btn-sm btn-link" ng-click="employeeEnableModal(employee)">启用</button>
                          <button type="button" ng-if="!employee.isCompanyOwner&&employee.isEnabled&&employee.id!=app.employee.id" class="btn btn-sm btn-link" ng-click="employeeDisableModal(employee)">停用</button>
                          <button type="button" ng-if="employee.isCompanyOwner&&employee.id==app.employee.id" class="btn btn-sm btn-link" ng-click="companyTransferModal(employee)">企业主转交</button>
                          <button type="button" ng-if="employee.isEnabled" class="btn btn-sm btn-link" ng-click="employeeDetailModal(employee)">详情</button>
                          <button type="button" ng-if="!employee.isCompanyOwner&&!employee.isEnabled" class="btn btn-sm btn-link" ng-click="employeeDeleteModal(employee)">删除</button>
                          <button type="button" class="btn btn-sm btn-link" ng-click="partPositionSettingModal(employee)">职务</button>-->
                      </td>
                  </tr>
                </tbody>
            </table>
            <Page class="gcb-page" :total="total" :current="postData.page" @on-change="changePage" show-total show-elevator ></Page>
          </Row>
        </Col>
    </Row>
  </div>
</template>

<script>
    import System from '../module'

    export default {
        name: 'organization',
        data() {
            return {
                postData: {
                    page: 1,
                    pageSize: 10,
                    isEnabled: true,
                    searchText: ''
                },
                listData: [],
                treeData: {},
                total: 0
            }
        },
        methods: {
            treeItemSelect(node) {
                // 获取选中节点的值
                console.log(node)
            },
            addEmployee() {
                require(['./EmployeeCreate.vue'], (modal) => {
                    console.log(modal)
                })
            },
            search() {
                const self = this
                System.api.employee.search(self.postData).then(result => {
                    self.listData = result.records
                    self.total = result.total
                })
            },
            exportExcel() {
                const self = this
                System.api.employee.export(self.postData).then(result => {
                    console.log(result)
                })
            },
            changePage(page) {
                this.postData.page = page
                this.search()
            }
        },
        mounted() {
            const self = this

            // 公司树结构
            System.api.department.tree({}).then(result => {
                self.treeData = result
            });

            // 员工信息
            System.api.employee.search(self.postData).then(result => {
                self.listData = result.records
                self.total = result.total
            })
        }
    }
</script>
<style lang="less" scoped>
    .organization-right {
        .right-banner {
            width: 100%;
            margin-bottom: 20px;
            cursor: pointer;
        }
        .right-tool {
            button {
                padding: 10px 16px;
                font-size: 18px;
                border-radius: 4px;
            }
        }
        .right-search {
            margin: 20px 0;
            input {
                width: 300px;
            }
        }
    }
</style>