import Config from '@/config';
import  store  from "@/store"

/**
 * @param {*} obj //对象
 * @description //对象是否为空
 */
export const isEmptyObject = (obj) => {
  var attr
  for (attr in obj)
    return !1
  return !0
}

/**
 * @param '' uuid //uuid
 * @description //根据uuid转化图片链接
 */
export const buildDownloadUrl = (uuid) => {
  if (!uuid || uuid.length < 32) {
    return null
  }
  return Config.apiHost + "/web/file/download?uuid=" + uuid;
}

export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}

// 文件上传
// export const fileSignatureUploads = (file, success, error) => {
//     state.api.file.getUploadSignature({
//         contentType: file.type,
//         fileName: file.name,
//         size: file.size
//     }, result => {
//         let ossData = new FormData()
//         ossData.append('OSSAccessKeyId', result.accessid)
//         ossData.append('policy', result.policy)
//         ossData.append('Signature', result.signature)
//         ossData.append('key', result.key)
//         ossData.append('success_action_status', 200)
//         ossData.append('file', file, file.name)
//         $.ajax({
//             url: result.host,
//             data: ossData,
//             processData: false,
//             contentType: false,
//             type: 'POST',
//             beforeSend: function(xhr) {},
//             success: function(data, textStatus, jqXHR) {
//                 // let url = window.URL.createObjectURL(el.target.files.item(0))  //本地文件浏览
//                 // let url = self.store.methods.buildDownloadUrl(result.uuid)
//                 // self.ddimgstyle.backgroundImage = 'url(' + url + ')'
//                 // self.ddimgstyle.display = self.isShow ? 'block' : 'none'
//                 success(result.uuid)
//             },
//             error: function(xhr, textStatus) {
//                 error(xhr)
//             },
//             complete: function() {}
//         })
//     })
// };

// //  文件上传
// export const fileUpload = (file, success, error) => {
//     let self = this
//     let Orientation
//     let returnSuccess = success
//     let returnError = error

//     // 去获取拍照时的信息，解决拍出来的照片旋转问题
//     EXIF.getData(file, function() {
//         Orientation = EXIF.getTag(this, 'Orientation')
//     })

//     //  看支持不支持FileReader
//     if (!file || !window.FileReader) return

//     if (/^image/.test(file.type)) {
//         //  创建一个reader
//         let reader = new FileReader()

//         //  将图片2将转成 base64 格式
//         reader.readAsDataURL(file)

//         //  读取成功后的回调
//         reader.onloadend = function() {
//             let result = this.result
//             let img = new Image()
//             img.src = result

//             // 判断图片是否大于100K,是就直接上传，反之压缩图片
//             if (this.result.length <= (100 * 1024)) {
//                 postImg(file.name, this.result)
//             } else {
//                 img.onload = function() {
//                     let data = compress(img, Orientation)
//                     postImg(file.name, data)
//                 }
//             }
//         }
//     }

//     function postImg(name, data) {
//         let ossData = new FormData()
//         ossData.append('file', dataURLtoBlob(data), name)
//         Indicator.open()
//         $.ajax({
//             xhrFields: {
//                 withCredentials: true
//             },
//             url: state.getServerUrl('web/file/upload'),
//             data: ossData,
//             processData: false,
//             contentType: false,
//             type: 'POST',
//             beforeSend: function(xhr) {},
//             success: function(data, textStatus, jqXHR) {
//                 Indicator.close()
//                 success(data.body)
//             },
//             error: function(xhr, textStatus) {
//                 Indicator.close()
//                 Toast({ message: '加载超时' })
//                 error(xhr)
//             },
//             complete: function() {}
//         })
//     }

//     function dataURLtoBlob(dataurl) {
//         let arr = dataurl.split(',')
//         let mime = arr[0].match(/:(.*?);/)[1]
//         let bstr = atob(arr[1])
//         let n = bstr.length
//         let u8arr = new Uint8Array(n)
//         while (n--) {
//             u8arr[n] = bstr.charCodeAt(n)
//         }
//         return new Blob([u8arr], { type: mime })
//     }

//     function compress(img, Orientation) {
//         let canvas = document.createElement('canvas')
//         let ctx = canvas.getContext('2d')

//         // 瓦片canvas
//         let tCanvas = document.createElement('canvas')
//         let tctx = tCanvas.getContext('2d')
//         let initSize = img.src.length
//         let width = img.width
//         let height = img.height

