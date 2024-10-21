const Task = require('../model/Task')

const taskController = {}

taskController.createTask = async (req, res) => {
    try {
        const { task , isComplete } = req.body 
        const newTask = new Task({ task , isComplete })
        await newTask.save()
        res.status(200).json({status : 'ok', data : newTask})
    } catch (err) {
        res.status(400).json({status : 'fail', err})
    }
}

taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({}).select('-__v').sort({ createdAt: -1 })
        res.status(200).json({status : 'ok', data : taskList})
    } catch (err) {
        res.status(400).json({status : 'fail', err})
    }
}

taskController.updateTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const data = await Task.findByIdAndUpdate(
            req.params.id,
            { task, isComplete }
        );
        if (!data) return res.status(404).json({ status: 'fail', message: 'Task not found' })

        res.status(200).json({ status: 'ok', data })
    } catch (err) {
        res.status(400).json({ status: 'fail', err })
    }
};

taskController.deleteTask = async (req, res) => {
    try {
        const data = await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({ status: 'ok', data })
    } catch (err) {
        res.status(400).json({ status: 'fail', err })
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