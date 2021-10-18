//A MOVIE RENTING CONSOLE APPLICATION

// PROBLEM STATEMENT
/**
 You will work on a simple Movie renting API that 
 lets people rent movies from a movie store. 
 By applying everything learnt so far, 
 you will build out your movie renting API 
 using JavaScript Objects
 */

// SOLUTION
// The prompt-sync package helps me take Inputs From Users
const prompt = require('prompt-sync')();

//This Will Eventually Become An Array(Collection) of Object(Movies)
var movies = [];

//CREATE

//addNewMovies Function
function addNewMovies({ movieId, movieName, movieDescription, rating, releaseYear, quantityAvailable, quantityRented }) {
    this.movieName = movieName;
    this.movieDescription = movieDescription;
    this.rating = rating;
    this.releaseYear = releaseYear;
    this.quantityAvailable = quantityAvailable;
    this.movieId = movieId;
    this.quantityRented = quantityRented;

    let newMovie = {
        'movieId': movieId,
        'movieName': movieName,
        'movieDescription': movieDescription,
        'rating': rating,
        'releaseYear': releaseYear,
        'quantityAvailable': quantityAvailable,
        'quantityRented': quantityRented,

    };

    //adds new (object)movies to the first item in the movies array, this is for easier visibilty
    movies.push(newMovie);
}

addNewMovies(
    {
        movieId: 1,
        movieName: 'Captain America: Civil War',
        movieDescription: 'Friction arises between the Avengers when one group supports the government\'s decision to implement a law to control their powers while the other opposes it.',
        rating: 6.5,
        releaseYear: 2016,
        quantityAvailable: 6,
        quantityRented: 0,
    }
);
addNewMovies(
    {
        movieId: 2,
        movieName: 'Black Panther',
        movieDescription: 'After his father\'s death, T\'Challa returns home to Wakanda to inherit his throne. However, a powerful enemy related to his family threatens to attack his nation',
        rating: 7.5,
        releaseYear: 2018,
        quantityAvailable: 2,
        quantityRented: 0,
    }
);
addNewMovies(
    {
        movieId: 3,
        movieName: 'Avengers: Infinity War',
        movieDescription: 'The Avengers must stop Thanos, an intergalactic warlord, from getting his hands on all the infinity stones. However, Thanos is prepared to go to any lengths to carry out his insane plan',
        rating: 9.4,
        releaseYear: 2019,
        quantityAvailable: 4,
        quantityRented: 0,
    }
);

addNewMovies(
    {
        movieId: 4,
        movieName: 'Thor - Ragnarok',
        movieDescription: 'Deprived of his mighty hammer Mjolnir, Thor must escape the other side of the universe to save his home, Asgard, from Hela, The goddess of death',
        rating: 8.0,
        releaseYear: 2017,
        quantityAvailable: 10,
        quantityRented: 0,
    },
);


//READ
//GetAllMovies Function
function getAllMovies() {

    return movies.forEach((element, index) => {
        let movieNumber = index + 1;
        console.log('');
        console.log(movieNumber);
        console.log(`MOVIE NAME : ${element.movieName}`);
        console.log(`MOVIE RATING : ${element.rating}`);
        console.log(`RELEASE YEAR : ${element.releaseYear}`);
        if (element.quantityAvailable == element.quantityRented) {
            console.log(`RENT STATUS : ⚠️ Not Available For Rent - All Copies Has Been Rented Out ⚠️`)
        } else {
            console.log(`RENT STATUS : ${element.quantityAvailable - element.quantityRented} Copies Available For Rent`);
        }

    });

}



//UPDATE
//RentMoviesByName Function
function rentMoviesById(id) {
    let movieUserIsLookingFor;
    if (id < 1) {
        console.log('🛑 The Movie Number You Chose does not Exist 🛑')
        return false;
    } else if (id > movies.length) {
        console.log('🛑 The Movie Number You Chose does not Exist 🛑')
        return false;

    } else {
        movieUserIsLookingFor = movies.find(movieN => movieN.movieId == id);
    }

    //Renting Logic
    if (movieUserIsLookingFor.quantityRented == movieUserIsLookingFor.quantityAvailable) {
        console.log(`⚠️ All Copies of ${movieUserIsLookingFor.movieName} has been rented out and is not available for rent ⚠️`);
    } else {

        movieUserIsLookingFor.quantityRented++;
        console.log(`${movieUserIsLookingFor.movieName} has been succesfully rented`)
    }
}




//DELETE
//Removes An Object from an Array Base on a given attribute

//i actually ended up not using this code lol but i left it here,
//Becuase it was hard to implement😓 , took half of the time whle working on this task
//and so that you can see that you can delete an item from array if requested to
function removeByAttr(arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i]
            && arr[i].hasOwnProperty(attr)
            && (arguments.length > 2 && arr[i][attr] === value)) {
            arr.splice(i, 1);
        }
    }
    return arr;
}
//DeleteMoviesById Function
function DeleteMoviesById(id) {
    removeByAttr(movies, 'movieId', id);
}
//DeleteMoviesByName Function
function DeleteMoviesByName(name) {
    removeByAttr(movies, 'movieName', name);
}









//FLOW LOGIC
console.log('Hello👋 Awesome Human😃');
console.log('Welcome To BAZZscript🌴 Movie Shop 🎬');
console.log('Choose The Movie You Wish To Rent');


let amDoneShopping = false;
while (amDoneShopping == false) {

    getAllMovies();
    console.log('');
    console.log('Enter STOP to Exit Console Shop')
    console.log('');
    let userChoice = prompt('Enter The Number Of the Movie you want to rent :');
    console.log('');
    console.log('');
    console.log('');

    if (userChoice.toUpperCase() == 'STOP') {
        console.log('');
        console.log('Thank You For Renting From BAZZscript🌴  😇')
        amDoneShopping = true;
    }

    else if (userChoice > movies.length) {
        console.log('');
        console.log('🛑 No Movie Associated With That Number 🛑');
    }

    else if (isNaN(userChoice)) {
        console.log('');
        console.log(`🛑 ${userChoice} is not a number 🛑`);

    } else {
        rentMoviesById(userChoice);
    }

}
