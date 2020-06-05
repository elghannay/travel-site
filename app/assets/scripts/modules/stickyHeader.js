import $ from 'jquery';
import Waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class StickyHeader{
    constructor() {
        this.header = $('.header');
        this.headerTrigger = $('.large-hero__title');
        this.stickyWayPoint();
    }
    stickyWayPoint() {
        let that = this;
        new Waypoint({
            element: this.headerTrigger[0],
            handler: function (direction) {
                if (direction === 'down')
                { that.header.addClass('header--dark'); }
                else
                { that.header.removeClass('header--dark'); }
            },
        })
    }   
}

export default StickyHeader;