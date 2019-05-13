import Vue from 'vue'
import gcbDeparmentMultiple from './gcbDeparmentmultiple'

const Modal = Vue.extend(gcbDeparmentMultiple)

export default {
    open(options = {}) {
        // 默认参数设置
        options = Object.assign({}, options)
        return new Promise((resolve) => {
            const gcbdeparmentmultiple = new Modal({
                data: function() {
                    return {
                        options: options
                    }
                }
            })

            const component = gcbdeparmentmultiple.$mount();
            document.body.appendChild(component.$el);

          gcbdeparmentmultiple.$on('action', function(button) {
                this.close()
                setTimeout(() => {
                    document.body.removeChild(component.$el);
                }, 500)
                resolve(button)
            })

          gcbdeparmentmultiple.open()
        })
    }
}
