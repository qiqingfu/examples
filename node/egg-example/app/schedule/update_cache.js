/**
 * Created by qiqf on 2020/8/4
 */
const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  /**
   * 类静态方法
   */
  static get schedule () {
    return {
      interval: '3s',
      type: 'all',
      disable: true, // 定时任务不会被启动
      // env: [], 指定的环境下启动该定时任务
    }
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe (ctx) {
    console.log("task....")
  }
}

module.exports = UpdateCache;
