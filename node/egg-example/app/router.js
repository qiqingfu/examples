/**
 * Created by qiqf on 2020/7/31
 */

module.exports = app => {
  const {router, controller} = app
  router.get("/", controller.home.index)
  router.get('/news', controller.news.list)
}
