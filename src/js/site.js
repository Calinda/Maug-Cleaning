/**************************************
   Prevent Default of Anchor Tags
**************************************/
$(document).ready(function() {
  $('.no-click').click(function(e) {
    e.preventDefault();
  });
});


/*****************************
 WHO AM I? controller
 ****************************/
$(document).ready(function() {
    $desktop = ($.browser.desktop) ? ' desktop' : '';
    $('body').addClass($.browser.name+' '+$.browser.platform+$desktop);
});


/*****************************
  Scroll To a place on page
*****************************/
function getPosition(object, amount, time) {
  
  page = $('html, body');
  
  page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
    page.stop();
  });
  
  if(time === undefined) { time = 1000 }
  
  if(amount === undefined) { amount = false }
    
  if(object.indexOf('#') != -1) {
    item_id = object;
  } else {
    item_id = '#' + object;
  }
  
  //Define the Header/Nav Height
  lessHeight = 120;
  lessHeight = (amount !== false) ? amount : lessHeight;

  if($(item_id).offset() === undefined) {
    return;
  }
  
  var position = ($(item_id).offset().top) - lessHeight;

  page.animate({
    scrollTop: position
  }, time, function() {
    setTimeout(function(){ 
      if($('body').hasClass('open')) {
        $('.menu-btn').click();
      }
    },100);
    page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
  });
}


/***************************
  Control URL Hashing
***************************/
function hasHashChange() {
  hashURL = window.location.hash;
  if(hashURL.indexOf('/') != -1) {
    hashURL = hashURL.slice(0,-1);
  } else {
    return false;
  }
  hashLength = hashURL.length
  hashURL = hashURL.substring(1,hashLength);
  
  if(hashURL != '') {
    getPosition(hashURL);
  }
}
  
$(window).load(function() {
  hasHashChange();
  $(window).on('hashchange', function() {
    hasHashChange();
  });
});


/***************************
  Load a photo gallery
***************************/
function photoGallery(galID, galleryTitle, startNum) {
  if(startNum === undefined) {
    startNum = 1;
  }
  if($('.full-gallery').length <= 0) {
    $.get('/ajax/photo-gallery/?galID='+galID+'&galTitle='+galleryTitle+'&startNum='+startNum, function(data) {
      $(data).appendTo('#gallery'+galID);
      $('#photo-gallery').click();
    });
  }
}


/****************************
  Modal Controller
****************************/
function modalControl() {
  $('.modal').click(function(e) {
    e.preventDefault();
    modalID = $(this).attr('data-id');
    if($(this).attr('data-width') !== undefined) {
      modalWidth = $(this).attr('data-width');
    } else {
      modalWidth = 1000;
    }

    hs.htmlExpand(null, { slideshowGroup: 'misc', contentId: modalID, wrapperClassName: 'misc borderless no-footer', outlineType: false, maxWidth: modalWidth });
  });
}

$(document).ready(function() {
  modalControl();
});


/****************************
  Viewport Fuctions
 ***************************/
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}


/****************************
  Search Controller
****************************/
function searchController() {
    $('#search').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('close');
        $('#search-box').toggleClass('show');
        if($(this).hasClass('close')) {
            $(this).attr('title', 'Close Search');
        }
        else {
            $(this).attr('title', 'Search');
        }
    });
}

$(document).ready(function() {
    searchController();
    $(window).on('scroll', function() {
        if($('#search-box').hasClass('show')) {
            $('.search-btn').removeClass('close').attr('title', 'Search');
            $('#search-box').removeClass('show');
        }
    });
});


/*************************
  Content Toggle
 **************************/
function contentToggle(){
    $('.toggle-open .toggle-content').slideDown();
    $('.toggle-list .toggle-head').each(function(){
        $(this).on("click", function(){
            $(this).closest('.toggle-box').toggleClass('toggle-open').find('.toggle-content').slideToggle(300);
            return false;
        });
    });
}
$(document).ready(function() {
    contentToggle();
});

/*************************
  Info Cell Width
 **************************/
function controlInfoWidth(){
    var margWidth = ($(window).width() - 1100)/2;
    var celWidth = 425 + margWidth;
    if(viewport().width > 1100) {
      $('.cstm-width').css('width',celWidth);
    }
}

$(document).ready(function() {
    controlInfoWidth();

    $(window).resize(function(){
       controlInfoWidth();
    });
});

/****************************
  Submenu Controller
****************************/
function subMenuControl() {
    $('.sub-menu').each(function() {
        $(this).closest('li').addClass('has-child');
    });

    if(viewport().width <= 1000) {
        $('.has-child').each(function() {
            sub_ctrl = $('<div class="sub-ctrl"></div>');
            if($(this).find('.sub-ctrl').length < 1) {
                $(sub_ctrl).prependTo(this);
            }

            $(sub_ctrl).on('click', function() {
                $(this).toggleClass('show');
                $(this).siblings('.sub-menu').slideToggle();
            });
        });
    }
    else {
        $('.sub-ctrl').remove();
        $('.sub-menu').removeAttr('style');
    }
}
$(document).ready(function() {
    subMenuControl();

    $(window).resize(function() {
        subMenuControl();
    });
});



/******************************
  Responsive for Mobile Device
*******************************/


/*************************
  MOBILE MENU
**************************/
function navControlMobile() {
	$('#nav-btn').on('click', function(e) {
	    e.preventDefault();
        $('body').addClass('open');
    });
    $('#nav-close-btn').on('click', function(e) {
        e.preventDefault();
        $('body').removeClass('open');
    });
}

function navResize(){
  if(viewport().width > 1000)  {
      $('body').removeClass('open');
  }
}

function blockResizePos() {
    if(viewport().width <= 900) {
        // add top-menu items to mobile nav
        if($('.nav-menu .top-menu li').length < 1) {
            $('.top-menu li').appendTo('.nav-menu').addClass('from-top');
        }
    }
    else {
        // remove top-menu items from mobile nav
        if($('.top-menu li').length < 1) {
            $('.nav-menu .from-top').prependTo('.top-menu').removeClass('from-top');
        }
    }
}

$(document).ready(function() {
    navControlMobile();
	  navResize();
    blockResizePos();
	 
	  $(window).resize(function() {
		    navResize();
        blockResizePos();
	  });
});