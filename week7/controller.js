// controller.js
const fs = require('fs');

/**
 * Utility File
 * 
 * Contains Utility Functions
 */
const utils = require("./utils.js");
const allUsersData = require('./userdata.json');

//used by prety much all of the methods in this file
let bookDataFilePath = 'bookdata.json'
let userDataFilePath = 'userdata.json'


/**
 * THE CONTROLLER CLASS
 * 
 * this class manages the actual functionality and the logic behind each route used in this application. It is made up of the Controller class, which will have the following major methods:
 * 
 * 
 * 
 * API CORE FEATURES
 * 
 * getAllBooks(): to get and list down all books as listed in the temporary data.js file.
 * 
 * getABook(): to get and list a single book by its unique id.
 * 
 * addNewBook(): to add a new book.
 * 
 * updateABook(): to update the details of an existing book.
 * 
 * deleteABook(): to remove a book from the library.
 * 
 * 
 * 
 * SERVICE CORE FEATURES
 * 
 * borrowABook(): to borrow a book from the library.
 * returnABook(): to return a borrowed book to the library
 * 
 */
class Controller {
    /**
     * Create New User
     * 
     * Expects The User Name
     */
    createnewUser = (name) => {
        return new Promise(
            (resolve, reject) => {
                if (name == undefined) {
                    reject({
                        message: 'Required Property name is undefined',
                    })
                }
                else {

                    let newUser = {
                        'userid': utils.randomIdGenerator().split('-', 1).toString(),
                        'name': name.toString().trimStart().trimEnd(),
                    }
                    if (newUser.name == undefined || utils.isBlank(newUser.name)) {
                        reject({
                            message: 'error! required property, name is undefined or empty'
                        });
                    }
                    else {
                        utils.jsonReader(userDataFilePath, (err, data) => {
                            if (err) {
                                console.log(err)
                                reject(err)
                            } else {
                                data.push(newUser);
                                let newData = JSON.stringify(data)
                                fs.writeFile(userDataFilePath, newData, err => {
                                    if (err) reject(err);
                                    console.log("New User added")
                                })
                                // return the new created book
                                resolve({
                                    message: `User added successfully`,
                                    user: newUser,
                                });
                            }

                        })
                    }

                }
            }
        )
    }

    /**
     * Users List
     * 
     */
    usersList = () => {
        return new Promise((resolve, reject) => {
            resolve({
                message: 'On Normal This Request Would Only Be Shown To A User With Admin Priveledge but For the Sake of test, here are all the users in our library',
                users: allUsersData
            });

        })
    }

    /**
     * Get All Books
    */
    getAllBooks = (userid) => {
        // return all books
        return new Promise(
            (resolve, reject) => {
                let theUser = allUsersData.find((auser) => auser.userid === userid);
                if (!theUser) {
                    reject({
                        message: `User id '${userid}' not found, please create an account`,
                    })
                } else {
                    utils.jsonReader(bookDataFilePath, (err, data) => {
                        if (err) {
                            console.log(err)
                            reject({
                                message: 'Couldnt Read Json File',
                                error: err
                            })
                        } else {
                            resolve({
                                message: ` Hello '${theUser.name}', Here is List of All The Books In Our Library`,
                                books: data
                            })
                        }
                    })

                }

            }
        );
    }

    /**
     * Get a particular book. 
     * This method expects a book id
     */
    getABook = (id, userid) => {
        return new Promise((resolve, reject) => {
            let theUser = allUsersData.find((auser) => auser.userid === userid);
            if (!theUser) {
                reject({
                    message: `User id '${userid}' not found, please create an account`,
                })
            }
            else {

                utils.jsonReader(bookDataFilePath, (err, data) => {
                    if (err) {
                        console.log(err)
                        reject({
                            message: 'Couldnt read json file',
                            error: err
                        })
                    } else {
                        let thebook = data.find((book) => book.id === id);
                        if (thebook) {
                            resolve(thebook);
                        } else {
                            reject({
                                message: `Book with id "${id}" not found `,
                            });
                        }
                    }
                })
            }

        });
    }

