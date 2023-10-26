const express = require('express');
const cors = require('cors');
const ClientModel = require('./models/client.js')
const ProductModel = require('./models/product.js')

const app = express();
const port = 2100;

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('WELCOME TO MONGOOSE')
})

app.post('/client', (req, res) => {
    const newClient = ClientModel.create({ name: 'Joanna' })

    res.json("User created successfull")
})

app.post('/product', (req, res) => {
    const newClient = ProductModel.create({ name: 'Apple', stock: 200 })
    res.json("Product created successfull")
})

app.post('/new-client', (req, res) => {
    const name = req.query.name
    const newClient = ClientModel.create({ name: name })

    res.json("User created successfull")
})

module.exports = {
    app,
    port
}

