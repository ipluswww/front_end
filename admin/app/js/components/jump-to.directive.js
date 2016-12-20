import $ from 'jquery';
let JumpTo = function($timeout) {
    function scroll (settings, jumpToSelector) {
        return function () {
            var scrollPane = settings.container;
            var jumpTo = angular.element(document.querySelector("#inventory-" + jumpToSelector));
            var scrollY = (typeof jumpTo == "number") ? jumpTo : $(jumpTo[0]).offset().top + $(scrollPane).scrollTop()- $(scrollPane).offset().top - settings.offset;
            $(scrollPane).animate({scrollTop : scrollY }, settings.duration, settings.easing, function(){
                if (typeof callback == 'function') { callback.call(this); }
            });
        }
    }

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var settings = angular.extend({
                container: element,
                jumpTo: angular.element(),
                offset: 0,
                duration: 500,
                easing: 'swing'
            }, attrs);
            
            scope.$watch(function() {return element.attr('jump-to'); }, function(newValue){
                if (newValue) $timeout(scroll(settings, newValue));
            });
        }
    };
};

JumpTo.$inject = ['$timeout'];

export default JumpTo;