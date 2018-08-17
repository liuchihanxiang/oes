//页面加载时判断是否是移动端
export function isMobileFn() {
    //    return  /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
    const { body } = document
    const WIDTH = 1024
    const RATIO = 3
    const rect = body.getBoundingClientRect()
    return rect.width - RATIO < WIDTH
}
//serchform组件 传入数据处理  返回纯净的form数据
export function getRealData(obj) {
    let newObj = {}
    for (let key in obj) {
        newObj[key] = obj[key].value ? obj[key].value : ''
    }
    return newObj
}