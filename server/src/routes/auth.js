const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.post('/api/signin', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: 'Invalid email and password' })
            } else {
                bcrypt.compare(password, savedUser.password)
                    .then(isMatched => {
                        if (!isMatched) {
                            return res.status(422).json({ error: 'Invalid email and password' })
                        } else {
                            const { _id, fullname, email, isAdmin } = savedUser;
                            const token = jwt.sign({ _id, isAdmin }, process.env.JWT_SECRET, { expiresIn: '3d' })
                            res.json({ token, user: { _id, fullname, email, isAdmin } })
                        }
                    }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
})

router.post('/api/signup', (req, res) => {
    const { fullname, email, password } = req.body;

    User.findOne({ email })
        .then(savedUser => {
            if (savedUser) {
                return res.status(422).json({ error: 'User already exists' })
            } else {
                bcrypt.hash(password, 12)
                    .then(hashPass => {
                        const user = new User({
                            fullname,
                            email,
                            password: hashPass
                        })
                        user.save()
                            .then(() => res.json({ msg: 'SignUp successfull' }))
                            .catch(err => console.log(err))
                    }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
})

module.exports = router;