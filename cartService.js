/*

*/

var mgdb=require('mongodb');
const { rawListeners, exit } = require('process');

var mongoclient = mgdb.MongoClient;


//var url='mongodb://mongodb:27017/almacen';
class Cart{
    constructor(url)
    {
        this.url = url;
        this.carro =[];

    }

    obtenerProducto(callback)
    {
        mongoclient.connect(this.url,function (err,db) {
            if (err)
            {
                console.log(err);
                return;
            }
            var dbase = db.db("almacen");
            dbase.collection("productos"). find({}).toArray(function(err, result) { 
                if (err) {
                    console.log(err);
                    return;
                }
                
                callback(result);
                db.close();
            });
        });
    }
    anyadirCarro(id,producto,callback)
    {
        //comprobar
        let cantidad = 1;
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
            callback(true);
        }
        else{
            callback(false);
        }
        
    }
    quitar(id,callback)
    {
        delete this.carro[id];
        callback();
    }

}

module.exports =function(url){
    return new Cart(url);
};






