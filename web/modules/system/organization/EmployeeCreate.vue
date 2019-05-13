<template>
   <Modal>
        <Row solt="header" class="header"></Row>

        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>

        <Row solt="footer" class="footer"></Row>
    </Modal>
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
            }
        },
        mounted() {
            const self = this

            // 公司树结构
            System.api.department.tree({}).then(function(result) {
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