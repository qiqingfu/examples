'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  tcp: {
    enable: true,
    package: 'egg-tcp'
  }
};
