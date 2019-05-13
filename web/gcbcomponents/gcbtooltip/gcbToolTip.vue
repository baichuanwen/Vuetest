<template>
    <div>
      <div id="framework-tooltip">
        <div class="modal" role="dialog"  style="width: 500px; height: 160px;">
          <div class="modal-tooltip modal-dialog" style="width: 480px">
            <div class="modal-content" style="height: 140px;">
              <div class="modal-body">
                <div class="tip_body">
                  <div class="tip_body_inner text-center">
                    <div class="tip_content">
                      <div class="img_box">
                        <img v-show="options.icon=='danger'" src="./images/tools-danger.png" alt="">
                        <img v-show="options.icon=='success'"src="./images/tools-success.png" alt="">
                        <img v-show="options.icon=='unknown'"src="./images/tools-unknown.png" alt="">
                        <img v-show="options.icon=='warning'"src="./images/tools-warning.png" alt="">
                      </div>
                      <div class="text_box">
                        <span>{{options.message}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              icon:"success",
              timeout:2000,
            },
          }
        },
        methods: {
            handleAction(button) {
                this.$emit('action', button)
            },
            close() {
               this.handleAction(this.options)
            },
        },
        mounted() {

        }
    }
</script>

<style lang="less" scoped>

  #framework-tooltip {
    position: fixed;
    top: 100px;
    left: 50%;
    width: 370px;
    height: 150px;
    margin-left: -185px;
    z-index: 1100;
  }

  #framework-tooltip .modal {
    display: block;
    position: absolute;
  }

  #framework-tooltip .modal-dialog {
    margin: 10px;
    width: 350px;
  }

  .modal-tooltip.modal-dialog {
    width: 300px;
    box-shadow: 0 5px 15px #cbe2fa;
  }

  @media (min-width: 768px) {
    .modal-tooltip .modal-content {
      box-shadow: none;
      border: none;
    }
  }

  .modal-tooltip .tip_body {
    height: 100px;
    padding: 0 30px;
  }

  .modal-tooltip .tip_content {
    display: inline-block;
    position: relative;
    padding-left: 80px;
    margin-top: 10px;
  }

  .modal-tooltip .tip_content .img_box {
    height: 80px;
    width: 80px;
    position: absolute;
    left: 0;
    top: 0;
  }

  .modal-tooltip .tip_content .img_box img {
    height: 100%;
    width: 100%;
    display: block;
  }

  .modal-tooltip .tip_content .text_box {
    height: 80px;
    padding: 12px 0;
    margin-top: 17px;
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
