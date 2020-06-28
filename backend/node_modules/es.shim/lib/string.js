/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2017-02-27 22:01:10
 *
 */

'use strict'

//类似于Array 的splice方法
if (!String.prototype.splice) {
  Object.defineProperty(String.prototype, 'splice', {
    value: function(start, len, fill) {
      let length = this.length
      let argLen = arguments.length

      fill = fill === undefined ? '' : fill

      if (argLen < 1) {
        return this
      }

      //处理负数
      if (start < 0) {
        if (Math.abs(start) >= length) {
          start = 0
        } else {
          start = length + start
        }
      }

      if (argLen === 1) {
        return this.slice(0, start)
      } else {
        len -= 0

        let strl = this.slice(0, start)
        let strr = this.slice(start + len)

        return strl + fill + strr
      }
    },
    enumerable: false
  })
}

//同php的htmlspecialchars函数
if (!String.prototype.htmlspecialchars) {
  Object.defineProperty(String.prototype, 'htmlspecialchars', {
    value: function(sign) {
      let str = this.replace(/&(?!\w+;)/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

      if (sign === 'ENT_QUOTES') {
        return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;')
      } else if (sign === 'ENT_NOQUOTES') {
        return str
      } else {
        return str.replace(/"/g, '&quot;')
      }
    },
    enumerable: false
  })
}

//htmlspecialchars的还原
if (!String.prototype.tohtml) {
  Object.defineProperty(String.prototype, 'tohtml', {
    value: function() {
      return this.replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/gi, '&')
    },
    enumerable: false
  })
}

//简单的过滤xss
if (!String.prototype.xss) {
  Object.defineProperty(String.prototype, 'xss', {
    value: function() {
      let str = this.htmlspecialchars('ENT_QUOTES')
      str = str
        .replace(
          /(document\.cookie)|(document\.write)|(\.parentNode)|(window\.location)|(\.innerHTML)/g,
          ''
        )
        .replace(/(%0[0-8bcef])|(%1[0-9a-f])/g, '')
      return str
    },
    enumerable: false
  })
}

// js特殊字符的转义
if (!String.prototype.escape) {
  Object.defineProperty(String.prototype, 'escape', {
    value: function() {
      return this.replace(/('|"|&|\\|\}|\{|\(|\)|;|=|\,|&)/g, '\\$1')
    },
    enumerable: false
  })
}

// padStart & padEnd
if (!String.prototype.padStart) {
  Object.defineProperty(String.prototype, 'padStart', {
    value: function(len, fill) {
      let alen = arguments.length
      let length = this.length
      let ilen = len - length

      if (alen < 1 || ilen < 1) {
        return this
      }

      if (alen < 2 || typeof fill !== 'string') {
        fill = ' '
      }

      while (fill.length < ilen) {
        fill += fill
      }

      return fill.slice(0, ilen) + this
    },
    enumerable: false
  })

  Object.defineProperty(String.prototype, 'padEnd', {
    value: function(len, fill) {
      let alen = arguments.length,
        length = this.length,
        ilen = len - length

      if (alen < 1 || ilen < 1) {
        return this
      }

      if (alen < 2 || typeof fill !== 'string') {
        fill = ' '
      }

      while (fill.length < ilen) {
        fill += fill
      }

      return this + fill.slice(0, ilen)
    },
    enumerable: false
  })
}
