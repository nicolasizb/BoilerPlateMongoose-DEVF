const mongoose = require('mongoose')

async function connection() {
    await mongoose
        .connect('mongodb+srv://izjuannicolas:1234@test.ensw7ot.mongodb.net/?retryWrites=true&w=majority')
        .catch(err => console.log(err))
}

module.exports = { connection }