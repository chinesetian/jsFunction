import cookie from 'js-cookie'

/**
 * 获取缓存数据
 * @param {string} key
 * @param {string} type: 缓存类型 'local'(默认) / cookie / session;
 */
export function getCacheItem(key, type = 'local') {
    // key = user_id + '_' + key;
    let data
    switch (type) {
        case 'cookie':
            data = cookie.get(key)
            break
        case 'session':
            data = sessionStorage.getItem(key)
                ? JSON.parse(sessionStorage.getItem(key))
                : null
            break
        default:
            data = localStorage.getItem(key)
                ? JSON.parse(localStorage.getItem(key))
                : null
            break
    }
    return data
}

/**
 * 设置缓存数据
 * @param {string} key
 * @param {any} value
 * @param {string} type: 缓存类型 'local'(默认) / cookie / session;
 */
export function setCacheItem(key, value, type = 'local') {
    // key = user_id + '_' + key;
    let data
    switch (type) {
        case 'cookie':
            cookie.set(key, value)
            break
        case 'session':
            sessionStorage.setItem(key, JSON.stringify(value))
            break
        default:
            localStorage.setItem(key, JSON.stringify(value))
            break
    }
    return data
}

/**
 * 判断是否是空对象
 * @param {Object} data
 */
export function isEmptyObject(data) {
    return Object.keys(data).length === 0
}

/**
 * 转换tree
 * @param {Array} orgList
 * @param {string} key
 * @param {string} parentKey
 */
export function computTreeList(orgList, key = 'id', parentKey = 'parentId') {
    let tempArrMap = {},
        tempArr = []
    orgList.map(org => {
        tempArrMap[org[key]] = org
    })
    orgList.map(item => {
        if (!tempArrMap[item[parentKey]]) {
            tempArr.push(item)
        }
    })

    let tempFn = function(list, pid) {
        let result = [],
            temp
        for (let i in list) {
            if (list[i][parentKey] === pid) {
                result.push(list[i])
                temp = tempFn(list, list[i][key])
                if (temp.length > 0) {
                    list[i].children = temp
                }
            }
        }
        return result
    }
    tempArr.map(item => {
        item.children = tempFn(orgList, item[key])
    })
    return tempArr
}

 /**
  * 日期转时间戳
  * @param {} date 
  */
 export function dateToMs(date) {
    let result = new Date(date).getTime()
    return result
}


/**
 * 标准转时分秒字符串
 * @param {*} date 
 */
export function dateToHMS(date) {
    let Hours = new Date(date).getHours()
    Hours = Hours < 10 ? '0' + Hours : Hours
    let Minutes = new Date(date).getMinutes()
    Minutes = Minutes < 10 ? '0' + Minutes : Minutes
    let Seconds = new Date(date).getSeconds()
    Seconds = Seconds < 10 ? '0' + Seconds : Seconds

    let result = Hours + ':' + Minutes + ':' + Seconds
    return result
}

/**
 * 处理location.search的方法,将字符串转换成json
 * @param {string} search
 */
export function searchFormat(search = '') {
    let params = {}
    if (search.length) {
        search = search.indexOf('?') < 0 ? search : search.substr(1)
        let a = search.split('&')
        let b = a.map(v => v.split('='))
        b.map(v => (params[v[0]] = v[1]))
    }
    return params
}

/**
 * 生成UUID
 */
export function uuid() {
    let s = []
    let hexDigits = '0123456789abcdef'
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = '-'

    let uuidStr = s.join('')
    return uuidStr
}

/**
 *
 * @param {Object} data
 * @param {String} type
 */
export function judgeType(data, type) {
    return Object.prototype.toString.apply(data) === `[object ${type}]`
}

/**
 * 阻止冒泡的兼容
 * @param {*} e
 */
export function stopPropagation(e) {
    if (e.stopPropagation) {
        e.stopPropagation()
    } else {
        e.cancelBubble = true
    }
}

/**
 * 设置全屏
 * @param {element} element 
 */
export function fullscreen(element) {
    if (element.requestFullScreen) {
        element.requestFullScreen()
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen()
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
    }
}

/**
 * exitFullscreen 退出全屏
 * @param  {Objct} element 选择器
 */
export function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    }
}

/**
 * 判读是否支持全屏
 */
export function fullscreenEnabled() {
    return (
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled
    )
}

/**
 * [isFullscreen 判断浏览器是否全屏]
 * @return [全屏则返回当前调用全屏的元素,不全屏返回false]
 */
export function isFullscreen() {
    return (
        document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        false
    )
}

/**
 * 正则匹配url地址替换ip部分的转到nginx代理
 * @param {string} url
 */
export function formatLiveVideoUrl(url) {
    let reg = new RegExp(/^(\w+):\/\/([^/:]+)(:\d*)?/)
    if (url.match(reg)) {
        return `${
            process.env.NODE_ENV !== 'production'
                ? `http://${window.location.hostname}:8890`
                : window.location.origin
        }/wwlive${url.replace(reg, '')}`
    } else {
        return url
    }
}


/**
 * 去掉或者修改透明的图片不需要的颜色
 * @param {string} src image src
 * @param {Object<{RGBA}>} 匹配的颜色 
 * http://192.168.100.192:8080/map/2/20180523180806/source/mymap.png
 */
export function formatPixelImage(src) {
    let image = new Image();
    image.crossOrigin = "Anonymous";
    // image.setAttribute('crossOrigin', 'anonymous');
    let ngUrl = formatMapUrl(src);
    image.src = ngUrl
    return new Promise((resolve, reject) => {
        image.onload = function() {
            let canvas = document.createElement('canvas')
            canvas.width = image.width
            canvas.height = image.height
            var context = canvas.getContext('2d')
            context.drawImage(image, 0, 0, image.width, image.height)
            try {
                let imageData = context.getImageData(
                    0,
                    0,
                    image.width,
                    image.height
                )
                //获取到每个像素的信息
                var px = imageData.data
                for (var i = 0; i < px.length; i += 4) {
                    let r = px[i]
                    var g = px[i + 1]
                    var b = px[i + 2]

                    
                    //TODO 黑变白
                    if (r === 0 && g === 0 && b === 0) {
                        px[i] = 255
                        px[i + 1] = 255 
                        px[i + 2] = 255
                        px[i + 3] = px[i + 3] * 1
                    }

                    //TODO 黑灰变透明
                    if (r === 205 && g === 205 && b === 205) {
                        px[i + 3] = px[i + 3] * 0
                    }

                    //TODO 白变透明
                    if (r === 255 && g === 255 && b === 255) {
                        px[i + 3] = px[i + 3] * 0
                    }
                    //TODO 灰白变透明
                    if (r === 254 && g === 254 && b === 254) {
                        px[i + 3] = px[i + 3] * 0
                    }
                }

                context.putImageData(imageData, 0, 0)
                resolve(canvas.toDataURL('image/png'))
            } catch (e) {
                reject(e)
            }
        }
    })
}
