const {Router} = require('express')
const Carts = require('../../model/Cart.model ')
const FilesDao = require('../../dao/files.dao');
const Products = require('../../model/Products.model');

const router = Router()
const cartFile = new FilesDao('products.json')

//Mostrar todos los carritos
router.get('/', async (req,res) => {
    try {
        const cart = await Carts.find()
        res.json(cart)

    } catch (error) {
        res.status(400).json({status: 'error', error})
    }
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
    
    console.log(product)
    cart.products = await cart.products.filter(e => e !== product)
        
    await Carts.updateOne({_id: cid}, cart)

    res.json({ message: "Producto eliminado"})
    } catch (error) {
    
        console.log(error)
        res.status(400).json({status: 'error', error})
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