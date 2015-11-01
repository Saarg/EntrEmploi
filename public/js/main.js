$(function() {
    var previousScroll = 0;
    $(window).on("scroll", function () {

        var currentScroll = $(this).scrollTop();

        if (currentScroll > 0 && $("#nav-header").height() > 50) {
            // ajustement de la taille du header
            $("#nav-header").css('height', $("#nav-header").height() - currentScroll/10 + 'px');
        }
        else if (currentScroll == 0) {
            $("#nav-header").css('height', '100px');            
        };
        var offres = $(".parallaxe");
        if(currentScroll >0) {
            offres.css('margin-top', -currentScroll); // effet de paxallaxe
        };
        previousScroll = currentScroll;
    });



});
