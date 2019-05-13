import GcbLoading from './gcbloading.vue'
import Vue from 'vue'

GcbLoading.newInstance = options => {
    const _props = options || {}

    const instance = new Vue({
        data: _props,
        render(h) {
            return h(GcbLoading, {
                props: _props
            })
        }
    })

    const component = instance.$mount()
    document.body.appendChild(component.$el)
    const loading_bar = instance.$children[0]

    return {
        update(options) {
            'show' in options && (loading_bar.show = options.show)
        },
        component: loading_bar,
        destroy() {
            document.body.removeChild(document.getElementsByClassName('gcb-loading')[0])
        }
    }
}

export default GcbLoading