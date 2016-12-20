import _ from 'lodash';
let FullMode = function (User) {

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			scope.User = User;

			scope.$watch('User.current', function(val) {
				let classString = element[0].className;
				let classArray = classString.split(' ');
				_.remove(classArray, (t) => {
					return (t == 'full');
				}); // This is the classname we want to manipulate

				// If user detected
				if (!val) {
					classArray.push('full');
				}

				classString = classArray.join(" ");
				element[0].className = classString;
			});

		}
	};
}

FullMode.$inject = ['User'];

export default FullMode;