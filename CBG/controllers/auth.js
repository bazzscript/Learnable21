const JWT = require("jsonwebtoken")
const Helpers = require('../helpers/helpers');
const bcrypt = require('bcrypt')
require('dotenv').config();



// User Model
const User = require('../models/user');



// Authentication Controller
const auth = {}



// Create New User
auth.createNewUser = async ({
    fullName, userEmail, userPassword, isAdmin, createdAt,
}) => {
    // Save New User to Database
    try {
        const passwordHash = await bcrypt.hash(userPassword, 10)

        // Confirm Email Doesnt Exist In The Database
        const doesEmailExist = await User.findOne({ email: userEmail })
        if (doesEmailExist) {
            return {
                status: "error",
                message: "Email Already Exists",
            }
        }

        // Validate Email
        const isEmailValid = Helpers.validateEmail(userEmail);
        if (!isEmailValid) {
            return {
                status: "error",
                message: "Email is not a valid mail address",
            }
        }
        // Save User TO Database
        const user = await new User({
            name: fullName,
            email: userEmail,
            password: passwordHash,
            isUserAdmin: isAdmin,
            created_at: createdAt,
        }).save()

        /**
         * Generates Access Token When Passed an Object, 
         * With The help Of jsonwebtoken(JWT) Module
         */
        const token = JWT.sign({
            user_id: user._id,
            user_accountNumber: user.accountNumber,
            isUserAdmin: user.isUserAdmin,
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 10 })
        return {
            status: 'success',
            message: "User Created Successfully",
            data: {
                acessToken: token,
                name: user.name,
                email: user.email,
                isUserAdmin: user.isUserAdmin,
                created_at: user.created_at,
            }
        }

    } catch (err) {
        return {
            status: 'error',
            message: "User couldn't be created",
            error: err
        }
    }
}



// Login
auth.login = async ({ email, password }) => {
    try {
        // Confirm That Email Is Valid Email
        const isEmailValid = Helpers.validateEmail(email);
        if (!isEmailValid) {
            return {
                status: "error",
                message: "Email is not a valid mail address",
            }
        }



        // Checks If User With Email Exist
        const user = await User.findOne({ email })

        if (!user) {
            return {
                status: 'error',
                message: 'Username or Password is incorrect',
                error: 'Username or Password is incorrect'
            }
        }
        // Checks If Password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return {
                status: 'error',
                message: 'Username or Password is incorrect',
                error: 'Username or Password is incorrect'
            }
        }

        // Confirm User is Active
        if (!user.isUserActive) {
            return {
                status: 'error',
                message: 'LogIn Error, Account is Disabled / Suspended',
            }
        }

        const token = JWT.sign({
            user_id: user._id,
            user_accountNumber: user.accountNumber,
            isUserAdmin: user.isUserAdmin,
        }, process.env.ACCESS_TOKEN_SECRET)

        return {
            status: 'success',
            message: 'User Logged In Successfully',
            data: {
                acessToken: token,
                name: user.name,
                email: user.email,
                isUserAdmin: user.isUserAdmin,
                account_balance: user.balance,
            }
        }
    } catch (err) {
        return {
            status: 'error',
            message: 'User couldn\'t be logged in',
            error: err
        }
    }

}


// Export the auth controller
module.exports = auth;