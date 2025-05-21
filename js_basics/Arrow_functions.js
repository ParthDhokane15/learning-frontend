let numbers = [3, 5, 8, 9, 2];

// Old way
function multiplyByTwo(number) {
    return number * 2;
}

let multipliedNumbersOld = numbers.map(multiplyByTwo);
console.log(multipliedNumbersOld); // prints: [6, 10, 16, 18, 4]

// Using ES6 arrow functions
let multipliedNumbersES6 = numbers.map(number => number * 2);
console.log(multipliedNumbersES6); // prints: [6, 10, 16, 18, 4]
