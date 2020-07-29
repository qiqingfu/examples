/**
 * Created by qiqf on 2020/7/29
 */
const http = require("http")
const path = require("path")
const fs = require("fs")
const url = require("url")
const mime = require("mime")

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
      let modified = req.headers["if-modified-since"]
      let etag = req.headers['etag']
      const filePath = path.join(staticDirPath, pathname)
      fs.stat(filePath, function (err, stats) {
        if (err) {
          throw new Error(err.message)
        }

        if (etag) {

        }

        let mtime = toUTCTime(stats.mtime)
        /**
         * 协商缓存, 如果客户端缓存资源依然新鲜, 服务器资源未发生改变, 则使用客户端缓存
         */
        if (modified === mtime) {
          res.statusCode = 304
          setHeader(res,  () => {
            res.setHeader("Content-Type", `${type}; charset=utf8`)
            res.setHeader("Last-Modified", toUTCTime(mtime))
          })
          res.end()
        } else {
          content = fs.readFileSync(filePath)
          type = mime.getType(filePath)
          setHeader(res, content, () => {
            res.setHeader("Content-Type", `${type}; charset=utf8`)
            res.setHeader("Last-Modified", toUTCTime(mtime))
          })
        }
      })
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
  // 缓存 5s
  res.setHeader("Cache-Control", "no-cache")
  // res.setHeader("Pragma", "no-cache")
  // 缓存 10s
  // res.setHeader("Expires", new Date(Date.now() + 1000 * 10).toGMTString())
  fn()
  res.end(content)
}

function toUTCTime(time) {
  return new Date(time).toUTCString()
}

server.listen(3001)
