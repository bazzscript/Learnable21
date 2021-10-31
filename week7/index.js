const http = require('http');
const utils = require('./utils.js');

//Import and Instantiate the controller class
const Controller = require('./controller.js');
const controller = new Controller();


/**
 * port our server will listen on
*/
const PORT = process.env.PORT || 3000;

/**
 * An Instance of @type {http.Server}
 *
 * url:/api/books and method:GET - route to fetch all books.
 *
 * url:/api/books/:id and method:GET - route to fetch a book by its id.
 *
 * url:/api/books/:id and method:PUT - route to update a book by its id.
 *
 * url:/api/books/:id and method:DELETE - route to delete a book by its id.
 *
 * url:/api/books/: and method:POST - route to add a new book.
*/

const server = http.createServer(
    async (req, res) => {

        if (req.method === 'PATCH') {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                method: 'Method PATCH not supported, use PUT request method'
            }));
        }

        //See All Users
        else if (req.url === '/api/users' && req.method === 'GET') {
            const allusers = await controller.usersList();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(allusers));
        }

        //Create New User
        else if (req.url === '/api/users/create' && req.method === 'POST') {
            try {
                const body = await utils.getPostData(req);

                //Take only the title and description from the body
                const { name } = JSON.parse(body);
                const newUser = await controller.createnewUser(name);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newUser));
            } catch (error) {
                console.log(error);
                res.writeHead(406, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(error));

            }
        }

        // Borrow A Book Given a Book Id
        else if (req.url.match(/\/api\/([a-z 0-9]{3})\/books\/([a-z 0-9 -]{15})\/borrow/) && req.method === 'POST') {
            try {
                // const body = await utils.getPostData(req);
                const bookid = req.url.split('/')[4];
                const userid = req.url.split('/')[2];
                const borrowedBook = await controller.borrowABook(bookid, userid);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(borrowedBook));
            } catch (error) {
                console.log(error);
                res.writeHead(409, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(error));
            }
        }


        //Return A Borrowed Book Given a Book Id

        else if (req.url.match(/\/api\/([a-z 0-9]{3})\/books\/([a-z 0-9 -]{15})\/return/) && req.method === 'POST') {
            try {
                // const body = await utils.getPostData(req);
                const bookid = req.url.split('/')[4];
                const userid = req.url.split('/')[2];
                const returnedBook = await controller.returnBorrowedBook(bookid, userid);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(returnedBook));
            } catch (error) {
                console.log(error);
                res.writeHead(409, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(error));
            }
        }


        // Fetch A Book By Its Id
        else if (req.url.match(/\/api\/([a-z 0-9]{3})\/books\/([a-z 0-9 -]{15})/) && req.method === 'GET') {
            try {
                const bookid = req.url.split('/')[4];
                const userid = req.url.split('/')[2];
                const theBook = await controller.getABook(bookid, userid);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(theBook));
            } catch (error) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(error));
            }
        }


        // Update A Book By Its Id
        else if (req.url.match(/\/api\/([a-z 0-9]{3})\/books\/([a-z 0-9 -]{15})/) && req.method === 'PUT') {
            try {
                const body = await utils.getPostData(req);
                // get the third parameter given url of api/books/id
                const bookid = req.url.split('/')[4];
                const userid = req.url.split('/')[2];
                const updatedBook = await controller.updateABook(bookid, JSON.parse(body), userid);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedBook));
            } catch (error) {
                console.log(error);
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(error));
            }
        }

        // Fetch All Books
        else if (req.url.match(/\/api\/([a-z 0-9]{3})\/books/) && req.method === 'GET') {
            const userid = req.url.split('/')[2];
            const allbooks = await controller.getAllBooks(userid);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(allbooks));
        }

        // Add A New Book
        else if (req.url.match(/\/api\/([a-z 0-9]{3})\/books/) && req.method === 'POST') {
            try {
                const body = await utils.getPostData(req);

                //Take only the title and description from the body
                const { title, author, description, bookQuantity } = JSON.parse(body);
                const userid = req.url.split('/')[2];
                const newBook = await controller.addNewBook(
                    {
                        title: title,
                        author: author,
                        description: description,
                        bookQuantity: parseInt(bookQuantity),
                        userid: userid
                    }
                );
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newBook));
            } catch (error) {
                console.log(error);
                res.writeHead(406, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(error));

            }
        }

        // Delete A Book By Its Id
        else if (req.url.match(/\/api\/([a-z 0-9]{3})\/books\/([a-z 0-9 -]{15})/) && req.method === 'DELETE') {
            try {
                const bookid = req.url.split('/')[4];
                const userid = req.url.split('/')[2];
                await controller.deleteABook(bookid, userid);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Book deleted successfully' }));
            } catch (error) {
                console.log(error);
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(error));
            }
        }

        //intro
        else if (req.url = '/api/intro' && req.method === 'GET') {

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Hello Welcome To Our BazzScript Library Api !',
                validEndpoints: [
                    {
                        message: "Creat A New Account",
                        method: "POST",
                        getListOfBooksRoute: "/api/users/create",
                        expectedRequestBody: {
                            name: 'username'
                        }
                    },
                    {
                        message: "Get List Of Users",
                        method: "GET",
                        getListOfBooksRoute: "/api/users",
                        expectedRequestBody: 'Does Not Expect A Request Body'

                    },

                    {
                        message: "Borrow A Book",
                        method: "POST",
                        getListOfBooksRoute: "/api/:userid:/books/:bookid:/borrow",
                        expectedRequestBody: 'Does Not Expect A Request Body'
                    },

                    {
                        message: "Return A Book",
                        method: "POST",
                        getListOfBooksRoute: "/api/:userid:/books/:bookid:/return",
                        expectedRequestBody: 'Does Not Expect A Request Body'
                    },
                    {
                        message: "Get List Of All Books",
                        method: "GET",
                        getListOfBooksRoute: "/api/:userid:/books",
                        expectedRequestBody: 'Does Not Expect A Request Body'
                    },

                    {
                        message: "Add New Book",
                        method: "POST",
                        addNewBookRoute: "/api/:userid:/books",
                        expectedRequestBody: {
                            "title": "Book Name",
                            "author": "authors name",
                            "bookQuantity": 10,
                            "description": "book description"
                        }
                    },

                    {
                        message: "Get A Particular Book",
                        method: "GET",
                        getAParticularBookRoute: "/api/:userid:/books/:bookid:",
                        expectedRequestBody: 'Does Not Expect A Request Body'
                    },

                    {
                        message: "Update A Book Details, e.g bookQuantity",
                        method: "PUT",
                        updateABookRoute: "/api/:userid:/books/:bookid:",
                        expectedRequestBody: {

                            "title": "Updated Title",
                            "author": "Updated Authoe Name",
                            "bookQuantity": 6,
                            "rentedQuantity": 0,
                            "description": "update description"
                        },
                    },

                    {
                        message: "Delete A Book",
                        method: "DELETE",
                        deleteABookRoute: "/api/:userid:/books/:bookid:",
                        expectedRequestBody: 'Does Not Expect A Request Body'

                    }
                ]
            }));
        }
        //Invalid Route
        else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'OOPS !  ROUTE NOT FOUND !',
                suggestion: 'To help you navigate this api, make a GET request to /api/intro',
            }));
        }


    }
);

const lineBreak = '\n✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭✭\n';
/**
 * Startup Our Server To Listen On The Specified Port
 */
server.listen(PORT, () => console.log(

    `   Server listening on port ${PORT}!
    ${lineBreak}
    Hello Welcome to BazzScript Library Api, make a GET request to "/api/intro" to get started
    `


));





