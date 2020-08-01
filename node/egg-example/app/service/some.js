/**
 * Created by qiqf on 2020/7/31
 */
const Service = require("egg").Service

class SomeService extends Service {
  async list() {
    return this.config.robot.ua
  }
}

module.exports = SomeService
