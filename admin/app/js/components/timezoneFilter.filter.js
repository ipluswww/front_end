import _ from 'lodash';
let timezoneFilter = function(Zones) {
	return function(input) {
		let record = _.find(Zones.get(), {hour: input});
		return (record && record.name) ? record.name : 'No Timezone Specified';
	};
};

timezoneFilter.$inject = ['Zones'];
export default timezoneFilter;