    /** 
     * Add A New Book.
     * 
     * This Method expects a book object
    */
    addNewBook = ({ title, author, description, bookQuantity, userid }) => {
        return new Promise((resolve, reject) => {

            let theUser = allUsersData.find((auser) => auser.userid === userid);
            if (!theUser) {
                reject({
                    message: `User id '${userid}' not found, please create an account`,
                })
            }
            else {
                if (title == undefined) {
                    reject({
                        message: 'Required Property title is undefined',
                    })
                }
                else if (author == undefined) {
                    reject({
                        message: 'Required Property author is undefined',
                    })
                }
                else if (description == undefined) {
                    reject({
                        message: 'Required Property name is undefined',
                    })
                }
                else if (bookQuantity == undefined) {
                    reject({
                        message: 'Required Property bookQuantity is undefined',
                    })
                }
                else {
                    let newBook = {
                        'id': utils.randomIdGenerator(),
                        'title': title.toString().trimStart().trimEnd(),
                        'author': author.toString().trimStart().trimEnd(),
                        'bookQuantity': bookQuantity,
                        'rentedQuantity': 0,
                        'description': description.toString().trimStart().trimEnd(),

                    };
                    if (newBook.title == undefined || utils.isBlank(newBook.title)) {
                        reject({
                            message: 'error! required property, title is undefined or empty'
                        });
                    } else if (newBook.bookQuantity == undefined || isNaN(newBook.bookQuantity) || newBook.bookQuantity <= 0) {
                        reject({
                            message: 'error! required property, bookQuantity is either zero, undefined or not a number',
                        });
                    }
                    else if (newBook.author == undefined || utils.isBlank(newBook.author)) {
                        reject({
                            message: 'error! required property, author is undefined or empty'
                        });
                    }
                    else if (newBook.description == undefined || utils.isBlank(newBook.description)) {
                        reject({
                            message: 'error! required property, description is undefined or empty'
                        });
                    }

                    else {
                        utils.jsonReader(bookDataFilePath, (err, data) => {
                            if (err) {
                                console.log(err)
                                reject(err)
                            } else {
                                data.push(newBook);
                                let newData = JSON.stringify(data)
                                fs.writeFile(bookDataFilePath, newData, err => {
                                    if (err) throw err;
                                    console.log("New Data added")
                                })
                                // return the new created book
                                resolve({
                                    message: `Book added successfully`,
                                    book: newBook,
                                });
                            }

                        })

                    }

                }
            }

        });
    }

