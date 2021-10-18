class Person {
    constructor({ first, last, age, gender, interests }) {

        // property and method definitions
        this.name = {
            'first': first,
            'last': last
        };
        this.age = age;
        this.gender = gender;
        this.interests = interests;
        //...see link in summary above for full definition
    }
    getType() {
        return 2 + 2;
    }
}

let person1 = new Person({
    first: 'Bob',
    last: 'Smith',
    age: 32,
    gender: 'male',
    interests: ['music', 'skiing'],
});

console.log(Person.prototype.getType());

console.log(person1);