const http = require('http');
const { domainToASCII } = require('url');
const { type } = require('os');
const { resolve } = require('path');
const { rejects } = require('assert');
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

cart.obtenerProductos().then(function(result) {
    for(let producto of result)
    {
        productos[producto.id] = {"id": producto["id"],"nombre": producto["nombre"],
                                    "cantidad": producto["cantidad"] };
    }});

function formalizarDatos(){
    datos = "";
    return fs.readFile("./shop.html")
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
            return new Promise((resolve,reject) => {
                resolve(datos);
            });
        })
}

function enviarValor(datos,res){
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(datos);
}

function informarAnyadir(quedaStock,datos)
{
    if(quedaStock)
    {
        datos+= "<script>alert('añadido')</script>"
    }
    else{
        datos+= "<script>alert('no queda stock')</script>"
    }
    return new Promise((resolve,rejects) => {
        resolve(datos);
    })
}

function informarQuitar(datos)
{
    datos+= "<script>alert('quitado')</script>"
    return new Promise((resolve,reject) => {resolve(datos)})
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
            cart.quitar(id).then(formalizarDatos).then(informarQuitar).then(function(datos){
                return enviarValor(datos,res);
            })
        }
        return;
    }
    let id = parseInt(req.url[1])
    if( id <= 5)
    {

        cart.anyadirCarro(id,productos[id]).then(function(queda){
            return formalizarDatos().then(function(datos){
                return informarAnyadir(queda,datos);
            } )
        }).then(function(datos){ enviarValor(datos,res)});

    }
    else
    {
        formalizarDatos().then((datos) => {enviarValor(datos,res)});
        
    }
    
    
};

const server = http.createServer(
    requestListener).listen(8000);


