const {Router} = require('express')
const {products} = require ('../../productsManager');

const router = Router()

//Todos los productos
router.get('/', (req,res) => {
  
    const limit = req.query.limit;
    const productos =   products.getProducts();
    
    console.log(productos)
    if (limit){
        respuesta =  productos.slice(0,limit)
    } else {
        respuesta = productos;
    }
        res.send(respuesta) 
   // res.render('home.handlebars', {respuesta} )
});

//Producto por id
router.get('/:pid', (req,res) => {
    const pid = req.params.pid;
    const respuesta = products.getProductsById(pid);
    res.send({respuesta})  
  });

//Agregar Producto
router.post('/', (req,res) => {
const {title, description, price, thumbnail, code, stock, status, category} = req.body;
products.addProduct(title, description, price, thumbnail, code, stock, status, category);

res.status(201).json({message: '¡Producto Agregado!'})
})

//Actualizar Producto
router.put('/:pid', (req,res) => {
    const pid = req.params.pid;
    const {title, description, price, thumbnail, code, stock, status, category} = req.body;
    products.updateProduct(title, description, price, thumbnail, code, stock, status, category,pid);

    res.status(201).json({message: '¡Producto Modificado!'})

})

//Eliminar por Id
router.delete('/:pid', (req,res) => {
    
        const pid = req.params.pid;
         console.log(pid+"desde router")
         products.deleteProduct(pid)

       res.status (201).json({message: '¡Producto Eliminado!'})    
})


module.exports = router