/**
 * Created by qiqf on 2020/8/1
 */
const Controller = require("egg").Controller

class FormController extends Controller {
  async post(ctx) {
    ctx.body = `body: ${JSON.stringify(ctx.request.body)}`
  }
}

module.exports = FormController
