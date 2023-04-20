const {Router} = require('express')
const Carts = require('../../model/Cart.model ')

const router = Router()

router.get('/', async (req,res) => {
    try {
        const cart = await Carts.find()
        res.json(cart)

    } catch (error) {
        res.status(400).json({status: 'error', error})
    }
})

router.post('/', async (req,res) => {
    try {
        
    } catch (error) {
        res.status(400).json({status: 'error', error})
    }
})

module.exports = router