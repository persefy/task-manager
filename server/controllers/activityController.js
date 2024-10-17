const { Activity } = require('../models');

const getAllActivities = async (req,res) => {
    try {
        const activities = await Activity.find()
        res.json(activities)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getActivityById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const activities = await Activity.findById(id);
        if (activities) {
            return res.json(activities);
        }
        return res.status(404).send('Activities are not found!');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createActivity = async (req, res) => {
    try {
        const activities = await new Activity(req.body);
        await activities.save();
        return res.status(201).json({activities,});

    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
}

const updateActivity = async (req, res) => {
    try {
        let { id } = req.params;
        let activities = await Activity.findByIdAndUpdate(id, req.body, { new: true })
        if (activities) {
            return res.status(200).json(activities)
        }
        throw new Error("Activity not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Activity.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Activity deleted");
        }
        throw new Error("Activity not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllActivities,
    getActivityById,
    createActivity,
    updateActivity,
    deleteActivity
}