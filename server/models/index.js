const mongoose = require('mongoose')
const TaskSchema = require('./task')
const ActivitySchema = require('./activity')
const ScheduleSchema = require('./schedule')

const Task = mongoose.model('Task', TaskSchema)
const Activity = mongoose.model('Activity', ActivitySchema)
const Schedule = mongoose.model('Schedule', ScheduleSchema)

module.exports = {
    Task,
    Activity,
    Schedule
}