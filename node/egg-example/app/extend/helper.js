/**
 * Created by qiqf on 2020/7/31
 */
const moment = require('moment');
exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();
