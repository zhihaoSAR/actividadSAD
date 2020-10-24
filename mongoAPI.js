
const mongoose = require('mongoose');
const productoSchema = new mongoose.Schema({
    id: Number,
    nombre: String,
    cantidad: Number
  } , {collection: 'productos'});



//var url='mongodb://mongodb:27017/almacen';
class MongoAPI{
    constructor()
    {
        mongoose.connect('mongodb://localhost:27017/almacen',{ useNewUrlParser: true })
        this.Product = mongoose.model('Product', productoSchema);
    }

    obtenerProductos()
    {
        return this.Product.find().then((result) =>{
            return new Promise((resolve) =>{ resolve(result)})
        })
    }
    obtenerProducto(productoID)
    {
        return this.Product.findOne({id: productoID}).then((result) =>{
            return new Promise((resolve) => {resolve(result)})
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

module.exports =function(){
    return new MongoAPI();
};






