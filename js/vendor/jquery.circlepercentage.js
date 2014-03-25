/** 
 *@author Alan Jhonnes 
 *   **/
(function($) {

    var methods = {
        init: function(options) {
            
            function removeMask($fill) {
                $fill.addClass("gt50");
            }
            return this.each(function(options) {
                var $this = $(this);
                $this.settings = $.extend(true, {}, $.fn.circlePercentage.defaults, options || {});
                var timeline = new TimelineMax();
                $this.settings.timeline = timeline;
                $this.data("circlePercentage", $this.settings);
                var $fill = $this.children(".fill");
                var $left = $fill.children(".slice-left");
                var $right = $fill.children(".slice-right");
                var targetPerc = $this.attr("data-perc");


                timeline.pause();
                var rightRotation = 180 + targetPerc * 360;
                $this.settings = $this.data("circlePercentage");
                
                if (targetPerc > 0.5) {
                    rightRotation = 360;
                    var leftRotation = targetPerc * 360;
                    var rightDuration = 0.5 / targetPerc * $this.settings.duration;
                    var leftDuration = $this.settings.duration - rightDuration;
                    timeline.to($right, rightDuration, {rotation: rightRotation, ease: Linear.easeNone});
                    timeline.call(removeMask, [$fill]);
                    timeline.to($left, leftDuration, {rotation: leftRotation, ease: Linear.easeNone});
                }
                else {
                    timeline.to($right, $this.settings.duration, {rotation: rightRotation, ease: Linear.easeNone});
                }

                timeline.tweenTo(timeline.totalDuration(), {ease: Power3.easeOut});



            });


        },
        animate: function() {
            return this.each(function() {
                var $this = $(this);
                $this.settings = $this.data("circlePercentage");
                console.log($this.settings);

            });
        }
    };

    $.fn.circlePercentage = function(methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[ methodOrOptions ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            // Default to "init"
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.circlePercentage');
        }
    };


    $.fn.circlePercentage.defaults = {
        currentPerc: 0,
        targetPerc: 100,
        duration: 2,
        animate: true,
        animateText: true
    };






    

})(jQuery);