// Initialize array
var myArray = ["What is the meaning of life?", 42, true];

// Print elements
console.log(myArray[0]);
console.log(myArray[1]);
console.log(myArray[2]);

// Print length
console.log(myArray.length);

// Remove last two elements
myArray.pop();
myArray.pop();
console.log(myArray);

// Add true to start
myArray.unshift(true);
console.log(myArray);

// Add 42 to end
myArray.push(42);
console.log(myArray);

// Remove first element
myArray.shift();
console.log(myArray[0]);
console.log(myArray[1]);
