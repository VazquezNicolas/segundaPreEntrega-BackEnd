const {Router} = require('express')
const Carts = require('../../model/Cart.model ')
const FilesDao = require('../../dao/files.dao');


const router = Router()
const cartFile = new FilesDao('products.json')

//Mostrar todos los carritos
// router.get('/', async (req,res) => {
//     try {
//         const cart = await Carts.find()
//         res.json(cart)

//     } catch (error) {
//         res.status(400).json({status: 'error', error})
//     }
// })
router.get('/',async (req,res)=>{
    let page = parseInt(req.query.page);
    let limit = req.query.limit


    if(!limit){ limit = 10}

    if(!page) page=1;
    //Lean es crucial para mostrar en Handlebars, ya que evita la "hidratación" del documento de mongoose,
    //esto hace que a Handlebars llegue el documento como plain object y no como Document.
    let result = await Carts.paginate({},{page,limit,lean:true})
    result.prevLink = result.hasPrevPage?`http://localhost:3000/api/carts?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:3000/api/carts?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)
    res.render('carts',result)
})
//Agregar producto a carrito
router.put('/:cid/products/:pid', async (req,res) => {
    try {
    const {cid, pid} = req.params

    const cart = await Carts.findOne ({ _id: cid})
    const product = await Products.findOne ({ _id: pid})
    cart.products.push({product})
        
    const response = await Carts.updateOne({_id: cid}, cart)

    res.json({ message: response})
    } catch (error) {
    
        res.status(400).json({status: 'error', error})
    }
})

//Agregar carrito nuevo
router.post('/', async (req,res) => {
    try {
        const sinEstoNoFunciona = null
        const newCart = await Carts.create(sinEstoNoFunciona)   
        console.log(newCart)

        res.status(201).json({message: `Nuevo Carrito Agregado! `})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 'error', error})
    }
})

//Eliminar producto de un carrito
router.delete('/:cid/products/:pid', async (req,res) => {
    try {
    const {cid, pid} = req.params

    const cart = await Carts.findOne ({ _id: cid})
    const product = await Products.findOne ({ _id: pid})

    let i = 0;

    console.log(cart.products.length)
    if(cart.products.length > 0){
        while (i != -1){
            if(cart.products[i].product == pid){
            cart.products.splice(0,(i+1))
            i = -1 //Corto el while
            }else {
                i++
            }
        }
    await Carts.updateOne({_id: cid}, cart)
    res.json({ message: "Producto eliminado"})
    }else{
    res.json({ message: "El carrito esta vacio!"})
    }
    } catch (error) {
    
        console.log(error)
        res.status(400).json({message: "No se encontro el id del producto o carrito"})
    }
})

//Eliminar todos los productos del carrito
router.delete('/:cid', async (req,res) => {
    try {
    const {cid} = req.params

    const cart = await Carts.findOne ({ _id: cid})
    cart.products = []

    await Carts.updateOne({_id: cid}, cart)

    res.json({ message: "Se a vaciado el carrito!"})
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 'error', error})
    }
})

module.exports = router