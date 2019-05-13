// https://segmentfault.com/a/1190000012427477
import Vue from 'vue'
import gcbModal from './gcbModal'

const Modal = Vue.extend(gcbModal)

export default {
    open(name, options = {}) {
        const defaultOptions = {}

        options = Object.assign({}, defaultOptions, options)

        return new Promise((resolve) => {
            const box = new Modal({
                el: document.createElement('div'),
                components: {
                    VexDialogBody: () =>
                        import ('@/gcbcomponents/' + name + '.vue').then((components) => {
                            components.default._Ctor = {}

                            const dialogOptions = components.default.data().dialogOptions || {}

                            if (!components.default.attached) {
                                components.default.backupCreated = components.default.created
                                components.default.backupMounted = components.default.mounted
                            }

                            components.default.created = function() {
                                if (components.default.backupCreated) {
                                    components.default.backupCreated.call(this)
                                }
                            }

                            components.default.mounted = function() {
                                if (components.default.backupMounted) {
                                    components.default.backupMounted.call(this)
                                }
                            }

                            box.loading = false

                            box.title = dialogOptions.title || '对话框'

                            components.default.attached = true

                            return components
                        })
                }
            })

            box.$on('action', function(button) {
                const instance = this.$refs.body

                if (!instance) {
                    return
                }

                if (!instance.dialogClickButton) {
                    box.close()
                    box.$destroy()
                    resolve('close')
                    return
                }

                const result = instance.dialogClickButton(button)

                if (result && result.then) {
                    result.then((result) => {
                        if (result === true || typeof result === 'undefined') {
                            box.close()
                            box.$destroy()
                            resolve(button)
                        }
                    })
                } else {
                    if (result === true || typeof result === 'undefined') {
                        box.close()
                        box.$destroy()
                        resolve(button)
                    }
                }
            })

            box.loading = true
            box.title = '正在加载...'
            box.open()
        })
    }
}
