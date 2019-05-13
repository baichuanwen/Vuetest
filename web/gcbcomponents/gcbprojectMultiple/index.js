import Vue from 'vue'
import gcbProjectMultiple from './gcbProjectMultiple'

const Modal = Vue.extend(gcbProjectMultiple)

export default {
    open(options = {}) {
        // 默认参数设置
        // 可以根据添加的参数来判断多选还是单选
        options = Object.assign({}, options)
        return new Promise((resolve) => {
            const gcbprojectmul = new Modal({
                data: function() {
                    return {
                        options: options
                    }
                }
            })

            const component = gcbprojectmul.$mount();
            document.body.appendChild(component.$el);

          gcbprojectmul.$on('action', function(button) {
                this.close()
                setTimeout(() => {
                    document.body.removeChild(component.$el);
                }, 500)
                resolve(button)
            })
// 在哪里
          gcbprojectmul.open()
        })
    }
}
