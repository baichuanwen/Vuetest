import Vue from 'vue'
import gcbReadRecord from './gcbReadRecord'

const Modal = Vue.extend(gcbReadRecord)

export default {
    open(options = {}) {
        // 默认参数设置
        // 可以根据添加的参数来判断多选还是单选
        options = Object.assign({}, options)
        return new Promise((resolve) => {
            const gcbReadRecord = new Modal({
                data: function() {
                    return {
                        options: options
                    }
                }
            })

            const component = gcbReadRecord.$mount();
            document.body.appendChild(component.$el);

          gcbReadRecord.$on('action', function(button) {
                this.close()
                setTimeout(() => {
                    document.body.removeChild(component.$el);
                }, 500)
                resolve(button)
            })

          gcbReadRecord.open()
        })
    }
}
