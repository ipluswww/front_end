function CompareMinmax() {

	return {
		require: "ngModel",
		scope: {
			otherModelValue: "=compareMinmax",
			minMax: "=minMax"
		},
		link: function(scope, element, attributes, ngModel) {

			ngModel.$validators.compareMinmax = function (modelValue) {
				return modelValue >= scope.otherModelValue;
			};

			scope.$watch("otherModelValue", function() {
				ngModel.$validate();
			});
		}
	};
}

export default CompareMinmax;