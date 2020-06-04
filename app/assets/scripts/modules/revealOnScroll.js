import $ from 'jquery';
import Waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll{
    constructor() {
        this.featureItems = $('.feature');
        this.hideInitially();
        this.createWayPoints();
    }
    hideInitially() {
        this.featureItems.addClass('reveal-item');
    }
    createWayPoints() {
        this.featureItems.each(function () {
            let currentItem = this;
            new Waypoints({
                element: currentItem,
                handler: function () {
                    $(currentItem).addClass('reveal-item--is-visible');
                },
                offset: '75%'
            })
        })
    }
}

export default RevealOnScroll;