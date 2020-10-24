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
    port: 3000,
    path: '/find/mongoAPI/1.0.0',
    method: 'GET'
  };
  var post = {
    host: 'localhost',
    port: 9999,
    path: '/editar/0/4',
    method: 'POST'
  };

  var req = http.request(get, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      inf = JSON.parse(chunk);
      console.log(typeof(inf.ip))
      var get2 = {
        host: inf.ip.split(':').pop().slice(0, -1),
        port: inf.port,
        path: '/',
        method: 'GET'
      };

      var req = http.request(get2, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          console.log(chunk)
          
        });
      });
      req.end();



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