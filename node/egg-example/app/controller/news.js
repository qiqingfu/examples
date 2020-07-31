/**
 * Created by qiqf on 2020/7/31
 */

// app/controller/news.js
const Controller = require('egg').Controller

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx
    const page = ctx.query.page || 1
    const newsList = await ctx.service.news.list(page)
    await this.service.some.list()
    await ctx.render('news/list.tpl', {list: newsList})
  }
}

module.exports = NewsController
