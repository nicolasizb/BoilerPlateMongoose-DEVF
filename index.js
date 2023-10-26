const { app, port } = require('./src/app.js')
const { connection } = require('./src/db.js')

connection()
    .then(
        app.listen(port, () => {
            console.log(`It's port: ${ port }`)
        })
    )