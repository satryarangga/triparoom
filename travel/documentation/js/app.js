$(document).ready(function() {
  var height =  $(".doc-content").height();
    $(".left-bar").css("height", height);

    $(window).scroll(function(){

        var a = 90;
        var pos = $(window).scrollTop();
        if(pos > a) {
            $(".top-bar").css({'background-color': '#FFF', 'border-bottom': '#ddd solid 1px'});
        }
        else {
            $(".top-bar").css({'background-color': 'transparent', 'border-bottom': 'none'});
        }
    });

    /*jquery smooth scroll*/
    $(document).on('click', 'a[href*="#"]', function() {
        var slashedHash = '#/' + this.hash.slice(1);
        if ( this.hash ) {

            if ( slashedHash === location.hash ) {
                $.smoothScroll({
                    scrollTarget: this.hash,
                    offset: -130,
                    speed: 500
                });
            } else {
                $.bbq.pushState(slashedHash);
            }

            return false;
        }
    });

    $(window).bind('hashchange', function(event) {
        var tgt = location.hash.replace(/^#\/?/,'');
        if ( document.getElementById(tgt) ) {
            $.smoothScroll({
                scrollTarget: '#' + tgt,
                offset: -130,
                speed: 500

            });
        }
    });
    $(window).trigger('hashchange');

});
