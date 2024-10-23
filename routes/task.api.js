const express = require('express')
const router = express.Router()
const { createTask, getTask, updateTask, deleteTask, deleteAllTask } = require('../controller/task.controller')
const { authenticate } = require('../controller/auth.controller')

router.post('/', authenticate, createTask)

router.get('/', getTask)

router.get('/:userId', getTask)

router.put('/:id', authenticate, updateTask)

router.delete('/:id', authenticate, deleteTask)

router.delete('/', authenticate, deleteAllTask)

module.exports = router