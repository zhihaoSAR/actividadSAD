
var mgdb=require('mongodb');

var mongoclient = mgdb.MongoClient;


//var url='mongodb://mongodb:27017/almacen';
class MongoAPI{
    constructor(url)
    {
        this.url = url;

    }

    obtenerProductos(callback)
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
    obtenerProducto(producto)
    {
        
    }

}

module.exports =function(url){
    return new Cart(url);
};






