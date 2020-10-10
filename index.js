var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

var rulesArray = [];

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/views/index.html'));
});

// io.on('connection', function(socket) {
// 	console.log(socket.id);

// 	// socket.on('new rules', function(rules){
// 	// 	console.log(rules);
// 	// 	rulesArray = rulesArray.concat(rules);
// 	// 	console.log(rulesArray);

// 	// 	socket.emit('all rules', rulesArray);
// 	// 	console.log('emited')
// 	// });

// 	socket.on('disconnect', function() {
// 		console.log(socket.id);
// 	});

// });

var players = {};

var max = 300;
var min = 2;


//When a browser page connects to the server the function
//io.on is called with the name connection. The function contains
//information about the new socket including an id
io.on('connection', function(socket) {
  
  // console.log(socket)
  
  //When a person connects to the game an socket id is created,
  //An new object is added to the object players for that player
  //A random x and y number is generated between 1 and 300
  //This is used for the intitial position of the circle
  //The name the person typed in is also added to their object
  socket.on('new player', function(d) {
  	console.log(d)
    // players[socket.id] = {
    //   x: Math.floor(Math.random() * (max - min + 1) + min),
    //   y: Math.floor(Math.random() * (max - min + 1) + min),
    //   name: d
    // };

    
    // let nameArray = [];
    // Object.keys(players).forEach(key => {
    //   nameArray.push(players[key].name);
    // });
    
    io.sockets.emit('update player names', d);
    
  });
  
   socket.on('disconnect', function() {
     
     console.log(socket)

    delete players[socket.id];
     
    let nameArray = [];
    Object.keys(players).forEach(key => {
      nameArray.push(players[key].name);
    });
     
      io.sockets.emit('update player names', nameArray);
     
  });
  
  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }
  });
  
}); //END OF SOCKET ON

server.listen(process.env.port || 3000 , () => {
  console.log("Your app is listening on port " + server.address().port);
});