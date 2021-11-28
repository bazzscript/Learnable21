const bazzLibrary = require('../app.js');
const fs = require("fs");


let storeFilePath = "./store.json";

describe(
    'Testing the book lending api',
    () => {

        // beforeAll(() => {
        //     let storejson = fs.readFileSync(storeFilePath, "utf-8");
        //     let books = JSON.parse(storejson);
        // })
        // Test Adding Book To The Library
        test('Add New Book To The Library', () => {
            let newBook = bazzLibrary.addBooksToLibrary({
                bookName: 'The Awesome Bazz',
                bookRating: 9.0,
                releaseYear: 2022,
                quantityAvailable: 22,
            });

            expect(newBook.status).toBe('success');
        })



        // Test Viewing All Books In The Library
        test('View All Books In The Library', () => {
            let books = bazzLibrary.viewAllBooks();
            expect(books.status).toBe('success');
        })


        // Test Viewing A Single Book In The Library
        test('View A Single Book In The Library When Given A Valid Id', () => {
            let singleBook = bazzLibrary.viewBook(1);
            expect(singleBook.status).toBe('success');
        })



        // Test Viewing A Single Book In The Library Given An Invalid Id
        test('Return Error when there is no book in the library with a given id when trying to View A Single Book In The Library', () => {
            let singleBook = bazzLibrary.viewBook(111);
            expect(singleBook.status).toBe("error");
        })



        // Test Borrowing A Book From The Library
        test('Borrow A Book From The Library When Given A Valid Id', () => {
            let borrowedBook = bazzLibrary.borrowBook({
                id: 1,
            });
            expect(borrowedBook.status).toBe('success');
        })



        // Test Viewing All Borrowed Books In The Library
        test(
            'View All Borrowed Books In The Library',
            () => {
                let borrowedBooks = bazzLibrary.viewBorrowedBooks();
                expect(borrowedBooks.status).toBe('success');
            }
        )



        // Test Returning A Book To The Library
        test('Return A Book To The Library When Given A Valid Id', () => {
            let returnedBook = bazzLibrary.returnBorrowedBook(
                {
                    id: 3,
                }
            );
            expect(returnedBook.status).toBe('success');
        })

    }
)