import Vue from 'vue'
import gcbImgViewer from './gcbImgViewer'

const Modal = Vue.extend(gcbImgViewer)

export default {
    show(options = {}) {
        // 默认参数设置
        // 可以根据添加的参数来判断多选还是单选
        options = Object.assign({}, options)
            const gcbImgViewer = new Modal({
                data: function() {
                    return {
                        options: options,

                    }
                }
            })
            const component = gcbImgViewer.$mount();
    }
}
