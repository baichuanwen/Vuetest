<template>
    <div>
      <vex-dialog-body ref="body"></vex-dialog-body>
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
                loading: false
            }
        },
        methods: {
            handleAction(button) {
                this.$emit('action', button)
            },

            open() {
                this.modalEl = $(this.$el).modal().one('hidden.bs.modal', () => {
                    this.modalEl.data('bs.modal', null).remove()
                })
            },

            close() {
                this.modalEl.modal('hide')
            }
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

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(359deg);
        }
    }
</style>
