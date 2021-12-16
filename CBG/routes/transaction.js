// Transaction route
const express = require('express');
const router = express.Router();

const userauth = require("./../middlewares/userauth")


// Controllers
const TransactionController = require('../controllers/transaction');

// Deposit Money To Account
router.post('/deposit', userauth(), async (req, res) => {
    const data = await req.body;
    const response = await TransactionController.deposit({
        beneficiaryAccountNumber: data.AuthAccountNumber,
        amount: data.amount,
    });

    if (response.statuscode == 404) {
        res.status(404).json(response);
    }
    if (response.statuscode == 500) {
        res.status(500).json(response);
    }
    res.status(200).json(response);
});


// Withdraw Money From Account
router.post('/withdraw', userauth(), async (req, res) => {
    const data = req.body;
    const response = await TransactionController.withdraw({
        accountNumber: data.AuthAccountNumber,
        amount: data.amount,
    });
    if (response.statuscode === 404) {
        res.status(404).json(response);
    }
    if (response.statuscode === 400) {
        res.status(400).json(response);
    }
    if (response.statuscode === 500) {
        res.status(500).json(response);
    }
    res.status(200).json(response);
})

// Transfer To Another User Account
router.post('/transfer', userauth(), async (req, res) => {
    const data = req.body;
    const response = await TransactionController.transfer(
        {
            amount: data.amount,
            sendersAccountNumber: data.AuthAccountNumber,
            recieversAccountNumber: data.recieversAccount
        })
    if (response.statuscode == 404) {
        res.status(404).json(response);
    }
    if (response.statuscode == 500) {
        res.status(500).json(response);
    }
    res.status(200).json(response);
})



// Transaction history
router.get('/history', userauth(), async (req, res) => {
    const data = req.body;
    const response = await TransactionController.history({
        accountNumber: data.AuthAccountNumber,
    });
    if (response.statuscode == 404) {
        res.status(404).json(response);
    }
    if (response.statuscode == 500) {
        res.status(500).json(response);
    }
    res.status(200).json(response);
})


// Check Balance
router.get('/balance', userauth(), async (req, res) => {
    const data = req.body;
    const response = await TransactionController.checkBalance({
        accountNumber: data.AuthAccountNumber,
    });
    if (response.statuscode == 404) {
        res.status(404).json(response);
    }
    if (response.statuscode == 500) {
        res.status(500).json(response);
    }
    res.status(200).json(response);
})


// Reverse a transaction
router.post('/reverse', async (req, res) => {
    const data = req.body;

    const response = await TransactionController.reverse({
        transaction_id: data.transactionId,
    });
    if (response.statuscode == 404) {
        res.status(404).json(response);
    }
    if (response.statuscode == 400){
        res.status(400).json(response);
    }
    if (response.statuscode == 500) {
        res.status(500).json(response);
    }
    res.status(200).json(response);
})


module.exports = router
