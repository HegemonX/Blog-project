var http = require('http');
var WebSocket = new require('ws');
var fs = require('fs');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});

// ------ запустить сервер -------

var clients =  {}

const server = http.createServer(function(req, res) {
    file.serve(req, res)
});
const webSocketServer = new WebSocket.Server({server})

webSocketServer.on('connection', function(ws) {
  var id = Math.random();
  clients[id] = ws;
  console.log("новое соединение " + id);

  ws.on('message', function(message) {
      console.log("получено сообщение " + message);

      for (var key in clients) {
          clients[key].send(message);
      }
  });

  ws.on('close', function() {
      console.log('соединение закрыто ' + id);
      delete clients[id];
  });

});

server.listen(8080);
