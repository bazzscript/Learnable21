require('dotenv').config();



// User Model
const User = require('../models/user');



// Authentication Controller
const user = {}


// Get All Users in the database// Get All Users
user.getAllUsers = async () => {
    try {
        const users = await User.find({})
        return {
            status: 'success',
            message: 'Users Retrieved Successfully',
            data: users
        }
    } catch (err) {
        return {
            status: 'error',
            message: 'Users couldn\'t be retrieved',
            error: err
        }
    }
}

// Delete existing user from database base on user id
user.deleteUser = async (id) => {
    //Confirm user with id exist in our database
    const user = await User.findById(id);
    if (!user) {
        return {
            status: 'error',
            message: 'User id doesn\'t exist',
            error: err
        }
    }

    try {
        const user = await User.findByIdAndDelete(id)
        return {
            status: 'success',
            message: 'User Deleted Successfully',
            data: user
        }
    } catch (err) {
        return {
            status: 'error',
            message: 'User couldn\'t be deleted',
            error: err
        }
    }
}

// Disable user in our database base on user id
user.disableUser = async (id) => {
    // Confim user with id exist in our database
    const user = await User.findById(id);
    if (!user) {
        return {
            status: 'error',
            message: 'User id doesn\'t exist',

        }
    }

    // Confirm User not already disabled
    if (user.isUserActive === false) {
        return {
            status: 'error',
            message: 'User is already disabled',

        }
    }
    try {
        const user = await User.findByIdAndUpdate(id, {
            $set: {
                isUserActive: false
            }
        })
        return {
            status: 'success',
            message: 'User Disabled Successfully',
            data: user
        }
    } catch (err) {
        return {
            status: 'error',
            message: 'User couldn\'t be disabled',
            error: err
        }
    }
}


// Enable user in our database base on user id
user.enableUser = async (id) => {

    // Confirm user with id exist in our database
    const user = await User.findById(id);
    if (!user) {
        return {
            status: 'error',
            message: 'User id doesn\'t exist',

        }
    }

    // Confirm User not already enabled
    if (user.isUserActive === true) {
        return {
            status: 'error',
            message: 'User is already enabled',

        }
    }


    try {
        const user = await User.findByIdAndUpdate(id, {
            $set: {
                isUserActive: true
            }
        })
        return {
            status: 'success',
            message: 'User Enabled Successfully',
            data: user
        }
    } catch (err) {
        return {
            status: 'error',
            message: 'User couldn\'t be enabled',
            error: err
        }
    }
}







module.exports = user;