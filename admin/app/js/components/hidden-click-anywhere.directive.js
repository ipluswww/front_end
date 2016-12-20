let hideWhenClickAnywhere = function ($window) {
	return {

		// bind a local scope (i.e. on link function scope) property
		// to the value of default-display attribute in our target <div>.
		scope: {
			targetClass: '@'
		},

		restrict: 'A',

		link: function (scope, element, attrs) {

			angular.element($window).bind('click', function(event){

				// Pure helper function : equivalent of jquery.closest('')
				function findAncestor (el, cls) {
					while ((el = el.parentElement) && !el.classList.contains(cls));
					return el;
				}

				var clickedElement = event.target;
				if (!clickedElement) return;

				let parentEl = findAncestor(clickedElement, scope.targetClass);

				if (!parentEl) {
					parentEl.style.display = 'none';
					return;
				}
			});
		}

	};

};

export default hideWhenClickAnywhere ;
