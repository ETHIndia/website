(function ($) {
  "use strict"; // Start of use strict
  // Smooth scrolling using jQuery easing

  $(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    // Do something
    if (scroll > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });

  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
      this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        // In mobile screens remove the height of the menu from scroll position
        if ($(window).width() <= 768) {
          $("html, body").animate({
              scrollTop: target.offset().top - 80
            },
            1000
          );
        } else {
          $("html, body").animate({
              scrollTop: target.offset().top
            },
            1000
          );
        }        
        return false;
      }
    }
  });

  // Show hide navbar bg color
  // var navTransparentBg = $("#mainNav").css("background-color", "rgba(0, 0, 0, 0)");
  // var navBgColor = $("#mainNav").css("background-color", "#363f47");

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
    if (window.innerWidth < "992") {
      $(".navbar-collapse").collapse("hide");
      $("#mainNav").css("background-color", "#111C33");
    }
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 57
  });
})(jQuery); // End of use strict