/**
 * Created by qiqf on 2020/7/31
 */
const Controller = require("egg").Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = this.ctx.helper.toUppercase((this.app._name || "Hello,World"))
  }
}

module.exports = HomeController
