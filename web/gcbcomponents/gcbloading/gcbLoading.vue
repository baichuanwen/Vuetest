<template>
  <transition name="fade">
    <div :class="prefixClass" :style="loadingStyle" v-show="show">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" style="enable-background:new 0 0 50 50;" xml:space="preserve">
          <circle cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
          </circle>
          <circle transform="rotate(45 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.125s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
          </circle>
          <circle transform="rotate(90 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.25s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
          </circle>
          <circle transform="rotate(135 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.375s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
          </circle>
          <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
          </circle>
          <circle transform="rotate(225 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.625s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
          </circle>
          <circle transform="rotate(270 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.75s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
          </circle>
          <circle transform="rotate(315 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.875s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
          </circle>
          <circle transform="rotate(180 16 16)" cx="16" cy="3" r="0">
            <animate attributeName="r" values="0;3;0;0" dur="1s" repeatCount="indefinite" begin="0.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" calcMode="spline" />
          </circle>
        </svg>
    </div>
  </transition>
</template>

<script>
    import * as svgLoading from './svg'

    const prefix = `gcb-loading`

    // 设置参数暂时没用，type|color|size 优化loading使功能更完整
    export default {
        name: 'gcb-loading',
        props: {
            type: {
                type: String,
                default: 'spiningDubbles'
            },
            color: {
                type: String,
                default: '#333'
            }
        },
        data() {
            return {
                show: false
            }
        },
        computed: {
            prefixClass() {
                return prefix
            },
            svg() {
                return svgLoading[this.type]
            },
            loadingStyle() {
                return {
                    fill: this.color
                }
            }
        }
    }
</script>

<style scoped>
    .gcb-loading {
        position: fixed;
        z-index: 2000;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        /*background-color: rgba(0, 0, 0, 0.4);*/
    }

    .gcb-loading svg {
        width: 70px;
        height: 70px;
    }
</style>
