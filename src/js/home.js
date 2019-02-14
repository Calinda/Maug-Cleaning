
/**************************
  Control the Banner size
**************************/
function homeBannerSize() {
  headerHeight = $('#header').height();
  bannerHeight = $(window).height() - headerHeight;
  $('.banner').css('height', bannerHeight);
}

$(document).ready(function() {
  homeBannerSize();
  var w = $(window).width();
  $(window).resize(function() {
    if ($(window).width()==w && !$('body').hasClass('desktop')) return; 
    w = $(window).width();
    homeBannerSize();
  });
});

/**************************************
  Navigation Fuctions
**************************************/
function headerControl() {
    windowTop = $(window).scrollTop();
    headerHeight = $('#header').outerHeight() + 100;

    if(viewport().width > 1000) {
        if(windowTop > headerHeight) {
            $('body').addClass('fixed');
        }
        else if(windowTop == 0) {
            $('body').removeClass('fixed');
        }
    }
    else {
        $('body').removeClass('fixed');
    }
}

$(document).ready(function() {
    headerControl();

    $(window).on('scroll', function() {
        headerControl();
    });

    $(window).resize(function() {
        headerControl();
    });
});
/**************************
  Main Banner
**************************/
$(document).ready(function() {
    $('#hero-banner').slick({
        fade: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 8000,
        slidesToShow: 1,
        pauseOnHover: false,
        draggable: false,
        arrows: true,
        dots: true,
        useCSS: false,
        useTransform: false,
        appendDots: '.slider-control',
        responsive: [
            {
                breakpoint: 771,
                settings: {
                    draggable: true,
                    arrows: false,
                    dots: true,
                }
            }
        ]
    });
});


/**************************
  Testimonials Slider
**************************/
$(document).ready(function() {
    $('.testimonials-slider').slick({
        speed: 800,
        infinite: true,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4500,
        slidesToShow: 1,
        pauseOnHover: false,
        draggable: false,
        arrows: false,
        dots: true,
        responsive: [
            {
                breakpoint: 1001,
                settings: 'reinit'
            },
            {
                breakpoint: 771,
                    draggable: true,
            }
        ]
    });
});