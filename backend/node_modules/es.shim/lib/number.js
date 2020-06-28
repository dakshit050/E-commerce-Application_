/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2018-06-29 19:29:19
 * @version $Id$
 */
'use strict'

// 简单的数字处理
// 将安全范围内的数字字符串转为数字类型
// 否则转为字符串类型
if (!Number.parse) {
  Object.defineProperty(Number, 'parse', {
    value: function(val) {
      if (typeof val !== 'number' && typeof val !== 'string') {
        return val
      }
      val += ''
      if (val.startsWith('0') && !val.startsWith('0.')) {
        if (val === '0') {
          return 0
        } else {
          return val
        }
      } else {
        if (isFinite(val)) {
          if (
            val >= Number.MIN_SAFE_INTEGER &&
            val <= Number.MAX_SAFE_INTEGER
          ) {
            val = +val
          }
        }
        return val
      }
    },
    enumerable: false
  })
}
