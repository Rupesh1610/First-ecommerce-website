const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')
env.config()
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB connected')).catch(err => console.log(err))

const app = express()
app.use(express.json())


app.use(require('./src/routes/auth'))
app.use(require('./src/routes/user'))
app.use(require('./src/routes/product'))
app.use(require('./src/routes/cart'))
app.use(require('./src/routes/order'))

app.listen(process.env.PORT, () => console.log('server is running on ', process.env.PORT))