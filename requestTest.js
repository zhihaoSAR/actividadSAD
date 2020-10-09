const http = require('http');
var put = {
    host: 'localhost',
    port: 3000,
    path: '/register/hola/1.0.0/80',
    method: 'PUT'
  };
  var get = {
    host: 'localhost',
    port: 3000,
    path: '/find/hola/1.0.0',
    method: 'GET'
  };

  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });
  req.end();