    /**
     *  Update A Book.
     *  This Method Expects A Book Id To Borrow
     */
    updateABook = async (id, body, userid) => {
        return new Promise((resolve, reject) => {
            let theUser = allUsersData.find((auser) => auser.userid === userid);
            if (!theUser) {
                reject({
                    message: `User id '${userid}' not found, please create an account`,
                })
            } else {
                let bookData;
                let data;
                try {
                    bookData = fs.readFileSync(bookDataFilePath);
                    data = JSON.parse(bookData);
                }
                catch (error) {
                    reject({
                        message: 'Couldnt Read Json Data',
                        error: error
                    })
                    console.log('empty json data....initializing an empty array..');
                    data = [];
                }
                let theBookToUpdate = data.find((book) => book.id === id);
                const { title, description, author, bookQuantity, rentedQuantity } = body;
                if (!theBookToUpdate) {
                    reject({
                        message: `Book id not found`,
                    });
                } else {
                    const updatedBook = {
                        id,
                        title: title ? title.trimStart().trimEnd() : theBookToUpdate.title.trimStart().trimEnd(),
                        author: author ? author.trimStart().trimEnd() : theBookToUpdate.author.trimStart().trimEnd(),
                        bookQuantity: bookQuantity ? bookQuantity : theBookToUpdate.bookQuantity,
                        rentedQuantity: rentedQuantity ? rentedQuantity : theBookToUpdate.rentedQuantity,
                        description: description ? description.trimStart().trimEnd() : theBookToUpdate.description.trimStart().trimEnd(),

                    }

                    if (updatedBook.title == undefined || utils.isBlank(updatedBook.title)) {
                        reject({
                            message: 'error! required property, title is undefined or empty'
                        });
                    }
                    else if (updatedBook.author == undefined || utils.isBlank(updatedBook.author)) {
                        reject({
                            message: 'error! required property, author is undefined or empty'
                        });
                    }
                    else if (updatedBook.bookQuantity == undefined || isNaN(updatedBook.bookQuantity) || updatedBook.bookQuantity <= 0) {
                        reject({
                            message: 'error! required property, bookQuantity is either zero, undefined or not a number',
                        });
                    }
                    else if (updatedBook.rentedQuantity == undefined || isNaN(updatedBook.bookQuantity) || updatedBook.rentedQuantity > updatedBook.bookQuantity) {
                        reject({
                            message: 'error! required property, rentedQuantity is either undefined, empty or value cannot be more than bookQuantity'
                        });
                    }
                    else if (updatedBook.description == undefined || utils.isBlank(updatedBook.description)) {
                        reject({
                            message: 'error! required property, description is undefined or empty'
                        });
                    }
                    else {
                        // Apparently after all the if statements above( of which all does thier work :) ) 
                        // the value of rentedQuantity and bookQuantity can still be string
                        // so i had to Convert the rentedQuantity and bookQuantity values 
                        // to an integer to prevent any future errors when another method wants to process the values
                        updatedBook.rentedQuantity = parseInt(updatedBook.rentedQuantity)
                        updatedBook.bookQuantity = parseInt(updatedBook.bookQuantity);

                        utils.jsonReader(bookDataFilePath, (err, data) => {
                            if (err) {
                                console.log(err)
                                console.log('empty json data....initializing an empty array..');
                                data = [];
                                reject(err)
                            } else {

                                let index = data.findIndex((data) => data.id === id);
                                data[index] = updatedBook;
                                let updatedData = JSON.stringify(data)
                                fs.writeFile(bookDataFilePath, updatedData, err => {
                                    if (err) throw err;
                                    console.log("Data Updated")
                                })
                                resolve({
                                    message: "Book Updated Successfully",
                                    book: updatedBook,
                                });
                            }
                        })


                    }

                }

            }
        })
    }

    /**
     *  Delete A Book 
     *  This Method Expects A Book Id To Delete
     */
    deleteABook = (id, userid) => {
        return new Promise((resolve, reject) => {
            let theUser = allUsersData.find((auser) => auser.userid === userid);
            if (!theUser) {
                reject({
                    message: `User id '${userid}' not found, please create an account`,
                })
            }
            else {
                let bookData;
                let data;
                try {
                    bookData = fs.readFileSync(bookDataFilePath);
                    data = JSON.parse(bookData);
                }
                catch (error) {
                    reject({
                        message: 'Couldnt Read Json Data',
                        error: error
                    })
                    console.log('empty json data....initializing an empty array..');
                    data = [];
                }
                // Get the book
                let book = data.find((book) => book.id == id);
                // if no book, return an error
                if (!book) {
                    reject({
                        message: `No book with id "${id}" found`,
                    });
                }
                else {
                    // else, delete book & return a success message
                    data.splice(data.indexOf(book), 1);
                    let updatedData = JSON.stringify(data)
                    fs.writeFile(bookDataFilePath, updatedData, err => {
                        if (err) {
                            reject(err)
                        };
                        console.log("Data deleted")
                    })
                    resolve({
                        message: `Book deleted successfully`,

                    });
                }

            }
        });
    }

