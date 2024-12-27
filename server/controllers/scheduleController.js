const { Schedule } = require('../models');
const ScheduleService = require('../services/scheduleService');

const getAllSchedules= async (req, res) => {
    try {
        const schedules = await Schedule.find()
            .populate('task', 'name duration')
            .sort({ startDate: 1, startTime: 1 });
        res.json(schedules);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getScheduleById= async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await Schedule.findById(id).populate('task', 'name duration');
        if (schedule) {
            return res.json(schedule);
        }
        return res.status(404).send('Schedule not found!');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getSchedulesByDate= async (req, res) => {
    try {
        const { date } = req.params;
        const searchDate = new Date(date);
        const schedules = await Schedule.find({
            startDate: searchDate,
            status: { $in: ['scheduled', 'in-progress'] }
        })
        .populate('task', 'name duration')
        .sort('startTime');
        return res.json(schedules);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createSchedule= async (req, res) => {
    try {
        const { taskId, startDate, startTime, endTime, recurrence } = req.body;

        // Validate scheduling constraints
        await ScheduleService.validateSchedule(taskId, startDate, startTime, endTime);

        const schedule = await new Schedule({
            task: taskId,
            startDate: new Date(startDate),
            startTime,
            endTime,
            recurrence: recurrence || { enabled: false, pattern: 'none' }
        });
        await schedule.save();
        await schedule.populate('task', 'name duration');
        return res.status(201).json(schedule);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateSchedule= async (req, res) => {
    try {
        const { id } = req.params;
        const { startDate, startTime, endTime, status, recurrence } = req.body;

        if (startDate && startTime && endTime) {
            // Validate new schedule times if they're being updated
            await ScheduleService.validateSchedule(
                req.body.taskId || schedule.task,
                startDate,
                startTime,
                endTime
            );
        }

        const schedule = await Schedule.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        ).populate('task', 'name duration');

        if (schedule) {
            return res.status(200).json(schedule);
        }
        throw new Error("Schedule not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteSchedule= async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Schedule.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).send("Schedule deleted");
        }
        throw new Error("Schedule not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getAvailableSlots= async (req, res) => {
    try {
        const { date, duration } = req.query;
        if (!date || !duration) {
            return res.status(400).send('Date and duration are required');
        }

        const availableSlots = await ScheduleService.findAvailableSlots(date, duration);
        return res.json(availableSlots);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllSchedules,
    getScheduleById,
    getSchedulesByDate,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    getAvailableSlots
}
