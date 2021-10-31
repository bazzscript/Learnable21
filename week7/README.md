# 'Hello Welcome To BazzScript Library Api !',

Replit Test Link : 

## Valid Endpoints
```    
[
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

                ```