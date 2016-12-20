import _ from 'lodash';
import moment from 'moment';

let dateAPFilter = function() {
	return function(dateStr, firstArgument) {
		if (!dateStr) return "";

		let template = "MM/DD/YYYY A";

		if (firstArgument === "short") {
			template = "MM/DD/YY a";
		} else if (firstArgument === "medium") {
			template = "MMM DD, YYYY  A";
		} else if (firstArgument === "long") {
			template = "ddd, MMM DD, YYYY  A";
		}

		return moment.utc(dateStr).format(template);
	};
};

export default dateAPFilter;
