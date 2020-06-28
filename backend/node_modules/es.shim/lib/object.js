/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2017-02-27 18:02:56
 *
 */

'use strict'

// 对象合并
if (!Object.prototype.merge) {
  Object.defineProperty(Object.prototype, 'merge', {
    value: function() {
      let args = Array.from(arguments)
      if (args.length < 1 || typeof args[0] !== 'object') {
        return this
      }
      args.unshift(this)

      Object.assign.apply(null, args)
      return this
    },
    enumerable: false,
    writable: true
  })
}

/**
 * [ 判断对象/数组是否为空]
 * eg.
 * Object.empty(obj/arr)
 */
if (!Object.empty) {
  Object.defineProperty(Object, 'empty', {
    value: function(obj) {
      try {
        for (let i in obj) {
          return false
        }
      } catch (e) {}
      return true
    },
    enumerable: false
  })
}
