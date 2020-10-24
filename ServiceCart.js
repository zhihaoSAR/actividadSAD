express = require('express');

 
if(process.argv.length<4)
{
console.log("forma de usar node ServiceCart.js hostServiceRegistry puerto");
process.exit();
}
cart = require('./Cart')(process.argv[2],process.argv[3]);

var register = {
    host: process.argv[2],
    port: process.argv[3],
    path: '/register/Cart/1.0.0/9998',
    method: 'PUT'
  };

const app = express();
  app.get('/', (req, res) => {
    return res.send(cart.obtenerCarro())
  });

   
  app.put('/add/:productoId/:cantidad', (req, res) => {
    productoID = req.params["productoId"]
    cantidadFinal = req.params["cantidad"]
    productoID = parseInt(productoID)
    cantidadFinal = parseInt(cantidadFinal)
    if(!isNaN(productoID) && !isNaN(cantidadFinal)){
        return cart.anyadirCarro({id:productoID,cantidad:cantidadFinal}).then((inf) =>{
            res.send(inf)
        } )
    }
    else{
        res.send("formato incorrecto")
    }
  });
   
  app.delete('/delete/:productoID', (req, res) => {
    productoID = req.params["productoID"]
    productoID = parseInt(productoID)
    if(!isNaN(productoID)){
        cart.quitar(productoID)
        return res.send("quitado")
    }
    else{
        res.send("formato incorrecto")
    }
  });
   
  app.listen(9998, () =>
    console.log(`Example app listening on port 9998!`),
  );

  const http = require('http');

  var req = http.request(register, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log(chunk);
    });
  });
  req.end();