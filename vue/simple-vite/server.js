/**
 * Created by qiqf on 2020/7/20
 */
const Koa = require("koa")
const path = require("path")
const fs = require("fs")
const compilerSfc = require("@vue/compiler-sfc")
const compilerDom = require("@vue/compiler-dom")

const app = new Koa()

function rewriteImport(content) {
  return content.replace(/from ['"]([^'"]+)['"]/g, function (s0, s1) {
    // . ../ /开头的，都是相对路径
    if (s1[0] !== '.' && s1[1] !== '/') {
      return `from '/@modules/${s1}'`
    } else {
      return s0
    }
  })
}

/**
 * @param ctx http (request | response) 的上下文对象
 */
app.use(async ctx => {
  const {request: {url, query}} = ctx

  if (url === "/") {
    ctx.type = "text/html"
    let content = fs.readFileSync("./index.html", "utf-8")
    content = content.replace('<script ', `
      <script>
      window.process = {
        env: {
          NODE_ENV: 'dev'
        }
      }
      </script>
      <script
    `)
    ctx.body = rewriteImport(content)
  } else if (url.endsWith(".js")) {
    const p = path.resolve(__dirname, url.slice(1))
    ctx.type = 'application/javascript'
    const content = fs.readFileSync(p, 'utf-8')
    ctx.body = rewriteImport(content)
  } else if (url.endsWith(".css")) {
    /**
     * css 支持
     */
    const p = path.resolve(__dirname, url.slice(1))
    const file = fs.readFileSync(p, "utf-8")
    const content = `
      const css = "${file.replace(/\r\n/g, '')}"
      let link = document.createElement('style')
      link.setAttribute('type', 'text/css')
      document.head.appendChild(link)
      link.innerHTML  = css;
      export default css
    `

    ctx.type = "application/javascript"
    ctx.body = content;
  } else if (url.startsWith("/@modules/")) {
    const prefix = path.resolve(__dirname, "node_modules", url.replace("/@modules/", ""))
    const module = require(path.resolve(prefix, 'package.json')).module
    const filePath = path.resolve(prefix, module)
    const moduleFile = fs.readFileSync(filePath, "utf-8")
    ctx.type = "application/javascript"
    ctx.body = rewriteImport(moduleFile)

    /**
     * process is not defined
     */
  } else if (url.indexOf(".vue") > -1) {
    const p = path.resolve(__dirname, url.split('?')[0].slice(1))
    const {descriptor} = compilerSfc.parse(fs.readFileSync(p, "utf8"))

    /**
     * 请求的 *.vue 文件, 返回 js
     * 并不是 template 和 css
     */
    if (!query.type) {
      ctx.type = "application/javascript"
      ctx.body = `
        ${rewriteImport(descriptor.script.content.replace('export default ', 'const __script = '))}
        
        import { render as __render } from "${url}?type=template"
        __script.render = __render
        export default __script
      `
    } else if (query.type === "template") {
      const template = descriptor.template
      const render = compilerDom.compile(template.content, {mode: "module"}).code
      ctx.type = "application/javascript"
      ctx.body = rewriteImport(render)
    }
  }
})

app.listen(3001, () => {
  console.log("http server http://localhost:3001")
})

/**
 * 处理 .vue 单文件解析
 *
 * 1. 发起 .vue的请求后，先把 script 解析出来，然后里面加上请求 template 和 css 的import 语句
 * 2. 把 template 解析成 render 函数，返回拼成一个组件
 *
 * 解析单文件，@vue/compiler-sfc
 */

/**
 * 处理 type=template 的解析
 *
 * 模版解析 @vue/compiler-dom 把 html 解析成 render
 */
