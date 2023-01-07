// Console Application - Clothing App

// import prompt library
const prompt = require("prompt-sync")();

// Total available product (clothes) on our app
let products = [
    {
        id: 1,
        name: "Egg",
        price: 90,
        size: "L",
        quantity: 4,
    },
    {
        id: 2,
        name: "Rice",
        price: 45,
        size: "L",
        quantity: 12,
    },
    {
        id: 3,
        name: "Potatoe",
        price: 80,
        size: "L",
        quantity: 1,
    },
    {
        id: 4,
        name: "Yam",
        price: 20,
        size: "L",
        quantity: 10,
    },
    {
        id: 5,
        name: "Beans",
        price: 40,
        size: "L",
        quantity: 2,
    },
];

// users cart 
let cart = [];


// Application Intro
console.log("Welcome to Nancy shopping app 🛍️...");
console.log(">>>>>>>>>>");
console.log(products);
console.log(">>>>>>>>>>");
let keepAppRunning = prompt("Press 'M'  to start making an order, press  'Q'  to quit >>>> ");
let makingChoice = true;
let choice;



// Validate Product And Make Sure It Exists
const validateProduct = (id) => {
    // validation - check id the item exist in our products
    const item = products.find((item) => item.id === id);

    // if no item exists throw an error
    if (!item) {
        throw Error("\n\n\nItem with id does not exist!\n\n\n");
    }
    return item;
};

// Add a new item to the cart
const addItemToCart = (id) => {
    const item = validateProduct(id);
    // validation - check if the item exist in our cart
    const existInCart = cart.find((item) => item.id === id);
    // validation - to check the quantity in our store
    if (!existInCart) {
        item.quantity = 1;
        cart.push(item);
    } else {
        existInCart.quantity++;
    }
};

// remove an item from the cart
const removeItemFromCart = (id) => {
    const item = validateProduct(id);

    // validation - check if the item exist in our cart
    const existInCart = cart.find((item) => item.id === id);
    if (!existInCart) {
        throw Error("Item with id does not exist inside cart !");
    }
    const remainingItemInCart = cart.filter((item) => item.id !== id);
    // Update the cart
    cart = remainingItemInCart;
};

// Get all times in the cart
const getAllItemsFromCart = () => {
    return cart;
};

// Increment the quantity of an item in the cart
const incrementItem = (id) => {
    const item = validateProduct(id);
    const existCart = cart.find((item) => item.id === id);
    if (existCart) {
        existCart.quantity++;
    } else {
        throw Error("Item with id does not exist inside the cart");
    }
};

// decrement quantity of an item in the cart
const decrementItem = (id) => {
    const Item = validateProduct(id);
    const existCarts = cart.find((item) => item.id === id);
    if (!existCarts) {
        throw Error("item does not exist inside the cart");
    }
    if (existCarts) {

        if (existCarts.quantity < 2) {
            throw Error("item quantity inside the cart is less than 2");
        }
        if (existCarts.quantity >= 2) {
            existCarts.quantity--;
        }
    }
};

// Mock check out
const checkOut = () => {
    if (cart.length < 1){
        return 0;
    }
    let totalCart = cart.map((item) => item.price).reduce((a, b) => a + b);
    return totalCart;
};


while (makingChoice === true) {
    // Convert the string inside the keepAppRunning variable to lowercase
    keepAppRunning.toLowerCase();

    // if keepAppRunning equals "q", Exit the console application
    if (keepAppRunning === "q") {
        makingChoice = false;
        console.log("");
        console.log("");
        console.log(">>>>>>>>>>");
        console.log("Thank you for visiting us,lol");
        console.log(">>>>>>>>>>");
        console.log("");
        console.log("");
        break;
    }

    choice = prompt(
        " Choose from the following options:\n A. View Cart 🛒\n B. Add a product to Cart 🛒\n C. Remove a product from cart 🛒\n D. Increase Quantity of Product in Cart 🛒\n E. Decrease Quantity of Product in Cart 🛒\n F. Checkout 💳 \n Q. Exit Application \n\n"
    );

    choice = choice.toLowerCase();

    if (choice === "q") {
        makingChoice = false;
        console.log("");
        console.log("");
        console.log(">>>>>>>>>>");
        console.log("Thank you for visiting us,lol");
        console.log(">>>>>>>>>>");
        console.log("");
        console.log("");

        break;
    }

    if (choice === "a") {
        if (cart.length < 1) {
            console.log("");
            console.log("");
            console.log(">>>>>>>>>>");
            console.log(" Your cart is empty")
            console.log(">>>>>>>>>>");
            console.log("");
            console.log("");



        }
        if (cart.length >= 1) {
            console.log("");
            console.log("");
            console.log(">>>>>>>>>>");
            console.log(" Your cart 🛒")
            console.log(getAllItemsFromCart());
            console.log(">>>>>>>>>>");
            console.log("");
            console.log("");


        }
    }

    else if (choice === "b") {
        console.log("");
        console.log("");
        console.log(">>>>>>>>>>");
        let productId = prompt("What is the id of the product you want to order? ");
        console.log(">>>>>>>>>>");
        console.log("");
        console.log("");
        productId = Number(productId);

        try {
            console.log("");
            console.log("");
            console.log(">>>>>>>>>>");
            addItemToCart(productId);
            console.log(" Your cart 🛒")
            console.log(getAllItemsFromCart());
            console.log(">>>>>>>>>>");
            console.log(" ");
            console.log("");

            

        } catch (error) {
            console.log("");
            console.log("");
            console.log(">>>>>>>>>>");
            console.log(error.message);
            console.log(">>>>>>>>>>");
            console.log("");
            console.log("");

        }
    }

    else if (choice === "c") {
        console.log("");
        console.log("");
        console.log(">>>>>>>>>>");
        let productId = prompt("What is the id of the product you want to order? ");
        console.log(">>>>>>>>>>");
        console.log("");
        console.log("");
        productId = Number(productId);

        try {
            removeItemFromCart(productId);
        } catch (error) {
            console.log(error.message);
        }
    }

    else if (choice === "d") {
        console.log("");
        console.log("");
        console.log(">>>>>>>>>>");
        let productId = prompt("What is the id of the product you want to increase in your cart? >>> ");
        console.log(">>>>>>>>>>");
        console.log("");
        console.log("");
        productId = Number(productId);
        try {
            incrementItem(productId);
        } catch (error) {
            console.log(error.message);
        }
    }

    else if (choice === "e") {
        console.log("");
        console.log("");
        console.log(">>>>>>>>>>");
        let productId = prompt("What is the id of the product you want to decrease its quantity inside cart? >>>  ");
        console.log(">>>>>>>>>>");
        console.log("");
        console.log("");
        productId = Number(productId);

        try {
            decrementItem(productId);
        } catch (error) {
            console.log(error.message);
        }
    }

    else if (choice === "f") {
        let total = checkOut();
        console.log("");
        console.log("");
        console.log(">>>>>>>>>>");
        console.log("CheckOut Complete");
        console.log("Total Payment: $" + total);
        console.log(">>>>>>>>>>");
        console.log("");
        console.log("");
    }

}


