import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader{
    constructor() {
        this.lazyImages = $('.lazyload');
        this.header = $('.header');
        this.headerTrigger = $('.large-hero__title');
        this.stickyWayPoint();
        /* nav links highlight */
        this.navLinks = $('.nav a');
        this.pageSections = $(".page-section");
        this.createPageSectionWaypoints();
        this.addSmoothScrolling();
        this.refreshWaypoints();
    }

    addSmoothScrolling() {
        this.navLinks.smoothScroll();
    }

    refreshWaypoints() {
        // once we load our page the wayPoint library determines how 
        // many pixels it will take to perform an action, in case
        // of lazyloaded images the distance to reach a point changes
        // thus we need to update the waypoint global object each time 
        // we reach a lazyloaded image.
        this.lazyImages.on('load',function () {
            Waypoint.refreshAll();
        })
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

    createPageSectionWaypoints() {
        let that = this;
        this.pageSections.each(function () {
            let currentPageSection = this;
            new Waypoint({
                element: currentPageSection,
                handler: function (direction) {
                    if (direction == "down") {
                        let matchingHeaderLink = currentPageSection.getAttribute("data-target-link");
                        that.navLinks.removeClass("is-current-link");
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                },
                offset: "18%"
            });

            new Waypoint({
                element: currentPageSection,
                handler: function (direction) {
                    if (direction == "up") {
                        let matchingHeaderLink = currentPageSection.getAttribute("data-target-link");
                        that.navLinks.removeClass("is-current-link");
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                },
                offset: "-40%"
            });
        });
    }
}

export default StickyHeader;