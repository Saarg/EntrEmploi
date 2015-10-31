$(function() {
    var previousScroll = 0;
    $(window).on("scroll", function () {

        var currentScroll = $(this).scrollTop();

        if (currentScroll > 0 && $("#nav-header").height() > 50) {
            $("#nav-header").css('height', $("#nav-header").height() - currentScroll/10 + 'px');
        }
        else if (currentScroll == 0) {
            $("#nav-header").css('height', '100px');            
        };
        var offres = $(".parallaxe");
        var position = offres.position();
        console.log(position.top);
        if(currentScroll > 0 && position.top > 300) {
            offres.css('top', -currentScroll);
        } else if (currentScroll < previousScroll) {
            offres.css('top', -currentScroll);
        };;
        previousScroll = currentScroll;
    });



});
