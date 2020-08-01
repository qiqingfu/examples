/**
 * Created by qiqf on 2020/7/31
 */

/**
 * Helper 实例可以通过 ctx.helper 和在模版中获取
 */
const moment = require('moment');
exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();

/**
 * 将字符串转大写
 * @param data
 * @return {string}
 */
exports.toUppercase = data => {
  return typeof data === "string" ? data.toLocaleUpperCase() : data;
}
