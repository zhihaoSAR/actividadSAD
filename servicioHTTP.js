const http = require('http');
const { domainToASCII } = require('url');
const { type } = require('os');
const fs = require('fs').promises;


var url='mongodb://';
if(process.argv.length<4)
{
console.log("forma de usar node cartService host puerto");
exit();
}
url+= process.argv[2];
url+= ":"+process.argv[3]+"/almacen";

const cart = require('./cartService')(url);

var productos=[];

cart.obtenerProducto(function(result) {
    for(let producto of result)
    {
        productos[producto.id] = {"nombre": producto["nombre"],
                                    "cantidad": producto["cantidad"] };
    }});

function formalizarDatos(callback){
    datos = "";
    fs.readFile("./shop.html")
        .then(contents => {
            datos = contents.toString();
            //productos
            for(let producto in productos)
            {
                datos+=("<li>"+productos[producto]["nombre"] + " <button onclick="+'"{location.href ='+"'/"+producto+"'"+'}">comprar</button> </li> \n');
            }
            //carro
            datos+="<h2>Carro</h2>\n"
            for(let producto in cart.carro)
            {
                datos+=("<li>"+productos[producto]["nombre"] +" cantidad: "+cart.carro[producto]["cantidad"]+ " <button onclick="+'"{location.href ='+"'/-"+producto+"'"+'}">quitar</button> </li> \n');
            }
            callback(datos);
        }).catch(err => {
            console.log(err);
        });
}

function enviarValor(datos,res){
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(datos);
}

function informarAnyadir(quedaStock,datos,callback)
{
    if(quedaStock)
    {
        datos+= "<script>alert('añadido')</script>"
    }
    else{
        datos+= "<script>alert('no queda stock')</script>"
    }
    callback(datos);
}

function informarQuitar(callback)
{
    datos+= "<script>alert('quitado')</script>"
    callback(datos);
}



var requestListener = function (req, res) {

    var { headers, method, url } = req;
    if(headers["sec-fetch-dest"] != 'document')
    {
        res.end();
        return;
    }
    if(url[1] == '-')
    {
        let id = parseInt(req.url[2])
        if( id <= 5)
        {
            cart.quitar(id,function(socketRes){
                return function() {
                    formalizarDatos( (d1)=>{ informarQuitar( (d2)=>{ enviarValor(d2, socketRes) } ) }  )
    
                }
            }(res)
            );
        }
        return;
    }
    let id = parseInt(req.url[1])
    if( id <= 5)
    {
        cart.anyadirCarro(id,productos[id], function(socketRes){
            return function(anyadido) {
                formalizarDatos( function (d1){
                    console.log(anyadido);
                     informarAnyadir(anyadido,d1, (d2)=>{ enviarValor(d2, socketRes) } ) 
                    } )
            }
        }(res)
            
            );
    }
    else
    {
        formalizarDatos((d)=>{  enviarValor(d, res) });
        
    }
    
    
};

const server = http.createServer(
    requestListener).listen(80);


