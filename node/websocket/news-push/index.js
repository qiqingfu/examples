const WebSocket = require("ws")
const server = new WebSocket.Server({ port: 1234, path: '/t' })

server.on('close', function () {
  console.log('ws:closed')
})

server.on('error', function (error) {
  console.log('ws:', error)
})

server.on('connection', function (ws, req) {

  ws.on('open', function () {
    console.log('connection!')
  })

  setInterval(function countDown() {
    ws.send(new Date().toUTCString())
  },1000)
})