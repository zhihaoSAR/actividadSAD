const { json } = require('express');
const http = require('http');
var put = {
    host: 'localhost',
    port: 9998,
    path: '/add/0/4',
    method: 'PUT'
  };
  var get = {
    host: 'localhost',
    port: 9998,
    path: '/',
    method: 'GET'
  };
  var post = {
    host: 'localhost',
    port: 9998,
    path: '/delete/0',
    method: 'DELETE'
  };

  var req = http.request(put, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log(chunk)

    });
  });
  req.end();

  /*
  productos = JSON.parse(chunk);
      myDict = []
      for(let producto of productos)
      {
        myDict[producto.id] ={"id":producto.id,"nombre": producto.nombre, "cantidad": producto.cantidad}
      }
      console.log(myDict)*/