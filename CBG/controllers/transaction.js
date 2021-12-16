// User Model
const Transaction = require('../models/transaction');
const User = require('../models/user');


// Authentication Controller
const transaction = {}

// Add or Deposit Money To Account Balance
transaction.deposit = async ({ amount, beneficiaryAccountNumber }) => {
;    try {
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

        // Create And Save Transaction
        const transaction = await new Transaction({
            accountNumber,
            transaction_amount: amount,
            transaction_type: 'withdraw'
        }).save();

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

        // Subtract Amount From Senders Account And Update
        const newBalance = sendersAccount.balance - amount;
        await User.findOneAndUpdate(
            { accountNumber: sendersAccountNumber },
            { balance: newBalance },
            { new: true }
        )

        // Add Amount to Recievers Account And Update
        const newRecieversBalance = recieversAccount.balance + amount;
        await User.findOneAndUpdate(
            { accountNumber: recieversAccountNumber },
            { balance: newRecieversBalance },
            { new: true }
        )

        // Create and Save Transaction
        const transaction = await new Transaction({
            senderAccountNumber: sendersAccountNumber,
            recieverAccountNumber: recieversAccountNumber,
            transaction_amount: amount,
            transaction_type: 'transfer'
        }).save();


        // Return Transaction Success
        return {
            status: "success",
            statuscode: 200,
            message: 'Transfer Successful',
            data: {
                transaction_id: transaction.transaction_id,
                sendersName: sendersAccount.name,
                senderAccount: transaction.senderAccountNumber,
                recieversName: recieversAccount.name,
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
        }
    } catch (error) {
        return {
            status: "error",
            statuscode: 500,
            message: 'Internal Server Error, please try again. If this error persists, please contact us to fix'
        }
    }

}


// Reverse A Transaction
transaction.reverse = async ({ transaction_id }) => {
    console.log(transaction_id);
    try {
        const transaction = await Transaction.findOne({ transaction_id });

        // Confirm Transaction Exists
        if (!transaction) {
            return {
                status: "error",
                statuscode: 404,
                message: 'Transaction ID Not Found'
            }
        }

        // Confirm Transaction is not reversed
        if (transaction.transaction_type === 'reverse') {
            return {
                status: "error",
                statuscode: 400,
                message: 'Transaction Already Reversed'
            }
        }

        // Check What Type Of Transaction It Is

        // DEPOSIT
        else if (transaction.transaction_type === 'deposit') {
            // Get Account
            const account = await User.findOne({ accountNumber: transaction.accountNumber });

            // Confirm Account Exists
            if (!account) {
                return {
                    status: "error",
                    statuscode: 404,
                    message: 'Account Not Found Or Doesnt Exist Anymore'
                }
            }

            // Confirm Account has enough money to reverse
            if (account.balance < transaction.transaction_amount) {
                return {
                    status: "error",
                    statuscode: 400,
                    message: 'Insufficient Funds In your Account, Reversal Failed'
                }
            }

            // Subtract Amount to Account And Update
            const newBalance = await account.balance - transaction.transaction_amount;
            await User.findOneAndUpdate(
                { accountNumber: transaction.accountNumber },
                { balance: newBalance },
                { new: true }
            )

            // Update Transaction Type
            await Transaction.findOneAndUpdate(
                { transaction_id: transaction_id },
                { transaction_type: 'reverse' },
                { new: true }
            )

            return {
                status: "success",
                statuscode: 200,
                message: 'Transaction Reversed',
            }

        }
        
        // WITHDRAWAL
        else if (transaction.transaction_type === 'withdraw') {
            // Get Account
            const account = await User.findOne({ accountNumber: transaction.accountNumber });

            // Confirm Account Exists
            if (!account) {
                return {
                    status: "error",
                    statuscode: 404,
                    message: 'Account Not Found Or Doesnt Exist Anymore'
                }
            }

            // Add Amount to Account And Update
            const newBalance = await account.balance + transaction.transaction_amount;
            await User.findOneAndUpdate(
                { accountNumber: transaction.accountNumber },
                { balance: newBalance },
                { new: true }
            )

            // Update Transaction Type
            await Transaction.findOneAndUpdate(
                { transaction_id: transaction_id },
                { transaction_type: 'reverse' },
                { new: true }
            )

            return {
                status: "success",
                statuscode: 200,
                message: 'Transaction Reversed',
            }
        }

        // TRANSFER
        else if (transaction.transaction_type === 'transfer') {

                        // Get sendersAccount
                        const sendersAccount = await User.findOne({ accountNumber: transaction.senderAccountNumber });

                        // Get recieversAccount
                        const recieversAccount = await User.findOne({ accountNumber: transaction.recieverAccountNumber });

                        // Confirm Senders Account Exists
                        if (!sendersAccount) {
                            return {
                                status: "error",
                                statuscode: 404,
                                message: 'Senders Account Not Found Or Doesnt Exist Anymore'
                            }
                        }

                        // Confirm Recievers Account Exists
                        if (!recieversAccount) {
                            return {
                                status: "error",
                                statuscode: 404,
                                message: 'Recievers Account Not Found Or Doesnt Exist Anymore'
                            }
                        }

                        // Add Amount to Senders Account And Update
                        const newBalance = await sendersAccount.balance - transaction.transaction_amount;
                        await User.findOneAndUpdate(
                            { accountNumber: transaction.senderAccountNumber },
                            { balance: newBalance },
                            { new: true }
                        )

                        // Subtract Amount From Recievers Account And Update
                        const newBalance2 = await recieversAccount.balance + transaction.transaction_amount;
                        await User.findOneAndUpdate(
                            { accountNumber: transaction.recieverAccountNumber },
                            { balance: newBalance2 },
                            { new: true }
                        )
            
                        // Update Transaction Type
                        await Transaction.findOneAndUpdate(
                            { transaction_id: transaction_id },
                            { transaction_type: 'reverse' },
                            { new: true }
                        )
            
                        return {
                            status: "success",
                            statuscode: 200,
                            message: 'Transaction Reversed',
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




module.exports = transaction;