class Person {
    constructor(name,faveColor) {
        this.name = name;
        this.faveColor = faveColor;
    }
    greet() {
        console.log(`hello from ${this.name}, my favorite color is ${this.faveColor}`);
    }
}

module.exports = Person;