/**
 * Transaction Model Schema
 */

var mongoose = require('mongoose');
const Helpers = require('../helpers/helpers');
var Schema = mongoose.Schema;


var transactionSchema = new Schema({
    transaction_id: {
        type: String,
        default: Helpers.generateRandomString()
    },

    accountNumber: {
        type: String,
        default: 'none',
    },

    senderAccountNumber: {
        type: String,
        default: 'none',
    },

    recieverAccountNumber: {
        type: String,
        default: 'none',
    },

    transaction_amount: {
        type: Number,
        required: true
    },

    transaction_type: {
        type: String,
        required: true
    },

    transaction_remark: {
        type: String,
        default: "From Central Bank of Genesys"
    },

    transaction_time: {
        type: Date,
        default: Date.now()
    },
});


module.exports = mongoose.model('Transaction', transactionSchema);