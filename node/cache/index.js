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
    } else {
      const filePath = path.join(staticDirPath, pathname)
      content = fs.readFileSync(filePath)
      type = mime.getType(filePath)
    }

    // 缓存 5s
    res.setHeader("Cache-Control", "max-age=5")
    // res.setHeader("Pragma", "no-cache")
    // 缓存 10s
    res.setHeader("Expires", new Date(Date.now() + 1000 * 10).toGMTString())
    res.setHeader("Content-Type", `${type}; charset=utf8`)
    res.end(content)
  } else {
    res.end(`
      not supper ${pathname} : ${req.method}
    `)
  }
}

server.listen(3001)
