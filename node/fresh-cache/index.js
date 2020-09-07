/**
 * Created by qiqf on 2020/7/29
 */
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const mime = require('mime');
const fresh = require("fresh");

/**
 * 是否开启协商缓存
 * @type {boolean}
 */
const IS_NEGOTIATE_CACHE = true;
/**
 * 缓存的类型
 * @type {{modified: boolean, etag: boolean}}
 */
const NEGOTIATE_CACHE_TYPES = {
  modified: true,
  etag: true,
};

const server = http.createServer(onRequest);

function onRequest(req, res) {
  let { pathname } = url.parse(req.url);

  if ('/favicon.ico' === pathname) return;

  const staticDirPath = path.resolve(__dirname, 'public');

  if ('GET' === req.method || 'HEAD' === req.method) {
    let content, type;
    if ('/' === pathname) {
      const filePath = path.resolve(staticDirPath, 'index.html');
      content = fs.readFileSync(filePath);
      type = mime.getType(filePath);
      setHeader(res, content, () => {
        res.setHeader('Content-Type', `${type}; charset=utf8`);
      });
    } else {
      const filePath = path.join(staticDirPath, pathname);
      /**
       * 在不开启协商缓存的情况
       */
      if (!IS_NEGOTIATE_CACHE) {
        content = fs.readFileSync(filePath);
        type = mime.getType(filePath);
        return setHeader(res, content, () => {
          res.setHeader('Content-Type', `${type}; charset=utf8`);
        });
      }

      send(req, res, filePath);
    }
  } else {
    res.end(`
      not supper ${pathname} : ${req.method}
    `);
  }
}

function setHeader(res, content, fn) {
  if (typeof content === 'function') {
    fn = content;
    content = '';
  }
  res.setHeader('Pragma', 'no-cache');
  // res.setHeader("Expires", 0)
  res.setHeader('Cache-Control', 'max-age=0');
  fn && fn();
  res.end(content);
}

/**
 * 转换时间为 UTC  格式
 * @param time
 * @returns {string}
 */
function toUTCTime(time) {
  return new Date(time).toUTCString();
}

/**
 * 生成 Etag 值
 * @param stat
 */
function statTag(stat) {
  const mtime = stat.mtime.getTime().toString(16);
  const size = stat.size.toString(16);

  return '"' + size + '-' + mtime + '"';
}

function send(req, res, filePath) {
  let type, mtime, content, weak;

  fs.stat(filePath, function (err, stats) {
    if (err) {
      throw new Error(err.message);
    }

    type = mime.getType(filePath);
    mtime = toUTCTime(stats.mtime);
    res.setHeader('Content-Type', `${type}; charset=utf8`);
    weak = statTag(stats);

    if (NEGOTIATE_CACHE_TYPES.etag) {
      res.setHeader('ETag', weak);
    }

    if (NEGOTIATE_CACHE_TYPES.modified) {
      res.setHeader('Last-Modified', toUTCTime(mtime));
    }

    /**
     * 服务器资源是否为新鲜的, 如果不是最新鲜的则继续使用浏览器缓存
     */
    if (isFresh(req, res)) {
      res.statusCode = 304;
      return setHeader(res, () => {
        res.setHeader('ETag', weak);
        res.setHeader('Last-Modified', toUTCTime(mtime));
      });
    }


    content = fs.readFileSync(filePath);
    setHeader(res, content);
  });
}

function isFresh (req, res) {
  return fresh(req.headers, {
    'etag': res.getHeader('ETag'),
    'last-modified': res.getHeader('Last-Modified')
  })
}

server.listen(3002);
