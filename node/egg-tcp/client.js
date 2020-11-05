/**
 * Created by qiqf on 2020/8/lesson13
 */

/**
 * 客户端服务器
 *
 * 访问 egg 的服务器, http://127.0.0.1:5001
 */

const net = require("net")

/**
 * 用于创建 net.Socket 的工厂函数，立即使用 socket.connect() 初始化连接，然后返回启动连接的 net.Socket
 * 当建立连接之后, 在返回的 socket 上将触发一个 connect 事件。
 * @type {Socket}
 */
const client = net.createConnection({
  port: 5001,
  host: '127.0.0.1',
})

client.on('connect', function () {
  console.log('client 已经与 http://127.0.0.1:5001 服务器建立连接')
})

client.on('error', function (err) {
  console.log('client 与 http://127.0.0.1:5001 连接传输错误', err)
})

// 当 socket 的另一端发送一个 FIN 包的时候触发，从而结束 socket 的可读端。
client.on('end', function () {
  console.log('client 已经与 http://127.0.0.1:5001 服务器关闭连接')
})

client.on('data', function (chunk) {
  console.log(`服务器发来数据: ${chunk.toString()}.`);
})

let n = 0, timer = null;

timer = setInterval(() => {

  if (n >= 10) {
    client.end('客户端关闭连接')
    clearInterval(timer)
    return;
  }

  client.write(String(n++))
}, 3000)

