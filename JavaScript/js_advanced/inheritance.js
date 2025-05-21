// Base class Person
var Person = function() {};

Person.prototype.initialize = function(name, age) {
    this.name = name;
    this.age = age;
};

Person.prototype.describe = function() {
    return this.name + ", " + this.age + " years old.";
};

// Derived class Student
var Student = function() {};
Student.prototype = new Person();

Student.prototype.learn = function(subject) {
    console.log(this.name + " just learned " + subject);
};

// Derived class Teacher
var Teacher = function() {};
Teacher.prototype = new Person();

Teacher.prototype.teach = function(subject) {
    console.log(this.name + " is teaching " + subject);
};

// Usage
var student = new Student();
student.initialize("Alice", 20);
console.log(student.describe()); // Alice, 20 years old.
student.learn("Mathematics");    // Alice just learned Mathematics.

var teacher = new Teacher();
teacher.initialize("Mr. Smith", 40);
console.log(teacher.describe()); // Mr. Smith, 40 years old.
teacher.teach("Physics");        // Mr. Smith is teaching Physics.
