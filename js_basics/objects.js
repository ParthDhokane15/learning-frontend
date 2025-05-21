// Array of person objects
var people = [
  { firstName: "Parth", lastName: "Dhokane", age: 21, salary: 50000 },
  { firstName: "Amit", lastName: "Sharma", age: 25, salary: 60000 },
  { firstName: "Neha", lastName: "Gupta", age: 22, salary: 55000 }
];

for (var i = 0; i < people.length; i++) {
  console.log("Person " + (i + 1) + ":");
  for (var key in people[i]) {
    console.log(key + ": " + people[i][key]);
  }
  console.log("-------------------"); 
}

// Output:
// Person 1:
// firstName: Parth
// lastName: Dhokane
// age: 21
// salary: 50000
// -------------------
// Person 2:
// firstName: Amit
// lastName: Sharma
// age: 25
// salary: 60000
// -------------------
// Person 3:
// firstName: Neha
// lastName: Gupta
// age: 22
// salary: 55000
// -------------------
