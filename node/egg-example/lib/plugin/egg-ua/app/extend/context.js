/**
 * Created by qiqf on 2020/7/31
 */
module.exports = {
  /**
   * 存取描述符
   */
  get isIOS() {
    const iosReg = /iphone|ipad|ipod/i;
    return iosReg.test(this.get('user-agent'))
  }
}
