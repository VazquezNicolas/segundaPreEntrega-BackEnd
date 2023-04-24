const {Router} = require('express')
const {products} = require ('../../productsManager');
const Products = require('../../model/Products.model');
const FilesDao = require('../../dao/files.dao');

const router = Router()
const productsFile = new FilesDao('products.json')
// //Todos los productos
// router.get('/', (req,res) => {
  
//     const limit = req.query.limit;
//     const productos =   products.getProducts();
    
//     console.log(productos)
//     if (limit){
//         respuesta =  productos.slice(0,limit)
//     } else {
//         respuesta = productos;
//     }
//         res.send(respuesta) 
//    // res.render('home.handlebars', {respuesta} )
// });

router.get('/',async (req,res)=>{
    let page = parseInt(req.query.page);
    let limit = req.query.limit

    if(!limit){ limit = 10}

    if(!page) page=1;
    //Lean es crucial para mostrar en Handlebars, ya que evita la "hidratación" del documento de mongoose,
    //esto hace que a Handlebars llegue el documento como plain object y no como Document.
    let result = await Products.paginate({},{page,limit,lean:true})
    result.prevLink = result.hasPrevPage?`http://localhost:3000/api/products?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:3000/api/products?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)
    res.render('products',result)
})

// router.get('/', async (req,res) => {
//     try {
//         const limit = req.query.limit;
//         const productos =   products.getProducts();
//         const product = await Products.find()
        
//     if (limit){
//         respuesta =  productos.slice(0,limit)
//     } else {
//         respuesta = productos;
//     }
//         res.json({ status: 'success', message: product }) 
//     }catch (error) {
//         console.log(error)
//         res.status(400).json({status: 'error', error})
//     }
// });

router.get('/loadData', async (req,res) => {
    try {
        const products = await productsFile.getItemsDao()
        const newProducts = await Products.insertMany(products)
        res.json({ status: 'success', mensage: newProducts })
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 'error', error})
    }
})

//Producto por id
router.get('/:pid', (req,res) => {
    const pid = req.params.pid;
    const respuesta = products.getProductsById(pid);
    res.send({respuesta})  
  });

//Agregar Producto
// router.post('/', (req,res) => {
// const {title, description, price, thumbnail, code, stock, status, category} = req.body;
// products.addProduct(title, description, price, thumbnail, code, stock, status, category);

// res.status(201).json({message: '¡Producto Agregado!'})
// })

router.post('/', async (req,res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category} = req.body
        const newProductInfo = { title, description, price, thumbnail, code, stock, status, category}

        const newProduct = await Products.create(newProductInfo)

        res.json({status: 'success', message: newProduct})
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 'error', error})
    }
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