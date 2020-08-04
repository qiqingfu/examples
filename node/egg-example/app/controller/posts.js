/**
 * Created by qiqf on 2020/8/4
 */

const Controller = require("egg").Controller

module.exports = class PostsController extends Controller {
  async show() {
    this.ctx.body = {
      name: 'egg',
      category: 'framework',
      language: 'Node.js',
    }
  }
}
