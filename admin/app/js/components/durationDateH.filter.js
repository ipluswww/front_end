import _ from 'lodash';
import moment from 'moment';

let durationDateHFilter = function() {
	return function(dateStr, firstArgument) {
		if (!dateStr) return "";

		let template = "MM/DD/YYYY hh A";

		if (firstArgument === "short") {
			template = "MM/DD/YY h a";
		} else if (firstArgument === "medium") {
			template = "MMM DD, YYYY hh A";
		} else if (firstArgument === "long") {
			template = "ddd, MMM DD, YYYY hh A";
		}

		return moment.utc(dateStr).format(template) + ' - ' + moment.utc(dateStr).add(2, 'hours').format("hh A");
	};
};

export default durationDateHFilter;
