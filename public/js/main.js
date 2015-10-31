$(function() {
    
    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 0) {
            $("#nav-header").css('height', $("#nav-header").height() - $(this).scrollTop()/100 + 'px');
        }
        else {
        }
    });



});
