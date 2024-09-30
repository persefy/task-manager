const { Task } = require('../models');

const getAllTasks = async (req,res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const tasks = await Task.findById(id);
        if (tasks) {
            return res.json(tasks);
        }
        return res.status(404).send('Tasks are not found!');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createTask = async (req, res) => {
    try {
        const tasks = await new Task(req.body);
        await tasks.save();
        return res.status(201).json({tasks,});

    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
}

const updateTask = async (req, res) => {
    try {
        let { id } = req.params;
        let tasks = await Task.findByIdAndUpdate(id, req.body, { new: true })
        if (tasks) {
            return res.status(200).json(tasks)
        }
        throw new Error("Task not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Task.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Task deleted");
        }
        throw new Error("Task not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}