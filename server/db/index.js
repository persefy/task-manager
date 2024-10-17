const mongoose = require('mongoose')
mongoose
    .connect('mongodb://127.0.0.1:27017/tasksDatabase', {
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 30000
    })
    .then(() => {
        console.log('Successfully connected to MongoDB.')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection
module.exports = db
