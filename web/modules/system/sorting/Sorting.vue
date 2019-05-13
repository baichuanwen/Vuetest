<template>
  <div class="animated fadeIn">
    <Row>
        <Col span="6" class="sorting-left" v-show="tabType==='department'">
          <p>组织名称列表</p>
          <gcbDeparmentTree :data="treeData" @itemSelect="treeItemSelect"></gcbDeparmentTree>
        </Col>
        <Col span="6" class="sorting-left" v-show="tabType!=='department'">
          <p>职务名称列表</p>
          <gcbPosition :data="positionData" @itemSelect="itemSelect"></gcbPosition>
        </Col>
        <Col span="18" class="sorting-right">
          <Row type="flex" align="bottom" class="right-tool">
            <Col span="4"><Button type="default" icon="android-hand" size="large">手动排序</Button></Col>
            <Col span="16">
              <ButtonGroup>
                  <Button :type="(tabType==='department')?'primary':'default'" size="large" @click="depClick">组织</Button>
                  <Button :type="(tabType==='position')?'primary':'default'" size="large" @click="posClick">职务</Button>
                  <Button :type="(tabType==='employee')?'primary':'default'" size="large" @click="empClick">人员</Button>
              </ButtonGroup>
            </Col>
            <Col span="4">
                <Poptip placement="left-start">
                    <span>? 排序规则 </span>
                    <div class="right-rule" slot="content">
                        <div>员工排序规则：</div>
                        <div>1.首先按【部门排序】</div>
                        <div>2.同部门的员工按【职务排序】</div>
                        <div>3.同部门同职务的员工按【员工排序】</div>
                    </div>
                </Poptip>
            </Col>
          </Row>
          <Row v-if="tabType==='department'">
            <table class="gcb-table gcb-table-hover gcb-table-striped">
                <thead>
                  <tr>
                      <th>组织名称</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="eitem in listData">
                      <td if="eitem.departmentType === 1">{{eitem.departmentName}}</td>
                  </tr>
                </tbody>
            </table>
          </Row>
          <Row v-if="tabType==='position'">
            <table class="gcb-table gcb-table-hover gcb-table-striped">
                <thead>
                  <tr>
                      <th>职务名称</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="pitem in listData">
                      <td>{{pitem.positionName}}</td>
                  </tr>
                </tbody>
            </table>
          </Row>
          <Row v-if="tabType==='employee'">
            <table class="gcb-table gcb-table-hover gcb-table-striped">
                <thead>
                  <tr>
                      <th>人员名称</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="eitem in listData">
                      <td>{{eitem.employeeName}}</td>
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
        name: 'sorting',
        data() {
            return {
                tabType: 'department',
                listData: [],
                treeData: {},
                positionData: [],
                total: 0
            }
        },
        methods: {
            treeItemSelect(node) {
                // 获取选中节点的值
                console.log(node)
            },
            itemSelect(node) {
                const self = this
                if (self.tabType === 'position') return

                System.api.employee.query({
                    positionId: node.id
                }).then(employees => {
                    self.listData = employees
                });
            },
            depClick() {
                const self = this
                self.tabType = 'department'

                System.api.department.tree({}).then(department => {
                    self.treeData = department
                    self.listData = department.children
                });
            },
            posClick() {
                const self = this
                self.tabType = 'position'

                self.listData = self.positionData
            },
            empClick() {
                const self = this
                self.tabType = 'employee'

                System.api.employee.query({
                    positionId: self.positionData[0].id
                }).then(employees => {
                    self.listData = employees
                });
            }
        },
        mounted() {
            const self = this

            // 公司树结构
            System.api.department.tree({}).then(department => {
                self.treeData = department
                self.listData = department.children
            });

            // 职务结构
            System.api.position.query({}).then(positions => {
                self.positionData = positions
            });
        }
    }
</script>
<style lang="less" scoped>
    .sorting-right {
        .gcb-table {
            margin-top: 15px;
        }
        .gcb-table thead tr th,
        .gcb-table tbody tr td {
            padding: 8px 5px 8px 30px;
            border-top: 1px solid #ddd;
        }
        .right-tool {
            .ivu-col:nth-child(2) {
                text-align: center;
            }
            .ivu-col:nth-child(3) {
                text-align: right;
                .right-rule {
                    text-align: left;
                }
            }
        }
    }
</style>