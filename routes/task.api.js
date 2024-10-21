const express = require('express')
const router = express.Router()
const { createTask, getTask, updateTask, deleteTask, deleteAllTask } = require('../controller/task.controller')

router.post('/', createTask)

router.get('/', getTask)

router.put('/:id', updateTask)

router.delete('/:id', deleteTask)

router.delete('/', deleteAllTask)

module.exports = router