function Person(firstName, lastName) {
    // construct the object using the arguments
    this.firstName = firstName;
    this.lastName = lastName;

    // a method which returns the full name
    this.fullName = function() {
        return this.firstName + " " + this.lastName;
    }
}

var myPerson = new Person("John", "Smith");
console.log(myPerson.fullName());    

function Personinfo(name,age){
   this.name=name;
   this.age=age;
   
   this.describe = function(){
       return "my name is " + this.name + "my age is " + this.age;
   }
}


var jack = new Personinfo("Jack", 25);
var jill = new Personinfo("Jill", 24);
console.log(jack.describe());
console.log(jill.describe());