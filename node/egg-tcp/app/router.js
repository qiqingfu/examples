'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  app.tcp.handle('index.feed')
};
