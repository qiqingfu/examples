/**
 * Created by qiqf on 2020/8/1
 */
module.exports = app => {

  // 在中间件最前面统计请求时间
  app.config.coreMiddleware.unshift('report')

  app._name = "qqf"

  app.once('server', server => {
    // websocket
  })
  app.on('error', (err, ctx) => {
    // report error
  })
  app.on('request', ctx => {
    // log receive request
  })
  app.on('response', ctx => {
    // ctx.starttime is set by framework
    const used = Date.now() - ctx.starttime
    // log total cost
  })
}
