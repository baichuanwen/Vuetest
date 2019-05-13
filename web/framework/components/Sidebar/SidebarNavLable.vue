<template>
  <div>
    <!-- <a class="nav-link" :title="item.title" :class='{"active":isActive}' @click="click">
      <i :class="item.icon"></i> {{item.title}}
      <b-badge v-if="item.badge && item.badge.text" :variant="item.badge.variant">{{item.badge.text}}</b-badge>
    </a> -->
    <Row>
         <Col span="7">
            <Menu :theme="theme2" :open-names="['1']" accordion>
                <Submenu name="1">
                    <template slot="title">
                         <i class="icon_position" :class="item.icon"></i> {{item.title}}
                    </template>
                    <MenuItem name="1-1">文章管理</MenuItem>
                    <MenuItem name="1-2">评论管理</MenuItem>
                    <MenuItem name="1-3">举报管理</MenuItem>
                </Submenu>
            </Menu>
        </Col>
    </Row>
  </div>
</template>

<script>
    export default {
        name: 'sidebar-nav-link',
        props: {
            item: {
                type: Object,
                default: () => {
                    return {
                        title: '标题',
                        icon: '',
                        badge: {
                            text: '',
                            variant: ''
                        }
                    }
                }
            },
            index: {
                type: Number,
                default: () => {
                   
                }
            },
            isActive:{
                type:Boolean,
                default:false
            }
        },
        data () {
            return {
                theme2: 'dark'
            }
        },
        methods: {
            click(e) {
               // $(e.target).addClass('active').parent().parent().siblings().find('.nav-link').removeClass('active')
                this.$emit('click')
            }

        }
    }
</script>

