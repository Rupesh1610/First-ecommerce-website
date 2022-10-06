const mongoose = require('mongoose')
const express = require('express');
const bcrypt = require('bcryptjs')
const { verifyTokenAndAdmin, requireLogin, verifyTokenAndAuthorization } = require('../middlewares/requireLogin');
const User = require('../models/user');

const router = express.Router()

router.get('/api/allusers', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        console.log(err);
    }
})

router.get('/api/user/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch (err) {
        console.log(err);
    }
})

router.put('/api/update/:id', verifyTokenAndAuthorization, async (req, res) => {

    if (req.body.password) {
        req.body.password = bcrypt.hash(req.body.password, 12)
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        })

        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/api/deleteuser/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json('User has been deleted!')
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;