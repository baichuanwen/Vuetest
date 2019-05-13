import Vue from 'vue'
import gcbCustomModules from './gcbCustomModules'

const Modal = Vue.extend(gcbCustomModules)

export default {
  open(options = {}) {
    // 默认参数设置
    // 可以根据添加的参数来判断多选还是单选
    options = Object.assign({}, options)
    return new Promise((resolve) => {
      const gcbCustomModules = new Modal({
        data: function() {
          return {
            options: options
          }
        }
      })
      const component = gcbCustomModules.$mount();
      document.body.appendChild(component.$el);

      gcbCustomModules.$on('action', function(button) {
        this.close();
        setTimeout(() => {
          document.body.removeChild(component.$el);
        }, 500)
        resolve(button)
      })

      gcbCustomModules.open()
    })
  }
}
