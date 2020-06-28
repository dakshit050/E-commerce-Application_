/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2017-02-27 21:56:03
 *
 */

'use strict'

// 判断数组是否包含指定元素
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(val) {
      for (let it of this) {
        if (it === val) {
          return true
        }
      }
      return false
    },
    enumerable: false,
    writable: true
  })
}
