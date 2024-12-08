const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuth = require('../middleware/is-auth');
const authRole = require('../utils/authRole');

// List users for only admin
router.get('/list-user', isAuth, authRole(), userController.listUsers);

//current user 
router.get('/current-user', isAuth, authRole('user'),  userController.getCurrentUser);

// Update user details
router.put('/update-user/:id', isAuth, authRole('user'), userController.updateUser);

// Update user status (active/inactive)
router.put('/update-status/:id', isAuth, authRole('user'), userController.updateUserStatus);

// Delete user
router.put('/del-user/:id', isAuth, authRole(), userController.deleteUser);



module.exports = router;
