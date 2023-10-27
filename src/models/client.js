const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    identification_number: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: {
        type: Number,
        required: true,
    },
    // Relational with ID of Product
    products: [{type: mongoose.Schema.Types.ObjectId}]
});

const ClientModel = mongoose.model('ClientModel', clientSchema)


module.exports = ClientModel