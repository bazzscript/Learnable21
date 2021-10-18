//IMPORT THIS LIBRARY WHICH ENABLES US TAKE USER INPUT IN THE CONSOLE
var take_input = require('prompt-sync')();

//START
console.log("---> A 🐺LYCANTHROPE'S🐺 LOG");
// PROBLEM STATEMENT
console.log('');
console.log('-------------------------------');
console.log('');
// You will build a console app that records the events of a werewolf. 
// You will end up using this log to determine the activities that make the werewolf turn.

//INTRO
console.log('🧔 ROBOZALEEL :🗣️  Hello Super Human, I Am ROBOZALEEL, Your Personal Event Recorder');
console.log('');

//TELL USER YOU ARE EXPERIENCING classic lycanthropy & WE ARE GOING TO FIGURE OUT WHAT MAKES YOU TURN TO WEREWOLF
console.log('🧔 ROBOZALEEL :🗣️  You Are Experiencing Classic Lycanthropy And By Recording Your Events\'s, I Am Going To Help You Figure Out What Triggers Your Turning To A Werewolf');

// SOLUTION
console.log('');
console.log('-------------------------------');
console.log('');

// JOURNAL LOG
let logs = [];

console.log('🧔 ROBOZALEEL :🗣️   Enter Todays Events,  I Will Analyze And Tell You Exactly What Made You Turn...');
console.log('');
console.log("🛑 type 'STOP' to dicontinue recording your events 🛑");
console.log('');
var taking_user_input = true;

// A WHILE LOOP TO CONTINUE TAKING THE USER EVENTS AND KEEP ADDING TO LOGS ARRAY
while (taking_user_input === true) {
    var user_events = take_input('---> ').toLocaleLowerCase().toString();
    if (user_events !== 'stop') {
        logs.push(user_events);
        console.log('');
        console.table('🧔 ROBOZALEEL :🗣️   🔽 Your Events So Far 🔽')
        console.table(logs);
        console.log('');
        console.log("🛑 type 'STOP' to dicontinue recording your events 🛑");
        console.log('');

    }
    else {
        //SET TAKING USER INPUT TO FALSE TO BE ABLE TO EXIT THE WHILE LOOP
        taking_user_input = false;
    }

}


// I STRINGIFIED THE ARRAY TO BE ABLE TO USE REGEX ON IT (THAT IS HAVE FULL CONTROLL IN MY CHECKING)
logs.toString;

// I USED REGULAR EXPRESSION TO CHECK THE STRINGIFIED ARRAY TO SEE IF A USER ATE MEAT OR PIZZA, 
// YOU MIGHT ALSO BE WONDERING WHY I USE THAT TYPE OF REGEX, WELL INCASE MY USER DECIDES THAT PIZA IS THE SAME AS PIZZA E.T.C,SAME AS THE CASE OF MEAT
// NOT PERFECT REGEX BUT AT LEAST IT HELPS, ONLY CLEARLY MISPELT WORD WILL THE REGEX EXPRESSION MISS


if (/pi+z+z+a+/.test(logs) && /m+e+a+t+/.test(logs)) {
    console.log('🧔 ROBOZALEEL :🗣️   Eating Pizza and Killing/Eating Meat Made You Turn To A WereWolf');
}
else if (/pi+z+z+a+/.test(logs)) {
    console.log('🧔 ROBOZALEEL :🗣️   Eating Pizza Made You Turn To A WereWolf');
}
else if (/m+e+a+t+/.test(logs)) {
    console.log('🧔 ROBOZALEEL :🗣️   Killing Or Eating Meat Made You Turn To A Werewolf');
}
else {
    console.log('🧔 ROBOZALEEL :🗣️   You didnt turn today ');
}


