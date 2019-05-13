import GcbLoading from './gcbLoading.js'

let gcbLoadingInstance
const defaultSetting = {}

function _getgcbLoadingInstance() {
    gcbLoadingInstance = gcbLoadingInstance || GcbLoading.newInstance(defaultSetting)
    return gcbLoadingInstance
}

function _update(options) {
    const instance = _getgcbLoadingInstance()
    instance.update(options)
}

function _hide() {
    setTimeout(() => {
        _update({
            show: false
        })
    }, 0)
}

export default {
    show() {
        _update({
            show: true
        })
    },
    hide() {
        _hide()
    },
    delayFinish(delayTime = 200) {
        //针对近乎同步的操作提供的一种加载条
        setTimeout(() => {
            _update({
                show: true
            })
            _hide()
        }, delayTime)
    },
    destroy() {
        const instance = _getgcbLoadingInstance()
        gcbLoadingInstance = null
        instance.destroy()
    }
}