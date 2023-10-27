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
    // Encrypt password
    client.password = await ClientModel.encryptPassword(password)

    // Save in data base
    const newClient = client.save()

    res.status(200).json({
        _id: newClient._id,
        username: (await newClient).username,
        email: newClient.email
    })
})


app.get('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        
        // Bring products = populate("ProductModel")
        const userFound = await ClientModel.findOne({ email: email })
        if(!userFound) {
            res.status(400).json("Email not found")
            return
        }

        const matchedPassword = await ClientModel.comparePassword(password, userFound.password)

        if(!matchedPassword) {
            res.status(400).json("Password is invalid")
            return
        }

        // Here it is created JWT
        res.status(200).json(userFound)
    } catch {
        res.status(400).json({error: error.message})
    }
})

module.exports = {
    app,
    port
}

