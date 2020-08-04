/**
 * Created by qiqf on 2020/8/1
 */

/**
 * Koa 的全局应用对象
 * @param app
 */
// module.exports = app => {
//
//   // 在中间件最前面统计请求时间
//   app.config.coreMiddleware.unshift('report')
//
//   app._name = "qqf"
//
//   app.once('server', server => {
//     // websocket
//   })
//   app.on('error', (err, ctx) => {
//     // report error
//   })
//   app.on('request', ctx => {
//     // log receive request
//   })
//   app.on('response', ctx => {
//     // ctx.starttime is set by framework
//     const used = Date.now() - ctx.starttime
//     // log total cost
//   })
// }

class AppBootHook {
  constructor(app) {
    console.log('constructor')
    this.app = app
  }

  configWillLoad() {
    console.log('configWillLoad')
    this.app.config.coreMiddleware.unshift('report')
  }

  async didLoad() {
    console.log('didLoad')
  }

  async willReady() {
    console.log('willReady')
  }

  async didReady() {
    console.log('didReady')
  }

  async serverDidReady () {
    console.log('应用启动完成 - serverDidReady')

    this.app.once('server', server => {
      // websocket
    })
    this.app.on('error', (err, ctx) => {
      // report error
    })
    this.app.on('request', ctx => {
      // log receive request
    })
    this.app.on('response', ctx => {
      const used = Date.now() - ctx.starttime
      console.log("used", used)
    })
  }
}

module.exports = AppBootHook;