//         // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
//         let ratio
//         if ((ratio = width * height / 4000000) > 1) {
//             ratio = Math.sqrt(ratio)
//             width /= ratio
//             height /= ratio
//         } else {
//             ratio = 1
//         }
//         canvas.width = width
//         canvas.height = height

//         // 铺底色
//         ctx.fillStyle = '#fff'
//         ctx.fillRect(0, 0, canvas.width, canvas.height)

//         // 如果图片像素大于100万则使用瓦片绘制
//         let count
//         if ((count = width * height / 1000000) > 1) {
//             // 计算要分成多少块瓦片
//             count = ~~(Math.sqrt(count) + 1)

//             // 计算每块瓦片的宽和高
//             let nw = ~~(width / count)
//             let nh = ~~(height / count)
//             tCanvas.width = nw
//             tCanvas.height = nh
//             for (let i = 0; i < count; i++) {
//                 for (let j = 0; j < count; j++) {
//                     tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
//                     ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
//                 }
//             }
//         } else {
//             ctx.drawImage(img, 0, 0, width, height)
//         }

//         // 修复ios上传图片的时候 被旋转的问题
//         if (Orientation !== '' && Orientation !== 1) {
//             switch (Orientation) {
//                 case 6: // 需要顺时针（向左）90度旋转
//                     rotateImg(img, 'left', canvas)
//                     break
//                 case 8: // 需要逆时针（向右）90度旋转
//                     rotateImg(img, 'right', canvas)
//                     break
//                 case 3: // 需要180度旋转
//                     rotateImg(img, 'right', canvas) // 转两次
//                     rotateImg(img, 'right', canvas)
//                     break
//             }
//         }
//         // 进行最小压缩
//         let ndata = canvas.toDataURL('image/jpeg', 0.5)
//         console.log('压缩前：' + initSize)
//         console.log('压缩后：' + ndata.length)
//         console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
//         tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
//         return ndata
//     }

//     function rotateImg(img, direction, canvas) {
//         // 最小与最大旋转方向，图片旋转4次后回到原方向
//         const minStep = 0
//         const maxStep = 3
//         if (img == null) return

//         // img的高度和宽度不能在img元素隐藏后获取，否则会出错
//         let height = img.height
//         let width = img.width
//         let step = 2
//         if (step == null) {
//             step = minStep
//         }
//         if (direction === 'right') {
//             step++

//             // 旋转到原位置，即超过最大值
//             step > maxStep && (step = minStep)
//         } else {
//             step--
//             step < minStep && (step = maxStep)
//         }
//         // 旋转角度以弧度值为参数
//         let degree = step * 90 * Math.PI / 180
//         let ctx = canvas.getContext('2d')
//         switch (step) {
//             case 0:
//                 canvas.width = width
//                 canvas.height = height
//                 ctx.drawImage(img, 0, 0)
//                 break
//             case 1:
//                 canvas.width = height
//                 canvas.height = width
//                 ctx.rotate(degree)
//                 ctx.drawImage(img, 0, -height)
//                 break
//             case 2:
//                 canvas.width = width
//                 canvas.height = height
//                 ctx.rotate(degree)
//                 ctx.drawImage(img, -width, -height)
//                 break
//             case 3:
//                 canvas.width = height
//                 canvas.height = width
//                 ctx.rotate(degree)
//                 ctx.drawImage(img, -width, 0)
//                 break
//         }
//     }
// };

// 文件上传
export const fileUploads = (file, success, error) => {
    let ossData = new FormData()
    ossData.append('file', file, file.name)
    Indicator.open()
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        url: Config.apiHost+'web/file/upload',
        data: ossData,
        processData: false,
        contentType: false,
        type: 'POST',
        beforeSend: function(xhr) {},
        success: function(data, textStatus, jqXHR) {
            Indicator.close()
            success(data.body)
        },
        error: function(xhr, textStatus) {
            Indicator.close()
            Toast({ message: '加载超时' })
            error(xhr)
        },
        complete: function() {}
    })
};


