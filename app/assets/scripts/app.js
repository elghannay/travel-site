/*
if we want to export specific properties of the class we need to specify them in the
 export object. export = {};
    exports.name = name;
    export.greet = function(){ console.log('greeting') }
*/ 
// to be able to export the entire class we use the parent of the exports method.
// module.exports = Person;
// when we include js with require we don't need to add .js
// the Person variable will store the exports object which is by default empty.
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/revealOnScroll";
import StickyHeader from "./modules/StickyHeader"
import $ from "jquery"


let mobileMenu = new MobileMenu();
new RevealOnScroll($('.feature'), '90%');
new RevealOnScroll($('.testimonial'), '80%');
new StickyHeader();