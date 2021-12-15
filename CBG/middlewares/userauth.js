// import jwt
const jwt = require('jsonwebtoken');

// import user model
const User = require('../models/user');

module.exports = () => {

    return async (req, res, next) => {
        try {
            const accessToken = req.headers.token

            if (!accessToken) throw new Error("Token not found")
            const decoded = jwt.decode(accessToken)

            const user = await User.findById(decoded.user_id);
            if (!user) throw new Error("Unauthorized / Unrecognized user")

            req.AuthAccountNumber = user.accountNumber;
            next();

        } catch (error) {
            next(error)

        }
    }
}