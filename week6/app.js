//A SERVICE FOR A BOOK LENDING PLARFORM
const prompt = require('prompt-sync')({ sigint: true });
const fs = require("fs");


let storeFilePath = "./store.json";
let storejson = fs.readFileSync(storeFilePath, "utf-8");
let books = JSON.parse(storejson);



const lineBreak = '\n✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭\n';
const author = 'BAZZscript🌴';
if (require.main === module) {
    console.log(`${lineBreak} Welcome to ${author} Library ${lineBreak}`)

}






// SECTION 1
/**
 *
 * Using the Module Pattern to design the mini api
 *
 */
//API
let bazzLibrary = (
    function () {

        // Initialize the books library in the form of an array, can be changed to json later

        let _books = books.ourBooks;
        // Add a book
        // Donate a book
        function addBooksToLibrary({ bookName, bookRating, releaseYear, quantityAvailable }) {
            let newBook = {
                'bookId': _books.length + 1,
                'bookName': bookName,
                'bookRating': bookRating,
                'releaseYear': releaseYear,
                'quantityAvailable': quantityAvailable,
                'quantityRented': 0,

            };

            if (newBook.bookName == undefined) {
                return {
                    status: 'error',
                    message: 'Please enter an actual book name'
                };
            } else if (newBook.quantityAvailable <= 0) {
                return {
                    status: 'error',
                    message: 'Please give us atleast 1 book'
                };
            } else {
                _books.push(newBook);
                return {
                    status: 'success',
                    message: `${newBook.bookName} added to the library`
                };
            }
        }
        // View all the books in The Library
        function viewAllBooksInLibrary() {
            if (_books.length > 0) {
                return {
                    status: 'success',
                    message: 'List of all the books in our library',
                    'books': _books,
                };
            } else {
                return {
                    status: 'error',
                    message: 'Our library is empty',
                };
            }
        }


        //View A particular book
        function viewBookInLibrary(bookId) {
            let book = _books.find(book => book.bookId === id);

            if (book) {
                return {
                    status: 'success',
                    'book': book
                };
            } else if (book == undefined) {
                return {
                    status: "error",
                    message: `"${bookId}" is not available`
                };
            } else {
                return {
                    status: "error",
                    message: `"${bookId}" is an invalid book id`
                };
            }
        }

        // Borrow a book
        function borrowBookFromLibrary({ id }) {
            let book = _books.find(book => book.bookId === id);
            if (book) {
                if (book.quantityAvailable > 0) {
                    book.quantityAvailable--;
                    book.quantityRented++;
                    return {
                        status: 'success',
                        message: `${book.bookName} successfully borrowed`,
                    };
                }
                else if (book.quantityAvailable < 1) {
                    return {
                        status: "error",
                        message: `Sorry, we don't have any more copies of ${book.bookName} to lend out`
                    }
                }

            } else if (book == undefined) {
                return {
                    status: "error",
                    message: `${id} is not available`
                };
            } else {
                return {
                    status: "error",
                    message: `${id} is an invalid book id`
                };
            }
        }

        // View borrowed books
        function viewBorrowedBooksFromLibrary() {
            let borrowedBooks = _books.filter(book => book.quantityRented > 0);
            if (borrowedBooks.length > 0) {

                return {
                    status: 'success',
                    message: `List Of Books In ${author} library Borrowed So far`,
                    books: borrowedBooks,
                };
            } else {
                return {
                    status: 'error',
                    message: `No books borrowed yet`,
                };
            }
        }

        // Return borrrowed books
        function returnBorrowedBookToLibrary({ id }) {
            let borrowedBook = _books.find(book => book.bookId === id);
            if (borrowedBook) {
                if (borrowedBook.quantityRented > 0) {
                    borrowedBook.quantityRented--;
                    borrowedBook.quantityAvailable++;
                    return {
                        status: 'success',
                        message: `${borrowedBook.bookName} successfully returned`,
                    };
                }
                else {
                    return {
                        status: 'error',
                        message: `${borrowedBook.bookName} with the bookId ${borrowedBook.bookId} is not borrowed`,
                    };
                }
            } else if (borrowedBook == undefined) {
                return {
                    status: "error",
                    message: `Book Id ${id} is invalid`
                };
            }


        }

        // fs.writeFile(storeFilePath, JSON.stringify(books), function (err) {
        //     console.log(err);
        // });
        // Reveal public pointers to
        // private functions and properties
        return {

            // Add a book
            // Donate a book
            addBooksToLibrary: addBooksToLibrary,

            // Borrow a book
            borrowBook: borrowBookFromLibrary,

            // View borrowed books
            viewBorrowedBooks: viewBorrowedBooksFromLibrary,

            // Return borrrowed books
            returnBorrowedBook: returnBorrowedBookToLibrary,

            // View all books in library
            viewAllBooks: viewAllBooksInLibrary,

            // View a particular book
            viewBook: viewBookInLibrary,
        }

    }
)();



