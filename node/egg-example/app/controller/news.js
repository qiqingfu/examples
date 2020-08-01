/**
 * Created by qiqf on 2020/7/31
 */

// app/controller/news.js
const BaseController = require("../core/base_controller");

class NewsController extends BaseController {
  async list() {
    const ctx = this.ctx
    console.log(ctx.queries)
    const page = ctx.query.page || 1
    const newsList = await ctx.service.news.list(page)
    this.success(newsList)
    // await ctx.render('news/list.tpl', {list: newsList})
  }
}

module.exports = NewsController
