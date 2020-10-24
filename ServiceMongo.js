
express = require('express');
mongoApi = require('./mongoAPI')();
 
const app = express();
  app.get('/', (req, res) => {
    return mongoApi.obtenerProductos().then((productos) => res.send(productos))
  });
  app.get('/:productoID', (req, res) => {

    productoID = req.params["productoID"]
    productoID = parseInt(productoID)
    if(!isNaN(productoID)){
        return mongoApi.obtenerProducto(productoID).then((producto) => res.send(producto))
    }
    else{
        res.send("formato incorrecto")
    }
    
  });
   
  app.post('/editar/:productoID/:cantidad', (req, res) => {
    productoID = req.params["productoID"]
    cantidad = req.params["cantidad"]
    productoID = parseInt(productoID)
    cantidad = parseInt(cantidad)
    if(!isNaN(productoID) && !isNaN(cantidad)){
        return mongoApi.editProductCount(productoID,cantidad).then((inf) =>{
            res.send(inf)
        } )
    }
    else{
        res.send("formato incorrecto")
    }
  });
   
  app.put('/add/:productoId/:nombre/:cantidad', (req, res) => {
    productoID = req.params["productoID"]
    cantidadFinal = req.params["cantidad"]
    productoID = parseInt(productoID)
    cantidadFinal = parseInt(cantidadFinal)
    if(!isNaN(productoID) && !isNaN(cantidadFinal)){
        return mongoApi.addProduct({id:productoID,nombre:req.params["nombre"],cantidad:cantidadFinal}).then((inf) =>{
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
        return mongoApi.deleteProduct(productoID).then((inf) => res.send(inf))
    }
    else{
        res.send("formato incorrecto")
    }
  });
   
  app.listen(9999, () =>
    console.log(`Example app listening on port 9999!`),
  );