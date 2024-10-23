const Task = require('../model/Task')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const taskController = {}

taskController.createTask = async (req, res) => {
    try {
        const { task , isComplete } = req.body 
        const newTask = new Task({ task , isComplete, author : req.userId })
        await newTask.save()
        res.status(200).json({status : 'ok', data : newTask})
    } catch (err) {
        res.status(400).json({status : 'fail', err})
    }
}

taskController.getTask = async (req, res) => {
    try {
        const { userId } = req.params
        const findFilter = userId ? { author : userId } : {}
        const taskList = await Task.find(findFilter).populate('author').sort({ createdAt: -1 })
        res.status(200).json({status : 'ok', data : taskList})
    } catch (err) {
        res.status(400).json({status : 'fail', err})
    }
}

taskController.updateTask = async (req, res) => {
    try {
        const targetTask = await Task.findOne({ _id : req.params.id } ).populate('author')
        const targetId = targetTask.author._id.toString()
        if (targetId !== req.userId) throw new Error('자신의 할일만 수정 가능합니다')

        const { task, isComplete } = req.body;
        const data = await Task.findByIdAndUpdate(
            req.params.id,
            { task, isComplete }
        );
        if (!data) return res.status(404).json({ status: 'fail', message: 'Task not found' })
        res.status(200).json({ status: 'success', data })
    } catch (err) {
        res.status(400).json({ status: 'fail', err : err.message })
    }
};

taskController.deleteTask = async (req, res) => {
    try {
        const targetTask = await Task.findOne({ _id : req.params.id } ).populate('author')
        const targetId = targetTask.author._id.toString()
        if (targetId !== req.userId) throw new Error('자신의 할일만 삭제 가능합니다')

        const data = await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({ status: 'ok', data })
    } catch (err) {
        res.status(400).json({ status: 'fail', err : err.message })
    }
};


taskController.deleteAllTask = async (req, res) => {
    try {
        const data = await Task.deleteMany({})
        res.status(200).json({ status: 'ok', data })
    } catch (err) {
        res.status(400).json({ status: 'fail', err })
    }
};

module.exports = taskController