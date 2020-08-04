## Egg 小计

### Middleware
洋葱模型

需要 exports 一个函数, 接受两个参数
1. options
2. app  Application 的实例

使用中间件, 手动挂载

单个路由中间件处理
Async middleware = app.middleware.xxx(options) 

框架默认中间件

应用层的中间件不能与框架默认中间件同名

通用配置
- enable
- match
- ignore

## 路由
app/router 用于统一所有路由规则

路由的 controller 支持两种写法:
- app.controller.user.fetch
- 'user.fetch'

支持中间件串行执行

CRUD 路径结构

内部重定向
访问 A 被路由到 B, 也是 router 中已配置好的路由路径

## 控制器 Controller
1. 获取用户传递过来的请求参数
2. 校验、组装参数
3. 调用 Service 进行业务处理
4. 响应

Controller 每次请求都会实例化一个全新的对象

query 重复键值时, 只取 key 第一次出现时的值

### body
url 长度有所限制
敏感的数据通过 URL 传递会不安全

POST 请求体常用格式, json 或 Form, Egg 内置了 bodyParser

## 服务 Service

业务逻辑封装的一个抽象，保持业务逻辑独立性和可服用性。

## 插件

Koa 中间件的定位是拦截用户请求，在它之前做一些事情，例如：鉴权、安全检查、访问日志等。

一个插件就是一个应用。没有独立的 Router 和 Controller

**plugin** 配置项
学习如何开发一个 egg 插件

## 定时任务

1. 上报应用状态
2. 更新本地缓存
3. 定时文件切割，临时文件删除

type:
1. worker
2. all

扩展定时任务类型

## 框架扩展
application
context
request
response
helper

## 启动自定义

