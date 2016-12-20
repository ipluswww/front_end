import _ from 'lodash';
let humanizeFilter = function() {
	return function(array) {
		return _.map(array, (text) => {
			return text.toString().toLowerCase()
				.replace(/[_-]/g, ' ')
				.replace(/(?:^|\s)\S/g, function(a) {
					return a.toUpperCase();
				});
		}).join(", ");

	};
};

export default humanizeFilter;