const mongoose = require('mongoose')
const TaskSchema = require('./task')
const ActivitySchema = require('./activity')

const Task = mongoose.model('Task', TaskSchema)
const Activity = mongoose.model('Activity', ActivitySchema)

module.exports = {
    Task,
    Activity
}