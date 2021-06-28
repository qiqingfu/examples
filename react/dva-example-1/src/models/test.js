const delay = ms => new Promise((resolve) => setTimeout(resolve, ms))
/**
 * 默认模块导出
 */
export default {
  namespace: 'test',
  state: {
    list: []
  },
  reducers: {
    // 更新 list
    update(state, payload) {
      return {
        ...state,
        list: payload.data
      }
    }
  },
  /**
   * 作为对象属性的 Generator 函数
   * https://wangdoc.com/es6/generator.html#%E4%BD%9C%E4%B8%BA%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7%E7%9A%84-generator-%E5%87%BD%E6%95%B0
   */
  effects: {
    *getList(action, {call, put}) {
      yield call(delay, 2000)
      yield put({
        type: 'update',
        data: [1,2,3,4,5]
      })
    }
  },
}