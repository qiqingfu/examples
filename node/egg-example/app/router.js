/**
 * Created by qiqf on 2020/7/31
 */

module.exports = app => {
  const {router, controller, middleware} = app
  const gzip = middleware.gzip({threshold: 1024})
  router.get('/', controller.home.index)
  router.get('/news', gzip, controller.news.list)
  router.get('/user/:id/:name', controller.user.info)
  router.get('/search', controller.search.index)

  // 表单路由
  router.post('/form', app.controller.form.post);
}
