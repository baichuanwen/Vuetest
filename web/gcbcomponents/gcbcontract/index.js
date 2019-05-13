import Vue from 'vue'
import gcbContract from './gcbContract'

const Modal = Vue.extend(gcbContract)

export default {
    open(options = {}) {
        // 默认参数设置
        // 可以根据添加的参数来判断多选还是单选
        options = Object.assign({}, options)
        return new Promise((resolve) => {

            const gcbcontract = new Modal({
                data: function() {
                    return {
                        options: options,
                        selectItem: options.selectItem ? options.selectItem : {}
                    }
                }
            })

            const component = gcbcontract.$mount();
            document.body.appendChild(component.$el);

            gcbcontract.$on('action', function(button) {
                this.close()
                setTimeout(() => {
                    document.body.removeChild(component.$el);
                }, 500)
                resolve(button)
            })

            gcbcontract.open()
        })
    }
}