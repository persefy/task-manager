const mongoose = require('mongoose')
const  { Schema } = require('mongoose')

const Activity = new Schema(
    {
        startTime: {type: Date, required: true},  
        endTime: {type: Date, required: true},
        name: {type: String, required: true},
        status: {type: String, required: true},
        type: {type: String, required: true}
    },
    { timestamps: true },
)

module.exports = Activity