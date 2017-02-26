// Create a class or constructor
function Persion(name){
  this.name = name
}

// the function person has a prototype property
// we can add properties to this function prototype
Person.prototype.age = 23

// when we create a new object using new
var p1 = new Person('Hasan');

// the prototype of the new object points to person.prototype
p1.__proto__ == Person.prototype //=> true

// in the new object we have access to properties defined in Person.prototype
p1.age // 23

