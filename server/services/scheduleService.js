const { Schedule, Task } = require('../models');

class ScheduleService {
    static async findAvailableSlots(date, duration) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Get all schedules for the day
        const schedules = await Schedule.find({
            startDate: startOfDay,
            status: { $in: ['scheduled', 'in-progress'] }
        }).sort('startTime');

        // Convert duration to minutes
        const durationMinutes = parseInt(duration);
        
        // Initialize available slots
        const availableSlots = [];
        let currentTime = 0; // Start of day in minutes

        // Find gaps between schedules
        for (const schedule of schedules) {
            if (schedule.startTime - currentTime >= durationMinutes) {
                availableSlots.push({
                    startTime: currentTime,
                    endTime: schedule.startTime
                });
            }
            currentTime = schedule.endTime;
        }

        // Check if there's available time after the last schedule
        if (1440 - currentTime >= durationMinutes) {
            availableSlots.push({
                startTime: currentTime,
                endTime: 1440
            });
        }

        return availableSlots;
    }

    static async validateSchedule(taskId, startDate, startTime, endTime) {
        // Validate task exists and is schedulable
        const task = await Task.findById(taskId);
        if (!task) {
            throw new Error('Task not found');
        }
        if (!task.ApplySchedule) {
            throw new Error('Task is not enabled for scheduling');
        }

        // Validate time constraints
        if (startTime >= endTime) {
            throw new Error('End time must be after start time');
        }

        // Check for scheduling conflicts
        const conflictingSchedule = await Schedule.findOne({
            startDate: startDate,
            $or: [
                {
                    startTime: { $lt: endTime },
                    endTime: { $gt: startTime }
                }
            ],
            status: { $in: ['scheduled', 'in-progress'] }
        });

        if (conflictingSchedule) {
            throw new Error('Time slot conflict with existing schedule');
        }

        // If task has deadline, validate against it
        if (task.applyDeadline && task.deadlineDate) {
            const scheduleDate = new Date(startDate);
            if (scheduleDate > task.deadlineDate) {
                throw new Error('Schedule date is after task deadline');
            }
            if (scheduleDate.getTime() === task.deadlineDate.getTime() && 
                endTime > task.deadlineTime) {
                throw new Error('Schedule end time is after task deadline');
            }
        }

        return true;
    }
}
