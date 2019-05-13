<template>
    <div>
      <b-modal class="" size="" ref="gcbModal">
        <div slot="modal-header" class="text-left">{{options.title}}</div>
        <Row :gutter="16">
          <Col class="content">
              <img v-show="options.icon=='danger'" src="./images/tools-danger.png" alt="">
              <img v-show="options.icon=='success'"src="./images/tools-success.png" alt="">
              <img v-show="options.icon=='unknown'"src="./images/tools-unknown.png" alt="">
              <img v-show="options.icon=='warning'"src="./images/tools-warning.png" alt="">
              {{options.content}}
          </Col>
        </Row>
        <div slot="modal-footer">
          <Button type="primary" style="margin-right: 8px;" size="large" @click="handleAction">确定</Button>
          <Button type="default" size="large" @click="close">取消</Button>
        </div>
      </b-modal>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        data() {
          return {
            options: {
              title:"提示",
              content:"",
              subMessage:"",
              icon:"success"
            },
          }
        },
        methods: {
            handleAction(button) {
                this.$emit('action', button)
            },

          open() {
            this.$refs.gcbModal.show()
          },
          close() {
            this.$refs.gcbModal.hide()
          },
        },
        mounted() {

        }
    }
</script>

<style lang="less" scoped>
    .overlay {
        text-align: center;
        height: 30px;
        line-height: 30px;
    }

    .overlay .glyphicon-refresh {
        animation: spin 2s infinite linear;
    }
    .content{
      text-align: center;
      line-height: 100px;
      font-size: 16px;
    }
    .subTitle{
      color: #666;
      font-size: 14px;
      margin-right: 10px;
      margin-top: 30px;
    }
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(359deg);
        }
    }
</style>
