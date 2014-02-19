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
            var size = (height / 5) + 'px';
            $('header li span').css('lineHeight', size);
        }
        else {
            $header.css('height', 'auto');
            $('header li span').css('lineHeight', '70px');
        }

    }).resize();

});
