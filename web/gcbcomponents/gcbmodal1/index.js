// https://segmentfault.com/a/1190000012427477
import Vue from 'vue'
import gcbModal from './gcbModal1'

const Modal = Vue.extend(gcbModal)

export default {
  open(options = {}) {
    // 默认参数设置
    // 可以根据添加的参数来判断多选还是单选
    options = Object.assign({}, options)
    return new Promise((resolve) => {
      const gcbModal = new Modal({
        data: function() {
          return {
            options: options
          }
        }
      })

      const component = gcbModal.$mount();
      document.body.appendChild(component.$el);

      gcbModal.$on('action', function(button) {
        this.close();
        setTimeout(() => {
          document.body.removeChild(component.$el);
        }, 500)
        resolve(button)
      })

      gcbModal.open()
    })
  }
}
