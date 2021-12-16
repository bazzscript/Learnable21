const express = require('express');
const app = express();
require('dotenv').config();

/**
 * Port Our App will listen on
 */
const PORT = process.env.PORT

// Database Connection Setup
const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL.toString();

// Middlewares, our app runs before each request gets to our server
app.use(express.json());

// Enable body parser
app.use(express.urlencoded({ extended: true }));


// ROUTES

// Ping Server To Ensure Its Alive / Online
app.get('/ping', (req, res) => {
    res.status(200).send("Central Bank Of Genesys is currently online!")
});

// Authentication Routes
app.use("/api/v1/auth", require("./routes/auth"));

// /users/transaction
app.use("/api/v1/users/transaction", require("./routes/transaction"));

// /users
app.use("/api/v1/users", require("./routes/users"));

// Not found route - 404
app.use("**", (req, res) => {
    res.status(404).send({ message: "Route not found" })
})

// Error middleware
app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send({ message: "Something went wrong", error: error.message })
})



// Server Startup

app.listen(PORT, async () => {
    try {
        await mongoose.connect(DATABASE_URL)
        console.log('===> Connected to MongoDB database')
    } catch (error) {
        console.log("<=== Couldn't connect to database ", error)
    }

    console.log(`===> listening on http://localhost:${PORT}`)
    console.log(`===> ${new Date()}`)
    console.log(`===> Central Bank Of Genesys is online!`)
    console.log(`===> See The README.md file to get started using our API`)
});