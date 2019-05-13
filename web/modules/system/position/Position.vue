<template>
  <div class="animated fadeIn">
    <Row>
        <Col span="6" class="position-left">
          <p>职务名称列表</p>
          <gcbPosition :data="positionData" @itemSelect="itemSelect"></gcbPosition>
        </Col>
        <Col span="18" class="position-right">
          <Row class="right-tool">
            <Col>
              <Button type="success" icon="plus" size="large">添加职务</Button>
              <Button type="primary" icon="ios-compose" size="large">编辑职务</Button>
              <Button type="error" icon="trash-a" size="large">删除职务</Button>
            </Col>
            <Col>
              <table class="table">
                <tbody>
                <tr class="active">
                    <td width="100" align="right">职务名称：</td>
                    <td width="100">{{activePosition.positionName}}</td>
                    <td width="100" align="right">人数统计：</td>
                    <td>{{activePosition.employees.length}}</td>
                </tr>
                <tr class="active">
                    <td width="100" align="right">职务描述：</td>
                    <td colspan="3"><div style="width: 400px;">{{activePosition.description}}</div></td>
                </tr>
                </tbody>
              </table>
            </Col>
            <Col>
              <ButtonGroup>
                  <Button :type="(tabType==='position')?'primary':'default'" size="large" @click="tabType='position'">职务权限</Button>
                  <Button :type="(tabType==='employee')?'primary':'default'" size="large" @click="tabType='employee'">查看人员</Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row v-if="tabType==='position'">
            <table class="gcb-table gcb-table-hover gcb-table-striped">
                <thead>
                  <tr>
                      <th>应用名称</th>
                      <th>权限</th>
                      <th>权限描述</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="pitem in listPosData">
                      <td>{{pitem.permissionModuleName}}</td>
                      <td> <div v-for="permission in pitem.permissions" v-show="posHasPermission(permission)">{{permission.permissionName}}</div> </td>
                      <td> <div v-for="permission in pitem.permissions" v-show="posHasPermission(permission)">{{permission.description}}</div> </td>
                  </tr>
                </tbody>
            </table>
          </Row>
          <Row v-if="tabType==='employee'">
            <table class="gcb-table gcb-table-hover gcb-table-striped">
                <thead>
                  <tr>
                      <th>序号</th>
                      <th>组织名称</th>
                      <th>部门</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(eitem,index) in listEmpData" :key="index">
                      <td>{{index + 1}}</td>
                      <td>{{eitem.employeeName}}</td>
                      <td>{{eitem.department.departmentName}}</td>
                  </tr>
                </tbody>
            </table>
          </Row>
        </Col>
    </Row>
  </div>
</template>
<script>
    import System from '../module'
    export default {
        name: 'position',
        data() {
            return {
                tabType: 'employee',
                // 职位列表
                positionData: [],
                // 所有权限列表
                listPosData: [],
                // 当前职位权限
                posPermissionData: {},
                // 人员列表
                listEmpData: [],
                // 当前职位
                activePosition: {
                    positionName: '',
                    employees: []
                }
            }
        },
        methods: {
            itemSelect(node) {
                const self = this

                // 职务统计人数
                System.api.position.employees({
                    id: node.id
                }).then(employees => {
                    self.activePosition.employees = employees
                    self.activePosition = Object.assign(self.activePosition, node)
                })

                System.api.position.permissions({
                    id: node.id
                }).then(permissions => {
                    // 清空当前职务权限
                    self.posPermissionData = {}
                    permissions && permissions.forEach((permission, index) => {
                        self.posPermissionData[permission.id] = permission
                    })
                })

                System.api.employee.query({
                    positionId: node.id
                }).then(employees => {
                    self.listEmpData = employees
                })
            },
            posHasPermission(permission) {
                return !!this.posPermissionData[permission.id]
            }
        },
        mounted() {
            const self = this

            System.api.permission.tree({}).then(permissions => {
                self.listPosData = permissions
            })

            // 职务结构
            System.api.position.query({}).then(positions => {
                self.positionData = positions

                // 职务统计人数
                System.api.position.employees({
                    id: positions[0].id
                }).then(employees => {
                    self.activePosition.employees = employees
                    self.activePosition = Object.assign(self.activePosition, positions[0])
                })

                // 默认职务权限
                System.api.position.permissions({
                    id: positions[0].id
                }).then(permissions => {
                    permissions && permissions.forEach((permission, index) => {
                        self.posPermissionData[permission.id] = permission
                    })
                })

                // 默认职务人员
                System.api.employee.query({
                    positionId: positions[0].id
                }).then(employees => {
                    self.listEmpData = employees
                })
            })
        }
    }
</script>
<style lang="less" scoped>
    .position-left {
        padding-right: 15px;
        p {
            border-bottom: 2px solid #e2e4e8;
            padding: 5px;
            margin-bottom: 2px;
        }
        .gcb-position {
            .tree-item {
                color: #939ba4;
                padding-top: 10px;
                padding-bottom: 10px;
                cursor: pointer;
            }
        }
    }
    
    .position-right {
        .gcb-table {
            margin-top: 15px;
        }
        .gcb-table thead tr th,
        .gcb-table tbody tr td {
            padding: 8px 5px 8px 30px;
            border-top: 1px solid #ddd;
        }
        .right-tool {
            .ivu-col:nth-child(1) {
                button {
                    padding: 10px 16px;
                    font-size: 18px;
                    line-height: 1.3333333;
                    border-radius: 4px;
                }
            }
            .ivu-col:nth-child(2) {
                font-size: 12px;
                margin: 15px 0 20px;
                border: 1px solid #e2e4e8;
                background-color: #f5f5f5;
                border-top: 1px solid #0093dd;
                &table {
                    margin-bottom: 0;
                }
                .table th,
                .table td {
                    border-top: 0;
                }
            }
            .ivu-col:nth-child(3) {
                /*text-align: right;*/
            }
        }
    }
</style>