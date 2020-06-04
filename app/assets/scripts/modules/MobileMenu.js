let $ = require("jquery");

class MobileMenu{
    constructor() {
        this.menuIcon = $('.header__menu-icon');
        this.menuItems = $('.nav');
        this.header = $('.header');
        this.events();
    }
    events() {
        this.menuIcon.click(this.toggleMenu.bind(this));
    }
    toggleMenu() {
        // the value of 'this' changes depending on when and 
        // where we use it.
        // without bind, 'this' refers to the element that 
        // triggers the event 'menuIcon'.
        // when a function is used as an event handler 
        // the this keyword in that function is set to the 
        // Dom element that the event fired from.
        this.menuItems.toggleClass('nav--is-visible');
        this.header.toggleClass('header--bg');
    }
}
export default MobileMenu;