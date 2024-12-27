const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const Schedule = new Schema(
    {
        task: {
            type: Schema.Types.ObjectId,
            ref: 'Task',
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        startTime: {
            type: Number,  // Store as minutes from midnight (0-1439)
            required: true,
            min: 0,
            max: 1439
        },
        endTime: {
            type: Number,  // Store as minutes from midnight (0-1439)
            required: true,
            min: 0,
            max: 1439
        },
        status: {
            type: String,
            enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
            default: 'scheduled'
        },
        recurrence: {
            enabled: {
                type: Boolean,
                default: false
            },
            pattern: {
                type: String,
                enum: ['daily', 'weekly', 'monthly', 'none'],
                default: 'none'
            },
            daysOfWeek: [{
                type: Number,
                min: 0,
                max: 6
            }],
            endDate: {
                type: Date
            }
        },
        lastOccurrence: {
            type: Date
        },
        nextOccurrence: {
            type: Date
        }
    },
    { timestamps: true }
)

// Index for efficient querying of time ranges
Schedule.index({ startDate: 1, startTime: 1, endTime: 1 })

// Middleware to validate time constraints
Schedule.pre('save', async function(next) {
    // Validate end time is after start time
    if (this.endTime <= this.startTime) {
        throw new Error('End time must be after start time')
    }

    // Validate the task exists and is schedulable
    const Task = mongoose.model('Task')
    const task = await Task.findById(this.task)
    
    if (!task) {
        throw new Error('Referenced task does not exist')
    }

    if (!task.ApplySchedule) {
        throw new Error('This task is not enabled for scheduling')
    }

    // Check for scheduling conflicts
    const conflictingSchedule = await this.constructor.findOne({
        _id: { $ne: this._id },
        startDate: this.startDate,
        $or: [
            {
                startTime: { $lt: this.endTime },
                endTime: { $gt: this.startTime }
            }
        ],
        status: { $in: ['scheduled', 'in-progress'] }
    })

    if (conflictingSchedule) {
        throw new Error('Time slot conflict with existing schedule')
    }

    // Update next occurrence for recurring schedules
    if (this.recurrence.enabled && this.recurrence.pattern !== 'none') {
        this.nextOccurrence = this.calculateNextOccurrence()
    }

    next()
})

// Method to calculate next occurrence for recurring schedules
Schedule.methods.calculateNextOccurrence = function() {
    const currentDate = this.lastOccurrence || this.startDate
    let nextDate = new Date(currentDate)

    switch (this.recurrence.pattern) {
        case 'daily':
            nextDate.setDate(nextDate.getDate() + 1)
            break
        case 'weekly':
            nextDate.setDate(nextDate.getDate() + 7)
            break
        case 'monthly':
            nextDate.setMonth(nextDate.getMonth() + 1)
            break
        default:
            return null
    }

    // If end date is set and next occurrence would be after it, return null
    if (this.recurrence.endDate && nextDate > this.recurrence.endDate) {
        return null
    }

    return nextDate
}

module.exports = Schedule