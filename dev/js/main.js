require.config({
    'baseUrl' : 'js/lib',
    'paths' : {
        'bootstrap' : 'bootstrap.min',
        'easing' : 'jquery.easing.1.3',
        'jquery' : 'jquery-1.11.1.min'
    },
    'shim' : {
        'bootstrap' : {
            'deps' : ['jquery']
        },
        'easing' : {
            'deps' : ['jquery']
        }
    },
    'urlArgs' : 'bust=' + (new Date()).getTime()
});

// Detect position on page and add/remove classes
function scroller(){
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $('.navbar-brand i').removeClass('hidden');
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
        $('.navbar-brand i').addClass('hidden');
    }
}

require(['jquery', 'bootstrap', 'easing'], function($){
    $(document).ready(function(){
        // Initialize scrollspy
        $('body').scrollspy({
            'offset' : 50,
            'target' : '#navbar-main-collapse'
        });
        
        // Run scroller function
        scroller();
        $(window).scroll(scroller);
        
        // On page on nav button click
        $('a.page-scroll').bind('click', function(event){
            event.preventDefault();
            
            // Mark the active area
            $('ul.nav li').removeClass('active');
            var $anchor = $(this);
            $anchor.parent().addClass('active');
            
            // Scroll to location
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1000, 'easeInOutQuart');
        });
        
        // Closes the Responsive Menu on Menu Item Click
        $('.navbar-collapse ul li a').click(function(){
            $('.navbar-toggle:visible').click();
        });
    });
    
    // Google Maps Scripts
    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);
    
    function init() {
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        // Snazzy Maps
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(36.003639, -78.9401055),
            disableDefaultUI: true,
            scrollwheel: false,
            draggable: false,
            styles: [{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]}]
        };
    
        // Get the HTML DOM element that will contain your map 
        var mapElement = document.getElementById('map');
    
        // Create the Google Map using out element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);
    
        // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
        var image = 'images/map-marker.png';
        var myLatLng = new google.maps.LatLng(36.003639, -78.9401055);
        var beachMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
        });
    }
});
