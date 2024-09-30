const mongoose = require('mongoose')
const TaskSchema = require('./task')

const Task = mongoose.model('Task', TaskSchema)

module.exports = {
    Task
}