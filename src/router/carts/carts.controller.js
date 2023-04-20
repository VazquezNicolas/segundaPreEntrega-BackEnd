const {Router} = require('express')
const Carts = require('../../model/Cart.model ')
const FilesDao = require('../../dao/files.dao');

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

//Agregar carrito
router.post('/', async (req,res) => {
    try {
        const newId = req.body
        const newCart = await Carts.create(newId)   
        console.log(newCart)
        res.status(201).json({message: `Nuevo Carrito Agregado! `})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({status: 'error', error})
    }
})

module.exports = router