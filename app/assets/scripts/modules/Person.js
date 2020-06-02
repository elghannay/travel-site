class Person {
    constructor(name,faveColor) {
        this.name = name;
        this.faveColor = faveColor;
    }
    greet() {
        console.log(`hello from ${this.name}, my favorite color is ${this.faveColor}`);
    }
}
/*
if we want to export specific properties of the class we need to specify them in the
 export object. export = {};
    exports.name = name;
    export.greet = function(){ console.log('greeting') }
*/ 
// to be able to export the entire class we use the parent of the exports method.
module.exports = Person;