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
const IS_NEGOTIATE_CACHE = true;
/**
 * 缓存的类型
 * @type {{modified: boolean, etag: boolean}}
 */
const NEGOTIATE_CACHE_TYPES = {
  'modified': true,
  'etag': true
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
          res.setHeader("Cache-Control", "max-age=60")
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
  // res.setHeader("Expires", new Date(Date.now() + 1000 * 10).toGMTString())
  res.setHeader("Cache-Control", "no-cache")
  fn && fn()
  res.end(content)
}

function toUTCTime(time) {
  return new Date(time).toUTCString()
}

function send (req, res, filePath) {
  let modified = req.headers["if-modified-since"]
  let etag = req.headers['etag']
  let type, mtime, content;

  fs.stat(filePath, function (err, stats) {
    if (err) {
      throw new Error(err.message)
    }

    type = mime.getType(filePath)
    mtime = toUTCTime(stats.mtime)
    res.setHeader("Content-Type", `${type}; charset=utf8`)

    if (etag) {

    }

    /**
     * 协商缓存, 如果客户端缓存资源依然新鲜, 服务器资源未发生改变, 则使用客户端缓存
     */
    if (modified === mtime) {
      res.statusCode = 304
      setHeader(res,  () => {
        res.setHeader("Last-Modified", toUTCTime(mtime))
      })
    }

    if (NEGOTIATE_CACHE_TYPES.etag) {

    }

    if (NEGOTIATE_CACHE_TYPES.modified) {
      res.setHeader("Last-Modified", toUTCTime(mtime))
    }

    content = fs.readFileSync(filePath)
    setHeader(res, content)
  })
}

server.listen(3001)
