import $ from 'jquery';
import Waypoint from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll{
    constructor(elm , offset) {
        this.elementToReveal = elm;
        this.offsetPercentage = offset;
        this.hideInitially();
        this.createWayPoints();
    }
    hideInitially() {
        this.elementToReveal.addClass('reveal-item');
    }
    createWayPoints() {
        let that = this;
        this.elementToReveal.each(function () {
            let currentItem = this;
            new Waypoint ({
                element: currentItem,
                handler: function () {
                    $(currentItem).addClass('reveal-item--is-visible');
                },
                offset: that.offsetPercentage
            })
        })
    }
}

export default RevealOnScroll;