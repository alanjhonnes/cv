$(document).ready(function(){

    $("html").niceScroll();

    var $header = $('header');
    var $window = $(window);

    $window.resize(function(){
        var width = $window.width();
        var height = $window.height();
        console.log('W: ' + width + ' H: ' + height);
        if(width > 991){
            $header.css('height', height);
            $('header li span').css('lineHeight', (height / 5) + 'px');
        }
        else {
            $header.css('height', 'auto');
            $('header li span').css('lineHeight', '70px');
        }

    }).resize();

});
