/**
 * Created by qiqf on 2020/7/29
 */
const http = require("http")
const path = require("path")
const fs = require("fs")
const url = require("url")
const mime = require("mime")

/**
 * 是否开启协商缓存
 * @type {boolean}
 */
const IS_NEGOTIATE_CACHE = false
/**
 * 缓存的类型
 * @type {{modified: boolean, etag: boolean}}
 */
const NEGOTIATE_CACHE_TYPES = {
  'modified': false,
  'etag': false
}

const server = http.createServer(onRequest)

function onRequest(req, res) {
  let {pathname} = url.parse(req.url)

  if ("/favicon.ico" === pathname) return

  const staticDirPath = path.resolve(__dirname, "public")

  if ("GET" === req.method || "HEAD" === req.method) {
    let content, type
    if ("/" === pathname) {
      const filePath = path.resolve(staticDirPath, "index.html")
      content = fs.readFileSync(filePath)
      type = mime.getType(filePath)
      setHeader(res, content, () => {
        res.setHeader("Content-Type", `${type}; charset=utf8`)
      })
    } else {
      const filePath = path.join(staticDirPath, pathname)
      /**
       * 在不开启协商缓存的情况
       */
      if (!IS_NEGOTIATE_CACHE) {
        content = fs.readFileSync(filePath)
        type = mime.getType(filePath)
        return setHeader(res, content, () => {
          res.setHeader("Content-Type", `${type}; charset=utf8`)
        })
      }

      send(req, res, filePath)
    }
  } else {
    res.end(`
      not supper ${pathname} : ${req.method}
    `)
  }
}

function setHeader(res, content, fn) {
  if (typeof content === "function") {
    fn = content
    content = ""
  }
  // res.setHeader("Pragma", "no-cache")
  // res.setHeader("Expires", new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toGMTString())
  res.setHeader("Cache-Control", "max-age=10")
  fn && fn()
  res.end(content)
}

/**
 * 转换时间为 UTC  格式
 * @param time
 * @returns {string}
 */
function toUTCTime(time) {
  return new Date(time).toUTCString()
}

/**
 * 生成 Etag 值
 * @param stat
 */
function statTag(stat) {
  const mtime = stat.mtime.getTime().toString(16)
  const size = stat.size.toString(16)

  return '"' + size + '-' + mtime + '"'
}

function send(req, res, filePath) {
  let modified = req.headers["if-modified-since"]
  let etag = req.headers['if-none-match']
  let type, mtime, content, weak

  fs.stat(filePath, function (err, stats) {
    if (err) {
      throw new Error(err.message)
    }

    type = mime.getType(filePath)
    mtime = toUTCTime(stats.mtime)
    res.setHeader("Content-Type", `${type}; charset=utf8`)
    weak = 'W/' + statTag(stats)

    /**
     * 命中 Etag 协商缓存, 服务器资源为发生改变, 则使用客户端缓存
     */
    if (etag && etag === weak) {
      res.statusCode = 304
      return setHeader(res, () => {
        res.setHeader("ETag", weak)
      })
    }

    /**
     * 协商缓存, 如果客户端缓存资源依然新鲜, 服务器资源未发生改变, 则使用客户端缓存
     */
    if (modified === mtime) {
      res.statusCode = 304
      return setHeader(res, () => {
        res.setHeader("Last-Modified", toUTCTime(mtime))
      })
    }

    if (NEGOTIATE_CACHE_TYPES.etag) {
      res.setHeader("ETag", weak)
    }

    if (NEGOTIATE_CACHE_TYPES.modified) {
      res.setHeader("Last-Modified", toUTCTime(mtime))
    }

    content = fs.readFileSync(filePath)
    setHeader(res, content)
  })
}

server.listen(3001)
