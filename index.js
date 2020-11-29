var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var clients = []
function AllUsers(){
    var usersList = [];
      for (var i = 0; i < clients.length; i++){
        usersList[i] = clients[i].n;
      }
    return usersList;
  }
  function setUserTyping(index){
    var usersList = [];
      for (var i = 0; i < clients.length; i++){
        usersList[i] = clients[i].n; 
      }
    usersList[index] = "💬 " + clients[index].n;
    return usersList;
  }
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket){
  clients.push(socket);
});
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });
  io.on('disconnect', () => {
    console.log('user disconnected');
  });
  io.on('typing', function(){
    io.emit('typing signal', setUserTyping(clients.indexOf(socket))); 
  });
  io.on('disconnect', () => {
    console.log('user disconnected');
  })
http.listen(3000, () => {
  console.log('listening on *:3000');
});