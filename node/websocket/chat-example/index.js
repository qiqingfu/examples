const app = require('express')();
const http = require('http').Server(app);
const io = require("socket.io")(http)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.emit('res', '欢迎光临聊天室')

  socket.on('chat message', function (msg) {
    socket.broadcast.emit('res', msg.split('').reverse().join(''))
    socket.emit('res', msg.split('').reverse().join(''))
  })

  socket.on('disconnect', function () {
    console.log('user disconnected');
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});