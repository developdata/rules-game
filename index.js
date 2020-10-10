var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/views/index.html'));
});

io.on('connection', function(socket) {

  socket.on('new rules', function(d) {
    io.sockets.emit('update rules', d);
  });
  
   socket.on('disconnect', function() {
     console.log("disconnected " + socket);
  });
  
}); //END OF SOCKET ON

server.listen(process.env.port || 3000 , () => {
  console.log("Your app is listening on port " + server.address().port);
});