import Vue from 'vue'
import gcbKnowledgeType from './gcbKnowledgeType'
const Modal = Vue.extend(gcbKnowledgeType)
export default {
    open(options = {}) {
        // 默认参数设置
        // 可以根据添加的参数来判断多选还是单选
        options = Object.assign({}, options)
        return new Promise((resolve) => {
            const gcbKnowledgeType = new Modal({
                data: function() {
                    return {
                        options: options
                    }
                }
            })

            const component = gcbKnowledgeType.$mount();
            document.body.appendChild(component.$el);

          gcbKnowledgeType.$on('action', function(button) {
                this.close()
                setTimeout(() => {
                    document.body.removeChild(component.$el);
                }, 500)
                resolve(button)
            })

          gcbKnowledgeType.open()
        })
    }
}
