// https://segmentfault.com/a/1190000012427477
import Vue from 'vue'
import tooltip from './gcbToolTip'

const Modal = Vue.extend(tooltip)

export default {
  open(options = {}) {
    // 默认参数设置
    // 可以根据添加的参数来判断多选还是单选
    options = Object.assign({}, options)
    return new Promise((resolve) => {
      const tooltip = new Modal({
        data: function() {
          return {
            options: options
          }
        }
      })

      const component = tooltip.$mount();
      document.body.appendChild(component.$el);
      tooltip.$on('action', function(button) {
        setTimeout(() => {
          document.body.removeChild(component.$el);
        }, button.timeout)
        resolve(button)
      })

      tooltip.close()
    })
  }
}
