var express = require('express');
var router = express.Router();

// Call user controller
const userController = require('../controllers/UserController');

// Get all users
router.get('/get-all', userController.getAllUsers);

// Get user by id
router.get('/get-user/:id', userController.getUserById);

// Create user
router.post('/create', userController.createUser);

// Update user
router.put('/update-user/:id', userController.updateUser);

// Soft delete user
router.put('/soft-delete-user/:id', userController.softDeleteUser);

// Delete user
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;
