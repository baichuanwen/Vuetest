import Vue from 'vue'
import gcbCertificateType from './gcbCertificateType'

const Modal = Vue.extend(gcbCertificateType)

export default {
    open(options = {}) {
        // 默认参数设置
        // 可以根据添加的参数来判断多选还是单选
        options = Object.assign({}, options)
        return new Promise((resolve) => {
            const gcbCertificateType = new Modal({
                data: function() {
                    return {
                        options: options
                    }
                }
            })

            const component = gcbCertificateType.$mount();
            document.body.appendChild(component.$el);

            gcbCertificateType.$on('action', function(button) {
                this.close()
                setTimeout(() => {
                    document.body.removeChild(component.$el);
                }, 500)
                resolve(button)
            })

            gcbCertificateType.open()
        })
    }
}