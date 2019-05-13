<template>
  <div style="border-bottom: 1px solid #ddd;text-align: center;">
    <button class="sub-nav-button" :title="title" @click="click">
        <i class="fa" :class="icon"></i> {{title}}
    </button>
  </div>
</template>

<script>
    export default {
        name: 'sub-sidebar-nav-button',
        props: {
            title: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            }
        },
        methods: {
            click(e) {
                this.$emit('click')
            }
        }
    }
</script>

<style lang="css">
    .sub-nav-button {
        display: inline-block;
        margin-bottom: 0;
        font-weight: normal;
        text-align: center;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        border-radius: 3px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: #248bfe;
        border-color: transparent;
        width: 160px;
        margin: 12px auto 15px;
        color: #fff;
    }
</style>