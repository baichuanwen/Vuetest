<template>
    <ul class="gcb-position">
        <li class="tree-item" v-for="(item,i) in data" :key="i" @click="itemSelect(item)">
            <div class="tree-header" >
                <span>{{item.positionName}}</span>
            </div>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'gcb-position',
        props: {
            // 职务对象
            data: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        data() {
            return {}
        },
        methods: {
            // 返回当前点击部门对象数据
            itemSelect(item) {
                this.$emit('itemSelect', item)
            }
        }
    }
</script>
<style lang="less" scoped>
    .gcb-position {
        margin: 0;
        padding-right: 15px;
        list-style: none;
        .tree-item {
            border: none;
            padding: 0;
            margin: 0;
            width: 100%;
            list-style: none;
            cursor: pointer;
        }
        .tree-header {
            padding: 5px;
            width: 100%;
            i {
                color: #248bfe;
            }
            &.active {
                background: #F2F2F2;
            }
            &:hover {
                background: #F2F2F2;
            }
        }
    }
</style>