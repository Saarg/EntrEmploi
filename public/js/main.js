$(function() {
    var previousScroll = 0;
    $(window).scroll(function () {

        var currentScroll = $(this).scrollTop();

        if (currentScroll > 0 && $("#nav-header").height() > 50) {
            // ajustement de la taille du header quand on scrolle vers le bas
            $("#nav-header").css('height', $("#nav-header").height() - currentScroll/10 + 'px');
        }
        else if (currentScroll == 0) {
            // reset quand on arrive a 0
            $("#nav-header").css('height', '100px');            
        }

        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight !== 0) { /* fix pour le bounce en bas de page */
            var offres = $(".parallaxe");
            if(currentScroll > 0) {
                offres.css('margin-top', -currentScroll);
            }
        }
        previousScroll = currentScroll;
    });
});
