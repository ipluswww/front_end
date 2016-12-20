import _ from 'lodash';
class ProspectHelperService {

	constructor(User) {
		this._User = User;
	}

	isProspects(params) {
		return params.newCustomerFilter.indexOf('inquiries') < 0;
	}

	generateFilter(params) {
		let customerFilter = [];


		// New customer filter first, it is going to be valid only for partners and/or reservation
		if ( params.newCustomerFilter.indexOf('partners') >= 0 ) customerFilter.push({$or:[{source: {$ne: "Reservation"}}, {source: {$exists: false}}, {source:null}]});
		if ( params.newCustomerFilter.indexOf('reservation') >= 0 ) customerFilter.push({source: 'Reservation'});

		let filter = {};
		if (customerFilter.length > 0) {
			filter = {$or: customerFilter};
		} else {
			filter = {source: null};
		};

		// if it's `inquiries`, we will just switch between service
		if ( !this.isProspects(params) ) {
			// for inquiries we care abotu dateSubmitted within 90 days
			let minDate = new Date();
			minDate.setDate(minDate.getDate() - 900); // TODO: for testing purpose, but it should be back to 90 days only.
			filter.dateCreated = {$gte: minDate};
		} else {
			// the page is about order with disposition of PROSPECT
			filter.disposition = "PROSPECT";
		}




		// Assignment Filter
		let assignedFilter = [];

		if ( params.assignmentFilter.indexOf('me') >= 0 ) assignedFilter.push( this._User.current._id );
		if ( params.assignmentFilter.indexOf('unassigned') >= 0 ) assignedFilter.push(null);

		if (assignedFilter.length > 0) {
			const key = this.isProspects(params) ? "assigned._id" : "assigned";
			filter[key] = {
				$in: assignedFilter
			};
		}

		if ( this.isProspects(params) ) {
			if (params.markets) {
				filter["market._id"] = {
					"$in": _.map(params.markets, market => market._id)
				};
			} else {
				filter["market._id"] = {
					"$ne": null
				};
			}
		}

		return filter;
	}
}

ProspectHelperService.$inject = ['User'];

export default ProspectHelperService;
