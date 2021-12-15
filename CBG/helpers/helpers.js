const crypto = require('crypto');
require('dotenv').config();


class Helpers {

    static DATABASE_URL = process.env.DATABASE_URL;

    /**
     * Generates Access Token When Passed an Object, With The help Of jsonwebtoken(JWT) 
     * @param {} theObject 
     * @returns a tokenized string 
     */
    static generateAuthToken(theObject) {
        return JWT.sign(theObject, process.env.ACCESS_TOKEN_SECRET,
            // { expiresIn: '1h' }
        );
    }

    /**
     * Validates an Email To Check Its Valid
     * 
     */
    static validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    /**
     * Generates A random Unique String
     * @returns a random unique string
     */
    static generateRandomString() {
        return `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`
    }

    /**
     * Generates A Random Name
     * @returns a name
     */
    static generateRandomName() {
        let name = ['Bezaleel', 'Bazz', 'Ifedili', 'Jerry', 'Kachi', 'Bell', 'Jayson', 'Micheal', 'Somto'];
        let randomName1 = name[Math.floor(Math.random() * name.length)];
        let randomName2 = name[Math.floor(Math.random() * name.length)];
        return `${randomName2} ${randomName1}`;
    }

    /**
     * Generates A Random Email
     * @returns an email
     */
    static generateRandomEmail() {
        let name = ['Bezaleel', 'Bazz', 'Ifedili', 'Jerry', 'Kachi', 'Bell', 'Jayson', 'Micheal', 'Somto'];
        let randomName1 = name[Math.floor(Math.random() * name.length)];
        let randomName2 = name[Math.floor(Math.random() * name.length)];
        return `${randomName2}@email.com`;
    }


    /**
     * Generates A Random Account Number
     * @returns an email
     */
    static generateAccountNumber() {
        const prefix = '204';
        let id = crypto.randomBytes(4).toString('hex');
        const accountNumber = prefix + id;
        return accountNumber;
    }
}

// console.log(Helpers.generateAccountNumber());
module.exports = Helpers;