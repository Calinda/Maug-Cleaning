/****************************
  Inner Slider
****************************/
$(document).ready(function() {
    $('.inner-slider').slick({
        fade: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4500,
        slidesToShow: 1,
        pauseOnHover: false,
        draggable: false,
        arrows: true,
        dots: false,
        useCSS: false,
        useTransform: false,
        appendArrows: '.slider-control.inner',
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


/****************************
  Content Toggle
****************************/
function contentToggle() {
    $('.head-toggle').each(function() {
        var nextContent = $(this).next('.content-toggle');
        $(this).on('click', function() {
            $('.head-toggle').not(this).parent('div').removeClass('open');
            $(this).parent('div').toggleClass('open');
            $(nextContent).slideToggle(300);
            $('.content-toggle').not($(nextContent)).slideUp();
        });
    });
}

$(document).ready(function() {
    contentToggle();
});


/****************************
  Left Sidebar position
****************************/
function leftSidebarPos() {
    if($('.col-left').hasClass('sidebar')) {
        if(viewport().width <= 900) {
            $('.col-left').insertAfter('.col-right');
        }
        else {
            $('.col-left').insertBefore('.col-right');
        }   
    }
}

$(document).ready(function() {
    leftSidebarPos();

    $(window).resize(function() {
        leftSidebarPos();
    });
});