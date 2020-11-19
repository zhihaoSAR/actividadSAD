var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require("socket.io").listen(server),
  nicknameList = {};

server.listen(3000);

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

//se conecta un usuario
io.on('connection', function(socket) {
  socket.on('enviar msg', function(data, callback) {
    var msg = data.trim();
    //comprobar si es un mensaje privado
    if(msg.substr(0, 3) === '/p ') {
      msg = msg.substr(3);
      var ind = msg.indexOf(' ');
      //obtener nickname
      if(ind !== -1) {
        var name = msg.substring(0, ind);
        var msg = msg.substring(ind + 1);
        //comprobar si nickname existe
        if(name in nicknameList) {
          nicknameList[name].emit('privado', {msg : msg, nick : socket.nickname});
        }
        else {
          //No se ha introducido un nickname correcto
        }
      }
      else {
        //No se ha escrito mensaje
      }
    }
    //mensaje normal
    else {
      // emitir mensaje y nickname
      socket.broadcast.emit('nuevo msg', {msg: data, nick: socket.nickname});
    }
  });
  
  //Se une un nuevo usuario
  socket.on('nuevo usuario', function(data, callback) {
    if(data in nicknameList) {
      callback(false);
    }
    else {
      callback(true);
      socket.nickname = data;
      nicknameList[socket.nickname] = socket;
      updateNicknameList();
      io.sockets.emit('se conecta', {msg: data, nick: socket.nickname});
    }
  });
  
  //Se desconecta un usuario  
  socket.on('disconnect', function(data) {
    if(!socket.nickname) return;
    delete nicknameList[socket.nickname];
    updateNicknameList();
    io.sockets.emit('se desconecta', {msg: data, nick: socket.nickname});
  });

  socket.on('escribiendo', (data) => {
    socket.broadcast.emit('escribiendo', {nick: socket.nickname});
  });
    
  function updateNicknameList() {
    io.sockets.emit('usuarios', Object.keys(nicknameList));
  }
});
