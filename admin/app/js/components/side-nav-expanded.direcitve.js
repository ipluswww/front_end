import _ from 'lodash';
let SideNavExpanded = function(SidenavExpanded) {

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			scope.SidenavExpanded = SidenavExpanded;

			scope.$watch('SidenavExpanded.get()', function(val) {

				let classString = element[0].className;
				let classArray = classString.split(' ');
				_.remove(classArray, (t) => {
					return (t == 'expanded');
				}); // This is the classname we want to manipulate
				// If user detected
				if (val) {
					classArray.push('expanded');
				}

				classString = classArray.join(" ");
				element[0].className = classString;
			});

		}
	};
};

SideNavExpanded.$inject = ['SidenavExpanded'];

export default SideNavExpanded;