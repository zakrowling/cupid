$(document).ready(function() {

  // On page load, start at the bottom
  loadAtBottom();

  // When user scrolls, update side pagination
  $(window).scroll(function(event){
    updatePaginationOnScroll();
    parallaxScroll();
    checkIfAtBottom();
  }).scroll();

  $('.pagination li').click(function() {
    var active_item = $(this).attr('class');
    $('.pagination li').removeClass('is-active');
    $(this).addClass('is-active');
    scrollToSection(active_item);
  });

  // Scroll up to next section
  $('.scroll-up').click(function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      if ($(this).hasClass('large')) {
        $('.pagination li.is-active').prev('li').click();
      }
    } else {
      $('.pagination li.is-active').prev('li').click();
    }
    
  });


  // Trigger Overlay
  $('.trigger-overlay').click(function() {
    var getSectionNumber = $(this).parents('section').attr('class');
    var overlaySection = $('section.' + getSectionNumber);
    overlaySection.addClass('show-overlay');

    // Hide titles
    $(this).fadeOut(500);

    // Scroll to top of panel
    setTimeout(function() {
      $('html, body').animate({
        scrollTop: overlaySection.offset().top
      }, 500);
    }, 500);
    
    setTimeout(function() {
      $('.show-overlay .overlay-container').fadeIn(1000);
    }, 600);

    if(overlaySection.find('.video').length !== 0) {
      $('.show-overlay .video')[0].src += "&autoplay=1";
    }
  });


  // Close Overlay
  $('.close.btn').click(function() {
    var getSectionNumber = $(this).parents('section').attr('class').split(' ')[0];
    var overlaySection = $('section.' + getSectionNumber);

    // Show title
    $('.show-overlay .overlay-container').fadeOut(500);
    setTimeout(function() {
      $('section .trigger-overlay').show();
      $('section').removeClass('show-overlay');
    }, 650);
  });

});

function loadAtBottom() {
  $(window).load(function() {
    $('html, body').animate({ scrollTop: $(document).height() }, 1);
  });
}

function checkIfAtBottom() {
  if($(window).scrollTop() + $(window).height() != $(document).height()) {
    $('body').removeClass('load-bottom');
  } else {
    $('body').addClass('load-bottom');
  }
}

function parallaxScroll() {
  scrollPosition = $(window).scrollTop()
  $('.parallax-effect').css('top', (scrollPosition/20) + 'px');
};

function scrollToSection(activeItem) {
  var scrollSpeed = 400;
  $('html, body').animate({
    scrollTop: $("a[name=" + activeItem + "]").offset().top
  }, scrollSpeed);
}

function updatePaginationOnScroll() {
  // Scroll to each section
  var windscroll = $(window).scrollTop();
  var viewportHeight = $(window).height() - 100;
  if (windscroll >= 0) {
    $('section').each(function(i) {
      var sectionPosition = $(this).position().top - viewportHeight;
      if (sectionPosition <= windscroll) {
          $('.pagination li').removeClass('is-active');
          $('.pagination li').eq(i).addClass('is-active');
      }
    });
  } else {
    $('.pagination li').removeClass('is-active');
  }
}