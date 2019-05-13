import Vue from 'vue'
import Axios from 'axios'
import Config from '@/config'
import { Message, Spin, Modal } from 'iview'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/libs/util'
import GcbLoading from '@/gcbcomponents/gcbloading'

//Vue.use(Axios);

// Axios
// https://www.kancloud.cn/yunye/axios/234845
class HttpRequest {
    constructor() {
        this.options = {
            method: '',
            url: ''
        }

        // 存储请求队列
        this.queue = {}
    }

    // 销毁请求实例
    destroy(url) {
        delete this.queue[url]
        const queue = Object.keys(this.queue)
        return queue.length
    }

    // 请求拦截
    interceptors(instance, url) {
        // 添加请求拦截器
        instance.interceptors.request.use(config => {
            GcbLoading.show()

            // 在发送请求之前做些什么
            return config
        }, error => {
            // 请求错误时
            console.log('request:', error)

            // 1. 判断请求超时
            if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                console.log('timeout请求超时')
            }
            // 2. 需要重定向到错误页面
            const errorInfo = error.response
            console.log(errorInfo)
            if (errorInfo) {
                //error =errorInfo.data  //页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
                const errorStatus = errorInfo.status; // 404 403 500 ...
            }
            // 对请求错误做些什么
            return Promise.reject(error)
        })

        // 添加响应拦截器
        instance.interceptors.response.use((res) => {
            var theUA = window.navigator.userAgent.toLowerCase();
            if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
                var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
                if (ieVersion < 10) {
                    if (res.data == null && res.config.responseType === 'json' && res.request.responseText != null) {
                        try {
                            // eslint-disable-next-line no-param-reassign
                            res.data = JSON.parse(res.request.responseText);
                        } catch (e) {
                            // ignored
                        }
                    }
                    return res;
                } else {}
            }
            let { data } = res
            const is = this.destroy(url)
            if (!is) {
                setTimeout(() => {
                    GcbLoading.hide()
                }, 0)
            }
            if (!(data instanceof Blob)) {
                if (data.error) {
                    let error = data.error
                    if (error.code == 1002 || error.code == 1004 || error.code == 1005 || error.code == 1006) {
                        Modal.warning({
                            title: '提示',
                            content: error.message,
                            onOk: () => {
                                Cookies.remove(TOKEN_KEY)
                                    //  window.location.href = '/'
                            }
                        })
                    } else {
                        alert(error.message);
                        //Message.error(error.message)
                        //tooltip.open({message:error.message,icon:"warning"})
                    }
                    return data
                } else {
                    return data.body ? data.body : data;
                }
            } else {
                let { headers } = res
                if (headers['content-disposition']) {
                    var contentType = headers['content-type']
                    var contentDisposition = headers['content-disposition'].split(';')
                    var fileName = contentDisposition[contentDisposition.length - 1].split('=')[1].replace(/"/g, '')
                    var file = new Blob([data], { type: contentType })
                    var a = document.createElement('a')
                    document.body.appendChild(a)
                    a.className = 'hidden'
                    a.href = URL.createObjectURL(file)
                    a.download = decodeURI(fileName)
                    a.click()
                } else {
                    Message.error('下载失败！')
                }
                return false
            }
        }, (err) => {
            const is = this.destroy(url)
            if (!is) {
                setTimeout(() => {
                    GcbLoading.hide()
                }, 0)
            }

            if (err && err.response) {
                switch (err.response.status) {
                    case 0:
                        err.message = '请求超时'
                        break
                    case 400:
                        err.message = '请求错误'
                        break
                    case 401:
                        err.message = '未授权，请登录'
                        break
                    case 403:
                        err.message = '拒绝访问'
                        break
                    case 404:
                        err.message = `请求地址出错: ${err.response.config.url}`
                        break
                    case 408:
                        err.message = '请求超时'
                        break
                    case 500:
                        err.message = '服务器内部错误'
                        break
                    case 501:
                        err.message = '服务未实现'
                        break
                    case 502:
                        // err.message = '网关错误'
                        err.message = '当前功能升级维护中，期间暂停使用，敬请谅解！'
                        break
                    case 503:
                        // err.message = '服务不可用'
                        err.message = '当前功能升级维护中，期间暂停使用，敬请谅解！'
                        break
                    case 504:
                        err.message = '网关超时'
                        break
                    case 505:
                        err.message = 'HTTP版本不受支持'
                        break
                    default:
                }
            }
            Message.error(err.message)

            return Promise.reject(err)
        })
    }

    // 创建实例
    create() {
        var conf = {
            baseURL: Config.apiHost,
            timeout: 10000,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }
        var theUA = window.navigator.userAgent.toLowerCase();
        if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
            var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
            if (ieVersion < 10) {
                conf = {
                    baseURL: Config.apiHost,
                    timeout: 10000,
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            } else {
                conf = {
                    baseURL: Config.apiHost,
                    timeout: 10000,
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    }
                }
            }
        }
        return Axios.create(conf)
    }

    // 合并请求实例
    mergeReqest(instances = []) {
        //
    }

    // 请求实例
    request(options) {
        var instance = this.create()
        this.interceptors(instance, options.url)
        options = Object.assign({}, options)
        this.queue[options.url] = instance
        return instance(options)
    }
}

const axios = new HttpRequest()

export default axios
