import _ from 'lodash';
import moment from 'moment';

let dateCustomFilter = function() {
	return function(dateStr, firstArgument) {
		if (!dateStr) return "";
		if (!firstArgument) return "";
		return moment.utc(dateStr).format(firstArgument);
	};
};

export default dateCustomFilter;
