const express = require('express')
const { requireLogin, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middlewares/requireLogin')
const Order = require('../models/order')
const router = express.Router()

router.post('/api/order', requireLogin, async (req, res) => {

    const newOrder = new Order(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.json(savedOrder)
    } catch (err) {
        console.log(err);
    }
})


router.put('/api/updateorder/:id', verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })

        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/api/deleteorder/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.json('Order has been removed!')
    } catch (err) {
        console.log(err);
    }
})

router.get('/api/order/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id })
        res.json(orders)
    } catch (err) {
        console.log(err);
    }
})

router.get('/api/allOrders', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.json(orders)
    } catch (err) {
        console.log(err);
    }
})


module.exports = router;