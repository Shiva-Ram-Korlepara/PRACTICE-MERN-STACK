const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
// This code defines the authentication routes for user registration and login.
// It imports the necessary modules, sets up the routes for registering and logging in users,
// and exports the router for use in the main application.