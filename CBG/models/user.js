/**
 * Bank App User Mongo Schema
 */


var mongoose = require('mongoose');
const Helpers = require('../helpers/helpers');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String,
        default: Helpers.generateAccountNumber
    },
    balance: {
        type: Number,
        default: 0
    },
    isUserAdmin: {
        type: Boolean,
        default: false
    },
    isUserActive: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('User', UserSchema);


// End of user.js

