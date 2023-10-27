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

app.post('/new-client', async (req, res) => {
    const { username, email, identification_number, password, phone_number, products } = req.body

    // $in ==> Que contenga
    const productsFound = await ProductModel.find({ name: {$in: products} })

    const client = new ClientModel({
        username: username,
        email: email, 
        identification_number: identification_number,
        password: password, 
        phone_number: phone_number, 
        products: productsFound.map((cat) => cat._id)
    })

    const newClient = client.save()

    res.status(200).json(newClient)
})


module.exports = {
    app,
    port
}

