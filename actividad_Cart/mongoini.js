
 var mgdb=require('mongodb');

  var mongoclient = mgdb.MongoClient;

var url='mongodb://';
if(process.argv.length<4)
{
  console.log("forma de usar node mongoini host puerto");
}
url+= process.argv[2];
url+= ":"+process.argv[3]+"/almacen";

mongoclient.connect(url,function (err,db) {
  if (err) throw err;
 	console.log('conectado');
  var dbase = db.db("almacen");
  dbase.createCollection('productos', function (err, res) {
    if (err) throw err;
    console.log("creado productos!");
  });
  var productos =[
    {id:0 , nombre: 'producto a' , cantidad: 4},
    {id:1 , nombre: 'producto b' , cantidad: 1},
    {id:2 , nombre: 'producto c' , cantidad: 2},
    {id:3 , nombre: 'producto d' , cantidad: 5},
    {id:4 , nombre: 'producto e' , cantidad: 0},
  ];
  dbase.collection("productos").insertMany(productos,function(err,res){
    if(err) throw err;
    console.log("inicializado productos!");
  });
  db.close();
});


 //});

