<template>
  <div>
    <a class="sub-nav-link"  :class='{"active":isActive}' :title="title" @click="click">
      <i :class="icon"></i> {{title}}
    </a>
  </div>
</template>

<script>
    export default {
        name: 'sub-sidebar-nav-link',
        props: {
            title: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            isActive:{
                type:Boolean,
                default:false,
            }
        },
        methods: {
            click(e) {
              //  $(e.target).addClass('active').parent().parent().siblings().find('.sub-nav-link').removeClass('active')
                this.$emit('click')
            }
        }
    }
</script>