const express = require('express');
const { verifyTokenAndAdmin } = require('../middlewares/requireLogin');
const Product = require('../models/product');
const router = express.Router()

router.post('/api/addproduct', verifyTokenAndAdmin, async (req, res) => {

    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.json(savedProduct)
    } catch (err) {
        console.log(err);
    }
})

router.delete('/api/deleteproduct/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.json('Product has been deleted!')
    } catch (err) {
        console.log(err);
    }
})

router.get('/api/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product)
    } catch (err) {
        console.log(err);
    }
})

router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (err) {
        console.log(err);
    }
})

router.put('/api/updateproduct/:id', verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })

        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;