window.onload = function () {
    var closeBtn = document.querySelector(".close");
    var sideNav = document.querySelector(".sidenav");
    var hamburger = document.querySelector(".ham-box");
    //    var logo = document.querySelector(".sideNavLogoIn");
    var links = document.querySelector(".sidenav a");
    var background = document.querySelector(".overlay");
    var token = false;

    function closeSide(eve) {

        background.style.cursor = "default";
        token = false;
        sideNav.style.width = "0px";
        //        logo.style.opacity = "0";
        background.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
    }

    closeBtn.addEventListener("click", function (event) {
        closeSide();
    });

    hamburger.addEventListener("click", function (event) {
        event.preventDefault();
        background.style.cursor = "pointer";
        sideNav.style.width = "280px";
        //        logo.style.opacity = "1";
        background.style.zIndex = "3";
        //        sideNav.style.zIndex = "1";
        background.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
        token = true;
    });

    background.addEventListener("click", function (event) {
        closeSide();
    });

    background.addEventListener("transitionend", function (event) {
        if (token === false) {
            background.style.zIndex = "-1";
        }
    });

    //    init parallax
    $('.header').parallaxie();
    $('.intrelude').parallaxie();

    //        scroll animation
    $(this).scrollTop(0);
    scroll = $(window).scrollTop();
    $(window).scroll(function () {
        scroll = $(window).scrollTop();
        $(".slideanim").each(function () {
            var pos = $(this).offset().top;
            if (pos < scroll + 840) {
                $(this).addClass("slide");
            }
        });
    });


    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

}
