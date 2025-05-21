var person = { name: "John" };

function printName() {
    console.log(this.name);
}

// Using bind
var boundPrintName = printName.bind(person);
boundPrintName(); 

// Using call
printName.call(person); 

// Using apply
printName.apply(person); 

// Difference between bind and call
var returnValue = printName.call(person); // Executes immediately
console.log(returnValue); // undefined

var delayedPrintName = printName.bind(person); // Doesn't execute yet
delayedPrintName(); // Executes when called

// Manual bind using call
var customBoundPrintName = function() {
    printName.call(person);
};
customBoundPrintName();
