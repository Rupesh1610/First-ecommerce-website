const jwt = require('jsonwebtoken')

const requireLogin = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'You must be logged in' })
    } else {
        const token = authorization.replace('Bearer ', '')
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ error: 'Authentication failed' })
            } else {
                req.user = user;
                next()
            }
        })
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    requireLogin(req, res, () => {
        if (req.user._id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.status(500).json({ error: 'you are not allowed to do that' })
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    requireLogin(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.status(500).json({ error: 'you are not allowed to do that' })
        }
    })
}

module.exports = { requireLogin, verifyTokenAndAuthorization, verifyTokenAndAdmin }
