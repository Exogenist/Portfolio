window.onload = function () {
    function getRandomIntInclusive(min, max) {
        //    var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //---------------------------------------------------
    // animated gradient background - Swainson Holness
    //---------------------------------------------------
    var bck = document.getElementById("background");
    var lcol;
    var rcol;
    var token = 0;
    var angToken = -90;
    var tendency = false;
    var colorleft = "rgb(220, 120, 120)";
    var colorRight = "rgb(220, 220, 119)";


    function toggle() {
        if (token === 99) {
            tendency = true;
        } else if (token === 1) {
            tendency = false;
        }
    }

    function run() {
        if (tendency === false) {
            token += 1;
            angToken += 1;
        } else if (tendency === true) {
            token -= 1;
            return angToken - 1;
        }
    }

    setInterval(function () {
        toggle();
        run();

        var leftcolor = token + 0;
        var rightcolor = token + 100;

        // animation cycles through gradient location and angle degrees.
        bck.style.background =
            "linear-gradient(" +
            angToken +
            "deg, " +
            colorleft +
            " " +
            leftcolor +
            "%, " +
            colorRight +
            " " +
            rightcolor +
            "%)";
    }, 14);
    //---------------------------------------------------
    // END
    //---------------------------------------------------

    // api call, must use "https"!
    var dataPackage = {};
    dataPackage.quoteArr = [];
    var quote = dataPackage.quoteArr;
    var pgload = 1;
    var loadPer = 0;

    function pasteContent() {
        var tempNum = getRandomIntInclusive(0, 224);
        $(".content").text(quote[tempNum].body);
        $(".sig").text(quote[tempNum].author);
    }

    //====================
    // RENDER TO DOM
    //====================
    function render() {
        $(".quoteWrapper").animate({
            opacity: 1
        }, {
            duration: 500,
            complete: function () {
                pasteContent();

                //                For testing
                //                $(".content").text("Technology has moved away from sharing and toward ownership. This suits software and hardware companies just fine: They create new, bloated programs that require more disk space and processing power. We buy bigger, faster computers, which then require more complex operating systems, and so on.  This suits software and hardware companies just fine: ");
                //                $(".sig").text("Douglas Rushkoff");

                $("#background").css("grid-template-rows", "1fr");
                $(".content").css("color", colorleft);
                $(".sig").css("color", colorleft);
                $(".img").css("fill", colorleft);
                $("#dyclr1").css("stroke", colorleft);
                $("#refresh path").css("stroke", colorleft);
                $("#dyclr2").css("fill", "#00aced");
                $(".quoteWrapper").css("maxHeight", $(".content").outerHeight() + $(".img").outerHeight() + $(".sig").outerHeight() + $("#getMessage").outerHeight() + 54);
                $(".sig").animate({
                    opacity: 1
                }, {
                    duration: 500
                });
                                $("#dev").animate({
                    opacity: 0.7
                }, {
                    duration: 500
                });
            }
        });
    }

    // Get quotes
    dataPackage.loadContent = function (tag, pgNum) {
        $.ajax({
            url: 'https://favqs.com/api/quotes/?filter=' + tag + '&type=tag&page=' + pgNum,
            headers: {
                'Authorization': 'Token token="ef2942516afa8711bbff0c4ba1c59a0d"'
            }
        }).done(function (data) {
            for (var i = 0; i < 25; i++) {
                quote.push({
                    body: data.quotes[i].body,
                    author: data.quotes[i].author
                });
            }
            if (pgload <= 8) {
                pgload += 1;
                loadPer += 12.5;
                dataPackage.loadContent("life", pgload)
                $("#loadBar").css("width", (loadPer) + "%");
            } else {

                $("#progress").fadeOut();
                $(".loading").fadeOut(function () {
                    render();
                });

            }
        }).fail(function () {
            console.log("FAIL");
        });
    }

    //    initialize program
    dataPackage.loadContent("science", pgload);

    //    For debug without running api
    //                $("#progress").fadeOut();
    //                $(".loading").fadeOut(function () {
    //                    render();
    //                });

    document.getElementById("refresh").addEventListener("click", function (e) {
        e.preventDefault();
        colorleft = "rgb(" + getRandomIntInclusive(100, 220) + ", " + getRandomIntInclusive(100, 220) + ", " + getRandomIntInclusive(100, 220) + ")";
        colorRight = "rgb(" + getRandomIntInclusive(120, 220) + ", " + getRandomIntInclusive(120, 220) + ", " + getRandomIntInclusive(120, 220) + ")";

        $(".content").css("color", colorleft);
        $(".sig").css("color", colorleft);
        $(".img").css("fill", colorleft);
        $("#dyclr1").css("stroke", colorleft);
        $("#refresh path").css("stroke", colorleft);

        $(".content").css("opacity", "0");
        $(".sig").css("opacity", "0");
        $(".quoteWrapper").css("height", $(".quoteWrapper").outerHeight());
        pasteContent();
        $(".quoteWrapper").css("height", $(".content").outerHeight() + $(".img").outerHeight() + $(".sig").outerHeight() + $("#getMessage").outerHeight() + 54);
        $(".quoteWrapper").css("maxHeight", $(".content").outerHeight() + $(".img").outerHeight() + $(".sig").outerHeight() + $("#getMessage").outerHeight() + 54);
        setTimeout(function () {
            $(".sig").animate({
                opacity: 1
            }, {
                duration: 500
            });
            $(".content").animate({
                opacity: 1
            }, {
                duration: 500
            });
        }, 250);
    });
    document.getElementById("twitter").addEventListener("click", function (e) {
        window.open("https://twitter.com/intent/tweet?text=" + $(".content").text() + " Author: " + $(".sig").text(), "_blank");
    });
    window.addEventListener("resize", function () {

        setTimeout(function () {
        $(".quoteWrapper").css("height", $(".quoteWrapper").outerHeight());
        $(".quoteWrapper").css("height", $(".content").outerHeight() + $(".img").outerHeight() + $(".sig").outerHeight() + $("#getMessage").outerHeight() + 54);
        $(".quoteWrapper").css("maxHeight", $(".content").outerHeight() + $(".img").outerHeight() + $(".sig").outerHeight() + $("#getMessage").outerHeight() + 54);
//            alert();
        }, 1300);



    });

};