// Dont Run When Imported
if (require.main === module) {






    // ////////////////////////////////////////////////////////////////////////////////////////////////
    // SECTION 2

    /*
    *ACCESSING THE MINI API TO BUILD AN
    *INTERACTIVE CONSOLE APP
    *
    */
    let userIsDone = false;
    while (userIsDone == false) {
        console.log('MAIN MENU');
        console.log('1. Donate a book');
        console.log('2. View all books');
        console.log('3. Borrow a book');
        console.log('4. Return a book');
        console.log('5. View borrowed books');
        console.log('6. Exit');

        console.log('\n');

        let choice = parseInt(prompt('Enter your choice: '));
        if (choice == 1) {
            let bookName = prompt('Enter the book name: ');
            let bookRating = parseFloat(prompt('Enter the book rating: '));
            let releaseYear = parseInt(prompt('Enter the book release year: '));
            let quantityAvailable = parseInt(prompt('Enter the quantity you want to donate: '));
            let newBook = bazzLibrary.addBooksToLibrary({
                bookName: bookName,
                bookRating: bookRating,
                releaseYear: releaseYear,
                quantityAvailable: quantityAvailable,
            });
            console.log(lineBreak);
            console.log(newBook.status);
            console.log(newBook.message);
            console.log(lineBreak);

        }
        // View List of Books in our store
        else if (choice == 2) {
            let books = bazzLibrary.viewAllBooks();
            console.log(lineBreak);
            if (books.status == 'error') {
                console.log(books.message);
            } else if (books.status == 'success') {
                console.log(books.message);
                console.log(books.books);
            }
            console.log(lineBreak);

        }


        // Borrow a Book
        else if (choice == 3) {
            let books = bazzLibrary.viewAllBooks();
            console.log(lineBreak);
            console.log(books);
            let bookId = parseInt(prompt('Enter the "bookid" of the book you want to borrow: '));
            let borrowedBook = bazzLibrary.borrowBook({
                id: bookId,
            });
            console.log(lineBreak);
            console.log(borrowedBook.status);
            console.log(borrowedBook.message);
            console.log(lineBreak);
        }
        // Return borrrowed books
        else if (choice == 4) {
            bazzLibrary.viewAllBooks;
            let bookId = parseInt(prompt('Enter the book id: '));
            let returnedBook = bazzLibrary.returnBorrowedBook({
                id: bookId,
            });
            console.log(lineBreak);
            console.log(returnedBook.status);
            console.log(returnedBook.message);
            console.log(lineBreak);

        }
        // View borrowed books
        else if (choice == 5) {
            console.log(lineBreak);
            let borrowedBooks = bazzLibrary.viewBorrowedBooks();
            console.log(lineBreak);
            console.log(borrowedBooks.status);
            console.log(borrowedBooks.message);
            console.log(borrowedBooks.books);
            console.log(lineBreak);

        }

        //Exit
        else if (choice == 6) {
            //Thanks User For Visiting Our Library
            storejson = JSON.stringify(books);
            fs.writeFileSync(storeFilePath, storejson, "utf-8");
            console.log(lineBreak);
            console.log(`Thank You For Visiting ${author} Library Today.`);
            console.log("We hope you enjoyed your time here.");
            console.log(lineBreak);
            userIsDone = true;
        }

        else {
            console.log(`${lineBreak}Invalid Choice / Menu Option ${lineBreak}`);
        }


    }
}
else {
    module.exports = bazzLibrary;

}