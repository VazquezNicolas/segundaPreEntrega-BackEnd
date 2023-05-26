const {Router} = require('express')
const {products} = require ('../../productsManager');
const Products = require('../../dao/model/Products.model');
const FilesDao = require('../../dao/files.dao');
const Carts = require('../../dao/model/Cart.model ');

const router = Router()
const productsFile = new FilesDao('products.json')
// //Todos los productos

router.get('/',async (req,res)=>{
    let limit = req.query.limit
    let filtro = req.query.filtro
    let page = parseInt(req.query.page);

    if(!limit) limit = 10
    if(!page) page=1;

    if (!filtro) {
         let result = await Products.paginate({},{page,limit,lean:true,})
         let cart = await Carts.findOne()
         result.status = "succes"
         result.prevLink = result.hasPrevPage?`http://localhost:3000/api/products?limit=${limit}&page=${result.prevPage}`:'';
         result.nextLink = result.hasNextPage?`http://localhost:3000/api/products?limit=${limit}&page=${result.nextPage}`:'';
         result.isValid= !(page<=0||page>result.totalPages)
         res.render('products', {
            result: result.docs,
            isValid: result.isValid,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevLink,
            nextLink: result.nextLink,
            cartId: result.cartId,
        })
         console.log(result)
         
    } else {
        let result = await Products.paginate({category: `${filtro}`},{page,limit,lean:true,})
        let cart = await Carts.findOne()
        result.status = "succes"
        result.prevLink = result.hasPrevPage?`http://localhost:3000/api/products?limit=${limit}&filtro=${filtro}&page=${result.prevPage}`:'';
        result.nextLink = result.hasNextPage?`http://localhost:3000/api/products?limit=${limit}&filtro=${filtro}&page=${result.nextPage}`:'';
        result.isValid= !(page<=0||page>result.totalPages)
        res.render('products', {
            result: result.docs,
            isValid: result.isValid,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevLink,
            nextLink: result.nextLink,
            cartId: result.cartId,
        })
    }
        
})

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

router.post('/', async (req,res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category, quantity, cartId} = req.body
        const newProductInfo = { title, description, price, thumbnail, code, stock, status, category, quantity, cartId}

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