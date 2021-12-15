// User Model
const Transaction = require('../models/transaction');
const User = require('../models/user');


// Authentication Controller
const transaction = {}

// Add or Deposit Money To Account Balance
transaction.deposit = async ({ amount, beneficiaryAccountNumber }) => {
    try {
        const user = await User.findOne({ accountNumber: beneficiaryAccountNumber });

        //Confirm Account Exists
        if (!user) {
            return {
                status: "error",
                statuscode: 404,
                message: 'Account Not Found'
            }
        }

        // Add Amount to Account Balance
        const newBalance = user.balance + amount;

        // Update Account Balance
        await User.findOneAndUpdate(
            { accountNumber: beneficiaryAccountNumber },
            { $set: { balance: newBalance } },
            { new: true }
        );

        // Create And Save Transaction
        const transaction = await new Transaction({
            accountNumber: beneficiaryAccountNumber,
            transaction_amount: amount,
            transaction_type: 'deposit'
        }).save()

        return {
            status: "success",
            statuscode: 200,
            message: 'Deposit Successful',
            data: {
                transaction_id: transaction.transaction_id,
                accountName: user.name,
                accountNumber: user.accountNumber,
                transaction_amount: transaction.transaction_amount,
                transaction_type: transaction.transaction_type,
            }

        }
    } catch (error) {
        return {
            status: "error",
            statuscode: 500,
            message: 'Internal Server Error, please try again. If this error persists, please contact us to fix'
        }
    }
}


// Withdraw Money From Account Balance
transaction.withdraw = async ({ amount, accountNumber }) => {
    try {
        const user = await User.findOne({ accountNumber });

        // Confirm Account Exists
        if (!user) {
            return {
                status: "error",
                statuscode: 404,
                message: 'Account Not Found'
            }
        }

        // Confirm Account has enough money to withdraw
        if (user.balance < amount) {
            return {
                status: "error",
                statuscode: 400,
                message: 'Insufficient Funds'
            }
        }

        // Subtract Amount From Account Balance
        const newBalance = user.balance - amount;

        // Update Account Balance
        await User.findOneAndUpdate(
            { accountNumber },
            { balance: newBalance },
            { new: true }
        )

        // Create Transaction
        const transaction = new Transaction({
            accountNumber,
            transaction_amount: amount,
            transaction_type: 'withdraw'
        })

        // Save Transaction
        await transaction.save();

        return {
            status: "success",
            statuscode: 200,
            message: 'Withdraw Successful',
            data: {
                transaction_id: transaction.transaction_id,
                accountNumber: transaction.accountNumber,
                transaction_amount: transaction.transaction_amount,
                transaction_type: transaction.transaction_type,
            }
        }

    } catch (error) {
        return {
            status: "error",
            statuscode: 500,
            message: 'Internal Server Error, please try again. If this error persists, please contact us to fix'
        }
    }
}


// Transfer Money From Account to another account
transaction.transfer = async ({ amount, sendersAccountNumber, recieversAccountNumber }) => {

    try {
        const sendersAccount = await User.findOne({ accountNumber: sendersAccountNumber });
        const recieversAccount = await User.findOne({ accountNumber: recieversAccountNumber });

        // Confirm Senders Account Exists
        if (!sendersAccount) {
            return {
                status: "error",
                statuscode: 404,
                message: 'Senders Account Not Found'
            }
        }

        // Confirm Recievers Account Exists
        if (!recieversAccount) {
            return {
                status: "error",
                statuscode: 404,
                message: 'Recievers Account Not Found'
            }
        }

        // Confirm Senders Account has enough money to transfer
        if (sendersAccount.balance < amount) {
            return {
                status: "error",
                statuscode: 400,
                message: 'Insufficient Funds'
            }
        }

        // Subtract Amount From Senders Account and Add Amount to recievers Account
        const newBalanceSender = await sendersAccount.balance - amount;
        const newBalanceReciever = await recieversAccount.balance + amount;


        // Update Senders Account Balance
        await User.findOneAndUpdate(
            { accountNumber: sendersAccountNumber },
            { balance: newBalanceSender },
            { new: true }
        )

        // Update Recievers Account Balance
        await User.findOneAndUpdate(
            { accountNumber: recieversAccountNumber },
            { balance: newBalanceReciever },
            { new: true },

            (err, updatedAccount) => {
                if (err) {
                    return {
                        status: "error",
                        statuscode: 500,
                        message: 'Internal Server Error'
                    }
                } else {
                    return {
                        status: "success",
                        statuscode: 200,
                        message: `Money Transfered to ${recieversAccount.name} Successfully`,
                        data: updatedAccount
                    }
                }
            }
        )

        // Create and Save Transaction
        const transaction = await new Transaction({
            senderAccountNumber: sendersAccountNumber,
            recieverAccountNumber: recieversAccountNumber,
            transaction_amount: amount,
            transaction_type: 'transfer'
        }).save();

        return {
            status: "success",
            statuscode: 200,
            message: 'Transfer Successful',
            data: {
                transaction_id: transaction.transaction_id,
                senderAccount: transaction.senderAccountNumber,
                recieverAccount: transaction.recieverAccountNumber,
                transaction_amount: transaction.transaction_amount,
                transaction_type: transaction.transaction_type,
            }
        }

    } catch (error) {
        return {
            status: "error",
            statuscode: 500,
            debug: 'check transaction chief',
            message: 'Internal Server Error, please try again. If this error persists, please contact us to fix'
        }
    }
}

// Check Account Balance
transaction.checkBalance = async ({ accountNumber }) => {
    try {
        const user = await User.findOne({ accountNumber });

        // Confirm Account Exists
        if (!user) {
            return {
                status: "error",
                statuscode: 404,
                message: 'Account Not Found'
            }
        }


        return {
            status: "success",
            statuscode: 200,
            message: 'Account Balance',
            data: {
                accountNumber: user.accountNumber,
                accountName: user.name,
                balance: user.balance


            }
        }
    } catch (error) {
        return {
            status: "error",
            statuscode: 500,
            message: 'Internal Server Error, please try again. If this error persists, please contact us to fix'
        }


    }
}


// Transaction history of a user
transaction.history = async ({ accountNumber }) => {
    try {
        const user = await User.findOne({ accountNumber });

        // Confirm Account Exists
        if (!user) {
            return {
                status: "error",
                statuscode: 404,
                message: 'Account Not Found'
            }
        }

        //get list of transaction with accountNumber
        const transactions = await Transaction.find({ accountNumber });
        const userings = await User.find({ isUserAdmin: false });


        // Confirm transaction exist
        if (!transactions) {

            return {
                status: "error",
                statuscode: 404,
                message: 'No Transactions Found'
            }
        }

        return {
            status: "success",
            statuscode: 200,
            message: `${user.name} Transaction History`,
            data: transactions,
            testfkight: userings
        }
    } catch (error) {
        return {
            status: "error",
            statuscode: 500,
            message: 'Internal Server Error, please try again. If this error persists, please contact us to fix'
        }
    }

}






module.exports = transaction;