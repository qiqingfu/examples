/**
 * Created by qiqf on 2020/7/31
 */

module.exports = {
  keys: "qqf",
  view: {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  },
  news: {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  },
  // middleware
  middleware: [
    'compress',
    'robot'
  ],
  // robot's configurations
  robot: {
    ua: [
      /curl/i,
      /Baiduspider/i,
    ],
    enable: true
  },
  // 框架内置的安全插件
  security: {
    csrf: false
  }
}

