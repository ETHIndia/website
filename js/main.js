(function($) {
  "use strict"; // Start of use strict
  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top
          },
          1000
        );
        return false;
      }
    }
  });

  // Show hide navbar bg color
  // var navTransparentBg = $("#mainNav").css("background-color", "rgba(0, 0, 0, 0)");
  // var navBgColor = $("#mainNav").css("background-color", "#363f47");

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function() {
    $(".navbar-collapse").collapse("hide");
    $("#mainNav").css("background-color", "rgba(0, 0, 0, 0)");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 57
  });

  $("#mainNav button").click(function() {
    var navBgColor = $("#mainNav").css("background-color");
    if (navBgColor === "rgba(0, 0, 0, 0)") {
      $("#mainNav").css("background-color", "#363f47");
    } else {
      $("#mainNav").css("background-color", "rgba(0, 0, 0, 0)");
    }
  });
})(jQuery); // End of use strict
