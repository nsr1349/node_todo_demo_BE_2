const express = require('express')
const router = express.Router()
const { createTask, getTask, updateTask, deleteTask, deleteAllTask } = require('../controller/task.controller')
const { authenticate } = require('../controller/auth.controller')

router.post('/', authenticate, createTask)

router.get('/', getTask)

router.get('/:userId', getTask)

router.put('/:id', updateTask)

router.delete('/:id', deleteTask)

router.delete('/', deleteAllTask)

module.exports = router