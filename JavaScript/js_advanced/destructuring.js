// Object Destructuring
const person = {
    head: {
        eyes: 'x',
        mouth: {
            teeth: 'x',
            tongue: 'x'
        }
    },
    body: {
        shoulders: 'x',
        chest: 'x',
        arms: 'x',
        hands: 'x',
        legs: 'my legs data'
    }   
};

let { body: { legs: myLegs } } = person; // Destructure 'legs' as 'myLegs'
console.log(myLegs); // prints 'my legs data'

// Array Destructuring
let numbers = ['2', '3', '7', '9'];

let [, , thirdPosition] = numbers; // Get the 3rd position (index 2)
console.log(thirdPosition); // prints '7'
