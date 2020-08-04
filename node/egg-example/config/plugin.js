/**
 * Created by qiqf on 2020/7/31
 */

const path = require('path')

/**
 * 开启插件
 */
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
}

/**
 * 挂载 ua 插件
 */
exports.ua = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-ua')
}

/**
 * 使用 mysql 插件
 */
exports.mysql = {
  enable: true,
  package: 'egg-mysql'
}
