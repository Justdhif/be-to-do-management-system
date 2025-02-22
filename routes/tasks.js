var express = require('express');
var router = express.Router();

// Call task controller
const taskController = require('../controllers/TaskController');

// Get all tasks
router.get('/get-all', taskController.getAllTasks);

// Get task by id
router.get('/get-task/:id', taskController.getTaskById);

// Create task
router.post('/create', taskController.createTask);

// Update task
router.put('/update-task/:id', taskController.updateTask);

// Soft delete task
router.put('/soft-delete-task/:id', taskController.softDeleteTask);

// Delete task
router.delete('/delete-task/:id', taskController.deleteTask);

module.exports = router;
