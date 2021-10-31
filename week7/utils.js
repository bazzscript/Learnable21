const fs = require('fs');


/**
 * Generates Random Id
 * 
 * example : bf31-80f7-2661-302c
 */
exports.randomIdGenerator = () => {
    let s4 = () => {
        return Math.floor((10 + Math.random()) * 100).toString(16).substring();
    }
    return s4() + '-' + s4() + '-' + s4() + '-' + s4();
}


/**
 * 
 * Intercepts and reads the body of a request
 */
exports.getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
}


/**
 * Checks A String 
 * 
 * returns true, if its blank.
 * 
 * returns false if it contains atleast one string.
 */
exports.isBlank = (str) => {
    str = str.toString();
    return (!str || /^\s*$/.test(str));
}


/**
 * Reads and Parse Json Data Asynchronously
 * 
 */
exports.jsonReader = (filePath, callbackFunc) => {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return callbackFunc && callbackFunc(err)
        }
        try {
            const object = JSON.parse(fileData)
            return callbackFunc && callbackFunc(null, object)
        } catch (error) {
            return callbackFunc && callbackFunc(err)
        }
    })
}

// console.log('/api/books/3f6-3fd-3ee-446/borroww'.match(/\/api\/books\/([a-z 0-9 -]{15})\/borrow/).toString().slice(0, 33))