export const getCommonString = (arr1, arr2) => {
  let len = Math.min(arr1.length, arr2.length)
  let i = -1
  let res = []
  while (++i < len) {
    const item = arr2[i]
    if (arr1.indexOf() > -1) res.push(item)
  }
  return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (target, arr) => {
  return target.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp)
  return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
export const getDate = (timeStamp, startType) => {
  const d = new Date(timeStamp)
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
   else if(startType=="yyyy-MM-dd")  resStr = year + '-' + month + '-' + date
    else if(startType=="yyyy-MM") resStr = year + '-' + month
  else resStr = month + '-' + date + ' ' + hours + ':' + minutes
  return resStr
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp)
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp)
  // 获取当前时间时间戳
  const currentTime = Math.floor(Date.parse(new Date()) / 1000)
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime)
  // 获取两个时间戳差值
  let diff = currentTime - timeStamp
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff
  let resStr = ''
  const dirStr = IS_EARLY ? '前' : '后'
  // 少于等于59秒
  if (diff <= 59) resStr = diff + '秒' + dirStr
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
  // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
  else resStr = getDate(timeStamp, 'year')
  return resStr
}
//获取周一 周日
export const getWeek=()=> {
  //设置默认时间
  var day = new Date();
  var monday = new Date(day.getTime());
  var sunday = new Date(day.getTime());
  monday.setDate(monday.getDate() + 1 - monday.getDay());
  sunday.setDate(sunday.getDate() + 7 - sunday.getDay());
  return { monday: monday, sunday: sunday };
}

//上传判断文件类型
export const getFileType=(item) =>{
  var type = {
    isImg: false,
    isExcel: false,
    isCad: false,
    isPdf: false,
    isPpt: false,
    isWord: false,
    isOther: false
  };
  var fileName = item.fileName,
    suffix = fileName.split("."),
    imgReg = /^(jpg|png|gif|bmp|jpeg)$/i,
    excelReg = /^(xls|xlsx|xlsm|xlt|xltx|xltm)$/i,
    cadReg = /^(cad|dwg|dxf|dwt|dws)$/i,
    pdfReg = /^(pdf)$/i,
    pptReg = /^(ppt|pps|pptx)$/i,
    wordReg = /^(doc|docx|dot|dotx|docm)$/i,
    suffix = suffix[suffix.length - 1];
  if (imgReg.test(suffix)) {
    type.isImg = true;
  } else if (excelReg.test(suffix)) {
    type.isExcel = true;
  } else if (cadReg.test(suffix)) {
    type.isCad = true;
  } else if (pdfReg.test(suffix)) {
    type.isPdf = true;
  } else if (pptReg.test(suffix)) {
    type.isPpt = true;
  } else if (wordReg.test(suffix)) {
    type.isWord = true;
  } else {
    type.isOther = true;
  }
  return type;
}

//根据[权限数组]判断是否有权限
export const  hasPermission= (permission)=> {
    let permissions = store.state.user.permissions;
    if (!isEmptyObject(permissions)) {
        if (Array.isArray(permission)) {
            for (var i = 0; i < permission.length; i++) {
                if (!!permissions[permission[i]]) {
                  return true;
                }
            }
        }
        else {
           if(!!permissions[permission])  return true;

        }
    }else{
        return false;
    }
};
export const storage=()=> {
    let data = {};
    return {
      setItem: function(key, value) {
        data[key] = value;
      },
      getItem: function(key) {
        return data[key];
      },
      removeItem: function(key) {
        delete data[key];
      },
      clear: function() {
        data = {};
      }
    };
};
// 本地存储封装
export const locals= {
    //存储单个属性
        set: (key, value)=> {
         localStorage[key] = value;
        },
        //读取单个属性
        get: (key, defaultValue)=>{
          return localStorage[key] || defaultValue;
        },
        //存储对象，以JSON格式存储
        setObject: (key, value)=>{
          localStorage[key] = JSON.stringify(value);
        },
        //读取对象
        getObject: (key)=> {
          return JSON.parse(localStorage[key] || '{}');
        },
        //清除单个缓存
        remove: (key)=> {
          localStorage.removeItem(key);
        },
        //清除集合缓存
        removeList: (arry)=> {
          arry.forEach(function(item, index) {
            localStorage.removeItem(item);
          })
        },
        //清除所有
        clear: (key)=> {
          localStorage.clear();
        },
        //对象是否为空
        isEmptyObject: (key)=> {
          var attr;
          for (attr in localStorage[key])
            return !1;
          return !0;
        },

}

