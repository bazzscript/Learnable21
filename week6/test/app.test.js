const { bazzLibrary } = require('../app.js');

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
    let allBooks = bazzLibrary.viewAllBooks();
    expect(allBooks.status).toBe('success');
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
    let borrowedBook = bazzLibrary.borrowBook(1);
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
    let returnedBook = bazzLibrary.returnBook(1);
    expect(returnedBook.status).toBe('success');
})

// Test Deleting A Book From The Library

test('Delete A Book From The Library When Given A Valid Id', () => {
    let deletedBook = bazzLibrary.deleteBook(1);
    expect(deletedBook.status).toBe('success');
}
)
