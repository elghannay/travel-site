// when we include js with js we don't need to add .js
var Person = require(".app/assets/scripts/modules/Person");

const person = new Person('mohamed', 'blue');
person.greet();