    /**
     * Borrow A Book
     * 
     * This Method expects the bookid you want to borrow
         */
    borrowABook = (id, userid) => {
        return new Promise((resolve, reject) => {
            let theUser = allUsersData.find((auser) => auser.userid === userid);
            if (!theUser) {
                reject({
                    message: `User id '${userid}' not found, please create an account`,
                })
            }

            else {
                let bookData;
                let data;
                try {
                    bookData = fs.readFileSync(bookDataFilePath);
                    data = JSON.parse(bookData);
                }
                catch (error) {
                    reject({
                        message: 'Couldnt Read Json Data',
                        error: error
                    })
                    console.log('empty json data....initializing an empty array..');
                    data = [];
                }
                let theBookToBorrow = data.find((book) => book.id === id);
                if (!theBookToBorrow) {
                    reject({
                        message: `Book With id ${id} not found`
                    });
                }
                else {
                    if (theBookToBorrow.bookQuantity > 0) {
                        theBookToBorrow.bookQuantity--;
                        theBookToBorrow.rentedQuantity++;
                        utils.jsonReader(bookDataFilePath, (err, data) => {
                            if (err) {
                                console.log(err)
                                console.log('empty json data....initializing an empty array..');
                                data = [];
                                reject({
                                    message: 'Couldnt Read Json Data',
                                    error: error
                                })
                            } else {
                                let index = data.findIndex((book) => book.id === id);
                                data[index] = theBookToBorrow;
                                let updatedData = JSON.stringify(data)
                                fs.writeFile(bookDataFilePath, updatedData, err => {
                                    if (err) reject(err);
                                    console.log("Borrowed Book Data Updated")
                                })
                                resolve({
                                    message: `${theBookToBorrow.title} successfully borrowed`,
                                });
                            }
                        })

                    }
                    else if (theBookToBorrow.bookQuantity < 1) {
                        reject({
                            message: `Sorry ${theUser.name}, we don't have any more copies of '${theBookToBorrow.title}' to lend out`
                        })
                    }
                }
            }
        })
    }


    /**
     * Return A Borrowed Book
     * 
     * This Method expects the bookid you want to return
    */
    returnBorrowedBook = (id, userid) => {
        return new Promise((resolve, reject) => {
            let theUser = allUsersData.find((auser) => auser.userid === userid);
            if (!theUser) {
                reject({
                    message: `User id '${userid}' not found, please create an account`,
                })
            }
            else {
                let bookData;
                let data;
                try {
                    bookData = fs.readFileSync(bookDataFilePath);
                    data = JSON.parse(bookData);
                }
                catch (error) {
                    reject({
                        message: 'Couldnt Read Json Data',
                        error: error
                    })
                    console.log('empty json data....initializing an empty array..');
                    data = [];
                }

                let borrowedBook = data.find((book) => book.id === id);
                console.log(borrowedBook)
                if (!borrowedBook) {
                    reject({
                        message: `Book With id ${id} not found`
                    });
                }
                else {
                    if (borrowedBook.rentedQuantity > 0) {
                        borrowedBook.rentedQuantity--;
                        borrowedBook.bookQuantity++;
                        utils.jsonReader(bookDataFilePath, (err, data) => {
                            if (err) {
                                console.log(err)
                                console.log('empty json data....initializing an empty array..');
                                data = [];
                                reject({
                                    message: 'Couldnt Read Json Data',
                                    error: error
                                })
                            } else {
                                let index = data.findIndex((book) => book.id === id);
                                data[index] = borrowedBook;
                                let updatedData = JSON.stringify(data)
                                fs.writeFile(bookDataFilePath, updatedData, err => {
                                    if (err) reject(err);
                                    console.log("Returned Book Data Updated")
                                })
                                resolve({
                                    message: `'${borrowedBook.title}' successfully returned`,
                                });
                            }
                        })


                    }
                    else if (borrowedBook.rentedQuantity <= 0) {
                        reject({
                            message: ` Sorry ${theUser.name}, the book '${borrowedBook.title}' is not borrowed`,
                        });
                    }
                }


            }


        })
    }

}


// exporting the controller class
module.exports = Controller;