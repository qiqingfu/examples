/**
 * Created by qiqf on 2020/7/20
 */
const Koa = require("koa")
const path = require("path")
const fs = require("fs")

const app = new Koa()

/**
 * @param ctx http (request | response) 的上下文对象
 */
app.use(async ctx => {
  const { request: { url } } = ctx;

  if (url === "/") {
    ctx.type = "text/html"
    ctx.body = fs.readFileSync("./index.html", "utf-8")
  } else if (url.endsWith(".js")) {
    const file = path.resolve(__dirname, url.slice(1))
    ctx.type = "application/javascript"
    ctx.body = fs.readFileSync(file, "utf-8")
  }
})

app.listen(8081, () => {
  console.log("http server http://localhost:8081")
})
