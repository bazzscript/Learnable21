const prompt = require("prompt-sync")();
const { MongoClient, ObjectId } = require("mongodb");


// Create Todos
async function createTodos(client, title, myTodo, priority) {
    const newTodo = {
        title: title,
        note: myTodo,
        priority: priority,
    };

    const result = await client.db("Todos").collection("Notes").insertOne(newTodo);
    console.log(`1 New Todo created: ${result}`);

};

// Read Todos
async function readTodos(client) {
    const result = client.db("Todos").collection("Notes").find({});
    const x = await result.toArray();

    console.log(`Your Todos : 👇`);
    console.log(x);
};

// Update Todos
async function updateTodo(client, todoId, title, myTodo, priority) {
    var myquery = {
        _id: ObjectId(todoId),
    };
    var newvalues = {
        $set: {
            title: title,
            note: myTodo,
            priority: priority,
        },
    };
    const result = await client.db("Todos").collection("Notes").updateOne(myquery, newvalues);

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated  : 👇`);
};

// Delete Todos
async function deleteTodo(client, todoId) {
    // Delete Todo By Id
    var myquery = {
        _id: ObjectId(todoId),
    };
    const result = await client.db("Todos").collection("Notes").deleteOne(myquery);
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
};






// Intro into our code
async function main() {

    // Url to the db
    var url =
        "mongodb+srv://nancyokeke:nancyokeke@cluster0.6tjlwko.mongodb.net/?retryWrites=true&w=majority";

    // Instantiate Mongodb client
    const client = new MongoClient(url, { useUnifiedTopology: true, });



    try {
        console.log(">>>>>>>>>>");
        console.log("Welcome to Your Todo Console App...");
        console.log(">>>>>>>>>>");

        let keepAppRunning = prompt("Press 'S' to start, press  'Q'  to quit >>>> ");

        let quit = false;
        let choice;

        // Connect to the MongoDB cluster
        await client.connect();

        // Start a loop
        while (quit === false) {
            // Convert the string inside the KeepAppRunning variable too lowerCase
            keepAppRunning.toLowerCase();

            // if keepAppRunning equals "q", Exit the console application
            if (keepAppRunning === "q") {
                todos = false;
                console.log(">>>>>>>>>>");
                console.log("Thank you for visiting us,lol");
                console.log(">>>>>>>>>>");
                break;
            }

            choice = prompt(
                " Choose from the following options:\n C. Create Todo \n R. Read Todo \n U. Update Todo \n D. Delete Todo \n E. Exit Application \n\n"
            );
            choice = choice.toLowerCase();

            if (choice === "e") {
                quit = true;
                console.log(">>>>>>>>>>");
                console.log("");
                console.log("Thank you for visiting us,lol");
                console.log("");
                console.log(">>>>>>>>>>");
                break;
            }

            if (choice === "c") {
                let title = prompt("What is the title of your todo?");
                let myTodo = prompt("What is your Todo?");
                let priority = prompt("What is the priority of Your Todo?");
                console.log("");
                console.log(">>>>>>>>>>");
                console.log("");
                await createTodos(client, title, myTodo, priority);
                console.log("");
                console.log(">>>>>>>>>>");
                console.log("");

            }

            //
            if (choice === "r") {
                console.log("");
                console.log("");
                console.log(">>>>>>>>>>");
                await readTodos(client);
                console.log(">>>>>>>>>>");
                console.log("");
                console.log("");
            }

            //
            if (choice === "d") {
                let todoId = prompt("What is the Id of the Todo you want to delete? ");
                console.log("");
                console.log("");
                console.log(">>>>>>>>>>"); 
                await deleteTodo(client, todoId);
                console.log(">>>>>>>>>>");
                console.log("");
                console.log("");
            }

            //
            if (choice == "u") {
                let todoId = prompt("What is the id of the item you want to update?");
                let title = prompt("Enter a new Title ");
                let myTodo = prompt("Enter a new Todo ");
                let priority = prompt("Enter an updated Priority");
                todoId.toString();
                console.log("");
                console.log("");
                console.log(">>>>>>>>>>");
                await updateTodo(client, todoId, title, myTodo, priority);
                console.log(">>>>>>>>>>");
                console.log("");
                console.log("");
            }
        }


    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }

}



// Run Our code
// if there is any error, catch it and console.log the error
main().catch(console.error);