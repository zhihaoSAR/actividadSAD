var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var clients = []
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

function sendMsg(msg, user,channel = 'chat message')
{
  for(let client in clients)
  {
    if(client != user.id)
    {
      
      clients[client].socket.emit(channel, msg)
    }
  }
}


io.on('connection', function(socket){
  socket.on('disconnect', function(){
    if(clients[socket.id] != undefined){
      console.log(clients[socket.id].name+" disconectado")
      sendMsg(clients[socket.id].name+" disconectado",socket)
      delete clients[socket.id]
      
    }
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    sendMsg(clients[socket.id].name+": "+ msg,socket)
  });
  socket.on('name', function(msg){
    console.log(msg+ ' conectado');
    if(clients[socket.id] != undefined)
    {
      let client = clients[socket.id]
      sendMsg(client.name+ ' ha cambiado nombre por '+ msg,socket)
      client.name = msg
    }
    else{
      clients[socket.id] = {name: msg, socket:socket}
      sendMsg(msg+ ' conectado',socket)
    }
     
  });

  socket.on('escribiendo', function(msg){
    if(clients[socket.id]!= undefined)
    {
      if(msg=='')
      {
        sendMsg('',socket,'escribiendo')
      }
      else{
        sendMsg(clients[socket.id].name+ ' está escribiendo',socket,'escribiendo')
      }
    }
    
     
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
