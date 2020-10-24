const { json } = require('express');
const http = require('http');
var put = {
    host: 'localhost',
    port: 9999,
    path: '/add/1/product_b/2',
    method: 'PUT'
  };
  var get = {
    host: 'localhost',
    port: 9999,
    path: '/',
    method: 'GET'
  };
  var post = {
    host: 'localhost',
    port: 9999,
    path: '/editar/0/4',
    method: 'POST'
  };

  var req = http.request(post, function(res) {
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