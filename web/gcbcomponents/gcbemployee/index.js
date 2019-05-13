import Vue from 'vue'
import gcbEmployee from './gcbEmployee'

const Modal = Vue.extend(gcbEmployee)

export default {
    open(options = {}) {
        // 默认参数设置
        // 可以根据添加的参数来判断多选还是单选
        options = Object.assign({}, options)
        return new Promise((resolve) => {

            let selectItem = options.selectItem ? options.selectItem : {}

            if (Array.isArray(options.selectItem)) {
                selectItem = {}
                selectItem && options.selectItem.forEach((item, index) => {
                    selectItem[item.id] = item
                })
            }

            const gcbemployee = new Modal({
                data: function() {
                    return {
                        options: options,
                        selectItem: selectItem || {}
                    }
                }
            })

            const component = gcbemployee.$mount();
            document.body.appendChild(component.$el);

            gcbemployee.$on('action', function(button) {
                this.close()
                setTimeout(() => {
                    document.body.removeChild(component.$el);
                }, 500)
                resolve(button)
            })

            gcbemployee.open()
        })
    }
}