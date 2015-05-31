/* global $: false */

// Dependencies
require('imports?jQuery=jquery!./lib/bootstrap.min');
require('imports?jQuery=jquery!./lib/jquery.easing.1.3');

// Detect position on page and add/remove classes
function scroller(){
    if ($('.navbar').offset().top > 50) {
        $('.navbar-fixed-top').addClass('top-nav-collapse');
        $('.navbar-brand i').removeClass('hidden');
    } else {
        $('.navbar-fixed-top').removeClass('top-nav-collapse');
        $('.navbar-brand i').addClass('hidden');
    }
}

$(document).ready(function(){
    // Initialize scrollspy
    $('body').scrollspy({
        'offset' : 50,
        'target' : '#navbar-main-collapse'
    });

    // Run scroller function
    scroller();
    $(window).scroll(scroller);

    // Initialize tooltips
    $('span[data-toggle="tooltip"]').tooltip();

    // On page on nav button click
    $('a.page-scroll').bind('click', function(event){
        event.preventDefault();

        // Mark the active area
        $('ul.nav li').removeClass('active');
        var $anchor = $(this);
        $anchor.parent().addClass('active');

        // Scroll to location
        $('html, body').stop().animate({
            scrollTop : $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutQuart');
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){
        $('.navbar-toggle:visible').click();
    });
});
