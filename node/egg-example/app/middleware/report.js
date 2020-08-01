/**
 * Created by qiqf on 2020/8/1
 */
module.exports = () => {
  return async function (ctx, next) {
    const startTime = Date.now()
    await next()
    // 上报请求时间
    ctx.logger.info(`请求时间: ${Date.now() - startTime}ms`)
  }
}
