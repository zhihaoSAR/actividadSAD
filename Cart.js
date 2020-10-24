
const http = require('http');

var host = "desconocido"
var port = 0

var serviceRegistry = {
    host: "unknown",
    port: "unknown",
    path: '/find/mongoAPI/1.0.0',
    method: 'GET'
  };

function buscarMongo() {
    return new Promise(function(resolve, reject) {
        let req = http.request(serviceRegistry, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                inf = JSON.parse(chunk);
                host = inf.ip.split(':').pop().slice(0, -1)
                port = inf.port
                resolve()
            });
        });
        req.on('error', function(err) {
            reject(err);
        });
        // IMPORTANT
        req.end();
    });
}




function consultarProducto(producto)
{

    
    return new Promise(function(resolve, reject) {

        let consulta = {
            host: host,
            port: port,
            path: '/'+ producto.id,
            method: 'GET'
          };

        let req = http.request(consulta, function(res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                resolve(chunk)
            });
        });
        req.on('error', function(err) {
            reject(err);
        });
        req.end();
    });
}

class Cart{
    constructor(host,port)
    {
        serviceRegistry.host = host;
        serviceRegistry.port = port;
        this.carro =[];
    }
    obtenerCarro()
    {
        return this.carro;
    }

    


    comprobarCarro(producto,cant)
    {
        //comprobar
        let cantidad = cant;
        let res = false;
        producto = JSON.parse(producto)
        console.log(cant+" "+producto.cantidad)
        if(this.carro[producto.id])
        {
            cantidad += this.carro[producto.id]["cantidad"];
        }
        if(cantidad <= producto.cantidad )
        {
            
            if(this.carro[producto.id])
            {
                this.carro[producto.id]["cantidad"]++;
            }
            else{
                this.carro[producto.id] = {"nombre":producto.nombre, "cantidad": 1};
            }
            res = true;
        }
        return new Promise((resolve, reject) => {
                resolve(res);
        } );
        
    }
    prueba(){
        console.log("hola")
    }
    anyadirCarro(producto)
    {
        let cant = producto.cantidad
        if(host == "desconocido")
        {
            
            return function(cart){ return buscarMongo().then(()=>{
                
                return consultarProducto(producto).then(
                    function(producto){
                        console.log("consultando")
                        return cart.comprobarCarro(producto,cant)
                    }
                    ,
                                            (err) => { console.error(err); host = "desconocido"  })})
            }(this)
        }
        else{
            return function(cart){
                return consultarProducto(producto).then(
                    function(producto)
                    {
                       return cart.comprobarCarro(producto,cant)
                    },(err) => { console.error(err); host = "desconocido"   })
            }(this)
        }
    }
    quitar(id)
    {
        delete this.carro[id];
    }

}

module.exports =function(host,port){
    return new Cart(host,port);
};






