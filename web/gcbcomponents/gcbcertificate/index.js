import Vue from 'vue'
import gcbCertificate from './gcbCertificate'

const Modal = Vue.extend(gcbCertificate)

export default {
    open(options = {}) {
        // 默认参数设置
        options = Object.assign({}, options)
        return new Promise((resolve) => {

            let selectItem = {}
            if (options.selectItem) {
                selectItem && options.selectItem.forEach((item, index) => {
                    selectItem[item.id] = item
                })
            }

            const gcbcertificate = new Modal({
                data: function() {
                    return {
                        selectItem: selectItem || {}
                    }
                }
            })

            const component = gcbcertificate.$mount();
            document.body.appendChild(component.$el);

            gcbcertificate.$on('action', function(button) {
                this.close()
                setTimeout(() => {
                    document.body.removeChild(component.$el);
                }, 500)
                resolve(button)
            })

            gcbcertificate.open()
        })
    }
}