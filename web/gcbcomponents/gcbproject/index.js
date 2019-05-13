import Vue from 'vue'
import gcbProject from './gcbProject'

const Modal = Vue.extend(gcbProject)

export default {
    open(options = {}) {
        // 默认参数设置
        // 可以根据添加的参数来判断多选还是单选
        options = Object.assign({}, options)
        return new Promise((resolve) => {
            const gcbproject = new Modal({
                data: function() {
                    return {
                        options: options,
                        selectItem: options.selectItem ? options.selectItem : {}
                    }
                }
            })

            const component = gcbproject.$mount();
            document.body.appendChild(component.$el);

            gcbproject.$on('action', function(button) {
                this.close()
                setTimeout(() => {
                    document.body.removeChild(component.$el);
                }, 500)
                resolve(button)
            })

            gcbproject.open()
        })
    }
}