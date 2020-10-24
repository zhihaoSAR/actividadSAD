
const mongoose = require('mongoose');
const productoSchema = new mongoose.Schema({
    id: Number,
    nombre: String,
    cantidad: Number
  } , {collection: 'productos'});



//var url='mongodb://mongodb:27017/almacen';
class MongoAPI{
    constructor(url)
    {
        this.url = url;
        mongoose.connect('mongodb://localhost:27017/almacen',{ useNewUrlParser: true })
        this.Product = mongoose.model('Product', productoSchema);
    }

    obtenerProductos(callback)
    {
        return this.Product.find().then((result) =>{
            let productos = [];
            for(let producto of result)
            {
                productos[producto.id] = {"id": producto["id"],"nombre": producto["nombre"],
                                            "cantidad": producto["cantidad"] };
            }
            return new Promise((resolve, reject) =>{ resolve(productos)})
        })
    }
    obtenerProducto(productoID)
    {
        return this.Product.findOne({id: productoID}).then((result) =>{
            return new Promise((resolve,reject) => {resolve({"id":result.id,
                                                            "nombre": result.nombre,
                                                            "cantidad": result.cantidad})})
        })
    }
    addProduct(producto)
    {
        return (new this.Product({id:producto.id, nombre:producto.nombre, cantidad: producto.cantidad})).save();
    }
    deleteProduct(productoID)
    {
        return this.Product.deleteOne({id: productoID})
    }
    editProductCount(productoID,cantidadFinal)
    {
        return this.Product.updateOne({id: productoID}, {cantidad:cantidadFinal})
    }
}

module.exports =function(url){
    return new MongoAPI(url);
};






