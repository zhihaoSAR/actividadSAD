/*

*/

var mgdb=require('mongodb');
const { resolve } = require('path');
const { rawListeners, exit } = require('process');

var mongoclient = mgdb.MongoClient;


//var url='mongodb://mongodb:27017/almacen';
class Cart{
    constructor(url)
    {
        this.url = url;
        this.carro =[];

    }

    obtenerProductos()
    {
        return new Promise( (resolve, reject) => {
            mongoclient.connect(this.url,function (err,db) {
                
                    if(err){
                        reject(err);
                        return;
                    }
                    var dbase = db.db("almacen");
                    dbase.collection("productos").find({}).toArray(function(err, result) { 
                    if (err) {
                        console.error(err);
                        return;
                    }
                    resolve(result);
                    db.close();
                });
                    
                
                
            });
        });
    }

    anyadirCarro(id,producto)
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
    quitar(id)
    {
        delete this.carro[id];
        return new Promise((resolve,reject) => {
            resolve();
        })
    }

}

module.exports =function(url){
    return new Cart(url);
};






