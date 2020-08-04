/**
 * Created by qiqf on 2020/8/4
 */

/**
 * 属性的计算只需要进行一次，那么一定要实现缓存，否则再多次访问属性时会计算多次，这样会降低应用性能。
 */

const BAR = Symbol('Application#bar')

class Cache {
  constructor() {
    this._cache = {}
  }

  setItem(k, v) {
    this._cache[k] = v
  }

  getItem(k) {
    return this._cache[k] || null
  }
}

module.exports = {
  get myCache() {
    if (!this[BAR]) {
      this[BAR] = new Cache()
    }

    return this[BAR]
  }
}
