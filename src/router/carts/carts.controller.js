const {Router} = require('express')
const Carts = require('../../model/Cart.model ')
const FilesDao = require('../../dao/files.dao');
const Products = require('../../model/Products.model');

const router = Router()
const cartFile = new FilesDao('products.json')

router.get('/', async (req,res) => {
    try {
        const cart = await Carts.find()
        res.json(cart)

    } catch (error) {
        res.status(400).json({status: 'error', error})
    }
})

// router.put('/:cid', async (req,res) => {
//     try {
//     const {cid} = req.params
//     const {product} = req.body

//     const cart = await Carts.findOne ({ _id: cid})
//     cart.products.push({product})
        
//     const response = await Carts.updateOne({_id: cid}, cart)

//     res.json({ message: response})
//     } catch (error) {
    
//         res.status(400).json({status: 'error', error})
//     }
// })
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

//Agregar carrito
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

//

module.exports = router