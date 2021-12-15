const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');


// Get All Users in our database
router.get('/', async (req, res) => {

    const response = await UserController.getAllUsers();

    //Check Thier is a response
    if (response.status == 'error') {
        res.status(500).json(response);
    }

    res.status(200).json(response);

});

// Delete existing user from our Database
router.delete('/:id', async (req, res) => {
    const response = await UserController.deleteUser(req.params.id);
    if (response.status == 'error') {
        res.status(400).json(response);
    }
    res.status(200).json(response);
});


// Disable user
router.put('/disable/:id', async (req, res) => {
    const response = await UserController.disableUser(req.params.id);
    if (response.status == 'error') {
        res.status(400).json(response);
    }
    res.status(200).json(response);
});

// Enable user
router.put('/enable/:id', async (req, res) => {
    const response = await UserController.enableUser(req.params.id);
    if (response.status == 'error') {
        res.status(400).json(response);
    }
    res.status(200).json(response);
});





module.exports = router
