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
});
