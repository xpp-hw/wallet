/*
 * @Author: Mr.Zhao 1914689669@qq.com
 * @Date: 2022-07-07 02:35:16
 * @LastEditors: Mr.Zhao 1914689669@qq.com
 * @LastEditTime: 2022-07-13 16:46:21
 * @FilePath: \wallet\src\common\yasuoImg.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 将base64转换为blob
export function convertBase64UrlToBlob(urlData) {
    var arr = urlData.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }
  
  // 压缩图片
  export function compressImage(path, config) {
    return new Promise((resolve, reject) => {
      var img = new Image()
      img.src = path
      img.onload = function() {
        var that = this
        var w = that.width
        var h = that.height
        var scale = w / h
        w = config.width || config.height * scale
        h = config.height || config.width / scale
        var quality = 1 // 默认图片质量为0.7
        // 生成canvas
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        // 创建属性节点
        var anw = document.createAttribute('width')
        anw.nodeValue = w
        var anh = document.createAttribute('height')
        anh.nodeValue = h
        canvas.setAttributeNode(anw)
        canvas.setAttributeNode(anh)
        ctx.drawImage(that, 0, 0, w, h)
        // if (config.quality && config.quality <= 1 && config.quality > 0) {
        //   quality = config.quality
        // }
        var base64 = canvas.toDataURL('image/jpeg', quality)
        // var blob = convertBase64UrlToBlob(base64)
        // 回调函数返回base64的值，也可根据自己的需求返回blob的值
        while (base64.length / 1024 > 1024) { //
          quality -= 0.5;
          base64 = canvas.toDataURL("image/jpeg", quality);
          console.log('图片超过两MB，进行压缩处理')
        }
        console.log('--++',quality)
        console.log('base64',base64)
        resolve(base64)
      }
    })
  }