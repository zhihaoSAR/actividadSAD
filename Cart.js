


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

    


    _anyadirCarro(producto)
    {
        //comprobar
        let cantidad = 1;
        let res = false;
        if(this.carro[id])
        {
            cantidad += carro[id]["cantidad"];
        }
        if(cantidad <= producto["cantidad"] )
        {
            
            if(this.carro[id])
            {
                this.carro[id]["cantidad"]++;
            }
            else{
                this.carro[id] = {"nombre":producto["nombre"], "cantidad": 1};
            }
            res = true;
        }
        return new Promise((resolve, reject) => {
                resolve(res);
        } );
        
    }
    anyadirCarro(producto)
    {
        if(host == "desconocido")
        {
            return buscarMongo().then(()=>{return consultarProducto(producto).then(this._anyadirCarro,
                                            (err) => { console.error(err); host = "desconocido"  })})
        }
        else{
            return consultarProducto(producto).then(this._anyadirCarro,(err) => { console.error(err); host = "desconocido"  })
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






