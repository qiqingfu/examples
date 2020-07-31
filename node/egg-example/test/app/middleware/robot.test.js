/**
 * Created by qiqf on 2020/7/31
 */
const {app, mock, assert} = require("egg-mock/bootstrap")

describe('test/app/middleware/robot.test.js', () => {
  it('should block robot', () => {
    return app.httpRequest()
      .get('/')
      .set('User-Agent', "Baiduspider")
      .expect(403)
  })
})
