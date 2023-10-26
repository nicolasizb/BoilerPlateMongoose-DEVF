const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name: String
});

const ClientModel = mongoose.model('ClientModel', clientSchema)


module.exports = ClientModel