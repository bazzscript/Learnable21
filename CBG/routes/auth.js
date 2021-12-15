// Authenticaton routes
const express = require('express');
const router = express.Router();

// Controllers
const AuthController = require('../controllers/auth');


// Create New User
router.post('/signup', async (req, res) => {
    // Create New User
    const data = req.body
    let newUser = await AuthController.createNewUser({
        fullName: data.name,
        userEmail: data.email,
        userPassword: data.password,
        createdAt: Date.now()
    })
    if (newUser.status == 'error') {
        res.status(400).json(newUser);
    }
    if (newUser.status == 'success') {
        res.status(201).json(newUser);

    }
})

// Login To Account
router.post('/login', async (req, res) => {
    // Authenticate User
    const data = req.body
    let user = await AuthController.login(
        {
            email: data.email,
            password: data.password,
        }
    )
    if (user.status == 'error') {
        res.status(400).json(user);
    }
    if (user.status == 'success') {
        res.status(200).json(user);
    }
})


module.exports = router
