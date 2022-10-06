const express = require('express')
const { default: mongoose } = require('mongoose')
const { requireLogin, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/requireLogin')
const Cart = require('../models/cart')
const router = express.Router()

router.post('/api/addcart', requireLogin, async (req, res) => {

    const newCart = new Cart(req.body)
    try {
        const savedCart = await newCart.save()
        res.json(savedCart)
    } catch (err) {
        console.log(err);
    }
})


router.put('/api/updatecart/:id', verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })

        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/api/deletecart/:id', requireLogin, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.json('Product has been removed!')
    } catch (err) {
        console.log(err);
    }
})

router.get('/api/cart/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.params.id })
        res.json(cart)
    } catch (err) {
        console.log(err);
    }
})

router.get('/api/allcarts', verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find()
        res.json(carts)
    } catch (err) {
        console.log(err);
    }
})


module.exports = router;