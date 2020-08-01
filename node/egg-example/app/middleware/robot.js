/**
 * Created by qiqf on 2020/7/31
 */
// app/middleware/robot.js
// options === app.config.robot
module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get('user-agent') || ''
    console.log(`user-agent: `, source)
    const match = options.ua.some(ua => ua.test(source))
    if (match) {
      ctx.status = 403
      ctx.message = 'Go away, robot.'
    } else {
      await next()
    }
  }
}
