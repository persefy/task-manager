const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const Task = new Schema(
    {
        name: { type: String, required: true },
        duration: { type: Number, required: true },
        applyDeadline: {type: Boolean, required: true},
        deadlineDate: {type: Date, required: false},
        deadlineTime: {type: Number, required: false},
        ApplySchedule: {type: Boolean, required: true}
    },
    { timestamps: true },
)

module.exports = Task