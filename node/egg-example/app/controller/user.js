/**
 * Created by qiqf on 2020/8/1
 */
const Controller = require("egg").Controller

class UserController extends Controller {
  async info() {
    const {ctx} = this
    ctx.body = {
      name: `user, ${ctx.params.id}, ${ctx.params.name}`
    }
  }
}

module.exports = UserController
