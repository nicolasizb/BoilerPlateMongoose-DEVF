const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const ClientSchema = new mongoose.Schema({
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

ClientSchema.statics.encryptPassword = async (password) => {

    // Amount of rounds iterating password encryption
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

ClientSchema.statics.comparePassword = async (password, receivedPassword) => {
    // (password, receivedPassword) =  1. Inside date base, 2. Outside date base
    return await bcrypt.compare(password, receivedPassword)
}


const ClientModel = mongoose.model('ClientModel', ClientSchema)


module.exports = ClientModel