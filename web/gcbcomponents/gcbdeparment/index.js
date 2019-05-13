import Vue from 'vue'
import gcbDeparment from './gcbDeparment'

const Modal = Vue.extend(gcbDeparment)

export default {
    open(options = {}) {
        // 默认参数设置
        options = Object.assign({}, options)
        return new Promise((resolve) => {
            const gcbdeparment = new Modal({
                data: function() {
                    return {
                        options: options,
                        selectItem: options.selectItem ? options.selectItem : {}
                    }
                }
            })

            const component = gcbdeparment.$mount();
            document.body.appendChild(component.$el);

            gcbdeparment.$on('action', function(button) {
                this.close()
                setTimeout(() => {
                    document.body.removeChild(component.$el);
                }, 500)
                resolve(button)
            })

            gcbdeparment.open()
        })
    }
}