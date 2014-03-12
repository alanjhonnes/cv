$(document).ready(function(){

    $("html").niceScroll();

    var $header = $('header');
    var $window = $(window);
    var windowWidth;
    var windowHeight;
    var mobileMode = false;
    
    
    var $buttons = $("header li");
    var $sections = $("section");
    var $activeButton = $buttons.eq(0);
    var activeIndex = 0;
    var scrollpoints = [];
    var navHeight = 0;

    $activeButton.addClass("active-section");
    
    $window.resize(function(){
        windowWidth = $window.width();
        windowHeight = $window.height();
        console.log('W: ' + windowWidth + ' H: ' + windowHeight);
        if(windowWidth > 991){
            $header.css('height', windowHeight);
            var size = (windowHeight / 5) + 'px';
            $('header li span').css('lineHeight', size);
            navHeight = 0;
            mobileMode = false;
        }
        else {
            $header.css('height', 'auto');
            navHeight = 70;
            $('header li span').css('lineHeight', navHeight + 'px');
            mobileMode = true;
        }
        $sections.css('min-height', (windowHeight -navHeight)+ 'px');
        
        calculateScrollpoints();
        
        $sections.each(function(){
            var $sectionContent = $(this).children(".section-content");
            var sectionOffset = ($(this).height() - $sectionContent.height()) / 2;
           $sectionContent.css("top", sectionOffset + "px");
        });

    }).resize();
    
    function calculateScrollpoints() {
        scrollpoints = [];
        $sections.each(function() {
            var offset;
            if(mobileMode){
                offset = $(this).offset().top - 70;
            }
            else {
                 offset = $(this).offset().top;
            }
            scrollpoints.push(offset);
        });
    }
    
    
    $(window).scroll(function() {
        var scrolled = $(window).scrollTop();
        var totalPoints = scrollpoints.length;
        while (totalPoints--) {
            if (scrollpoints[totalPoints] <= scrolled) {
                if (activeIndex !== totalPoints) {
                    $activeButton.removeClass("active-section");
                    activeIndex = totalPoints;
                    $activeButton = $buttons.eq(totalPoints);
                    $activeButton.addClass("active-section");
                }
                break;
            }
        }
    });
    
    
    $items = $('header ul li');
    $items.click(function(){
        $items.removeClass('active-section');
        $(this).addClass('active-section');
        console.log(mobileMode);
        //scroll down to the respective section
        var yOffset = $("section:eq(" + $(this).index() + ")").offset().top;
        if(mobileMode){
            yOffset -= 70;
        }
        TweenLite.to(window, 0.6, { scrollTo: { y: yOffset } } );
        
        
    });

});
