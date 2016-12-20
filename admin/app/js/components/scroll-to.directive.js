import $ from 'jquery';
let ScrollTo = function($timeout) {
    function scroll (settings) {
        return function () {
            var scrollPane = angular.element(document.querySelector(settings.container));
            var scrollTo = (typeof settings.scrollTo == "number") ? settings.scrollTo : angular.element(document.querySelector(settings.scrollTo));
            var scrollY = (typeof scrollTo == "number") ? scrollTo : $(scrollTo[0]).offset().top + $(scrollPane).scrollTop()- $(scrollPane).offset().top - settings.offset;
            $(scrollPane).animate({scrollTop : scrollY }, settings.duration, settings.easing, function(){
                if (typeof callback == 'function') { callback.call(this); }
            });
        }
    }

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var settings = angular.extend({
                container: 'html, body',
                scrollTo: angular.element(),
                offset: 0,
                duration: 500,
                easing: 'swing'
            }, attrs);
            
            element.on('click', function () {
                $timeout(scroll(settings));
            });
        }
    };
};

ScrollTo.$inject = ['$timeout'];

export default ScrollTo;