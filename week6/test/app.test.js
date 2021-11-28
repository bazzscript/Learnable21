const bazzLibrary = require('../app.js');

const libName = 'BAZZscript🌴';
describe(
    `Testing ${libName} Book Library Api`,
    () => {

        // Test Adding Books To Our Library
        describe(
            `Test Adding Books To ${libName} Book Library`,
            () => {
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

                test('Return Error When Trying to Add A New Book With 0 Quantity Available', () => {
                    let newBook = bazzLibrary.addBooksToLibrary({
                        bookName: 'The Awesome Bazz',
                        bookRating: 9.0,
                        releaseYear: 2022,
                        quantityAvailable: 0,
                    });

                    expect(newBook.status).toBe('error');
                })

            }
        )
        // Test Viewing Book(s) In Our Library
        describe(
            `Test Viewing Book(s) In ${libName} Book Library`,
            () => {
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

                // Test Viewing All Borrowed Books In The Library
                test(
                    'View All Borrowed Books In The Library',
                    () => {
                        let borrowedBooks = bazzLibrary.viewBorrowedBooks();
                        expect(borrowedBooks.status).toBe('success');
                    }
                )

            }
        )
        // Test Borrowing Books From Our Library
        describe(
            `Test Borrowing Book from ${libName} Book Library`,
            () => {
                // Test Borrowing A Book From The Library
                test('Borrow A Book From The Library When Given A Valid Id', () => {
                    let borrowedBook = bazzLibrary.borrowBook({
                        id: 1,
                    });
                    expect(borrowedBook.status).toBe('success');
                })

                // Return Error When Trying to borrow a book that is not borrowed
                test('Return Error When Trying to borrow a book that is not available for borrowing',

                    () => {
                        let borrowedBook = bazzLibrary.borrowBook({
                            id: 7,
                        })
                        expect(borrowedBook.status).toBe('error');
                    }

                )


            }
        )


        describe(`Test Returning Books To ${libName} Book Library`,
            () => {
                // Test Returning A Book To The Library
                test('Return A Book To The Library When Given A Valid Id', () => {
                    let returnedBook = bazzLibrary.returnBorrowedBook(
                        {
                            id: 3,
                        }
                    );
                    expect(returnedBook.status).toBe('success');
                })


                // Return Error When Trying To Return A Book That Wasnt Borrowed
                test('Return Error When Trying To Return A Book That Wasnt Borrowed', () => {
                    let returnedBook = bazzLibrary.returnBorrowedBook(
                        {
                            id: 6,
                        }
                    );
                    expect(returnedBook.status).toBe('error');
                })

            })
    }
)