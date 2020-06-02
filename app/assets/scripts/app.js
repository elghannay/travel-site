// when we include js with js we don't need to add .js
var Person = require("./modules/Person");
// the Person variable will store the exports object which is by default empty.

const person = new Person('mohamed', 'blue');
person.greet();
