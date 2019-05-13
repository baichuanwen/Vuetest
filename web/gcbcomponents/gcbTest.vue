<template>
  <div class="gcb-test">
    <div class="test-icon" @click="goTest"><slot></slot></div>
  </div>
</template>
<script>
    export default {
        props: {
            share: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                // api: this.$store.state.api,
                // store: this.$store.state,
            }
        },
        methods: {
            goTest() {
                alert('这是工程宝自定义组件引用测试！')
            }
        },
        mounted() {
            const self = this
        }
    }
</script>
<style lang="less">
    .gcb-test {
        position: relative;
    }
    
    .gcb-test .test-icon {
        height: 3rem;
        width: 3rem;
        margin: 0 auto;
        position: relative;
        /*background-image: url(../../../../static/images/icon/app-test.png);*/
        background-repeat: no-repeat;
        background-size: 2.2rem;
        background-position: center;
    }
    
    .gcb-test .test-list {
        display: none;
        width: 10.8rem;
        position: absolute;
        margin-top: 1.2rem;
        right: 0rem;
        background-color: #333;
        border-radius: 0.5rem;
        z-index: 99;
    }
    
    .gcb-test .test-list li {
        height: 4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 0.5rem;
        padding-left: 2rem;
        padding-right: 1rem;
    }
    
    .gcb-test .test-list li .msg-count {
        border-radius: 50px;
        padding: 0px 0.5rem;
        background-color: #ff0000;
    }
    
    .gcb-test .test-list li:hover,
    .gcb-test .test-list li:active {
        background-color: #831e83;
    }
    
    .gcb-test .test-list::before {
        content: '';
        position: absolute;
        top: -0.8rem;
        right: 0.6rem;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #333;
        border-left: 8px solid transparent;
    }
</style>