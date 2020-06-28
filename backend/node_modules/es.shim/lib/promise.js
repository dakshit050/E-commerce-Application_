/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2018-05-25 00:29:03
 * @version $Id$
 */

if (!Promise.defer) {
  Promise.defer = function() {
    let obj = {}
    obj.promise = new Promise((resolve, reject) => {
      obj.resolve = resolve
      obj.reject = reject
    })
    return obj
  }
}
