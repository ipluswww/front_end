import _ from 'lodash';
import moment from 'moment';

class AgentOpsOrdersService {
	constructor (User) {
		this._User = User;
	}

    get () {
        return this.selectedItem;
    }
    set (selectedItem) {
        this.selectedItem = _.cloneDeep(selectedItem);
    }

    generateListFilter (availableOrderFilter, assignmentFilter) {
		// disposition filter includes: requested, updated, accepted, scheduled , in-transit, completed, reconciled, payment hold
		// but mainly it's about 'pending', 'in progress', 'completed'
		
		const dispositionFilters = [];
		// Make sure to turn off all to result 'pending' to be selected as default.
		if (availableOrderFilter.length < 1) {
			availableOrderFilter = ['pending'];
		}

		// ordoer filter: pending, in_progress, and completed
		if ( availableOrderFilter.indexOf('pending') >= 0 ) {
			dispositionFilters.push({disposition: "CREATED"});
			dispositionFilters.push({
				disposition: "UPDATED",
				acceptedDate: null
			});
		}

		if ( availableOrderFilter.indexOf('in_progress') >= 0 ) {
			dispositionFilters.push({
				disposition: "UPDATED",
				acceptedDate: {
					$ne: null
				}
			});
			dispositionFilters.push({
				disposition: {
					$in: ["ACCEPTED", "SCHEDULED", "IN_TRANSIT"]
				}
			});
		}

		if ( availableOrderFilter.indexOf('completed') >= 0 ) {
			dispositionFilters .push({
				disposition: {
					$in: ["COMPLETED", "RECONCILED", "PAYMENT_HOLD"]
				}
			});
		}

		let filter = {
			$or: dispositionFilters
		};


		let assignedFilter = [];
		// Assignment Filter
		if ( assignmentFilter.indexOf('me') >= 0 ) assignedFilter.push( this._User.current._id );
		// will comment it out, as we don't care about `unassigned` for now
		// if ( this.assignmentFilter.indexOf('unassigned') >= 0 ) assignedFilter.push(null);
		if (assignedFilter.length > 0) {
			filter.assigned = {
				$in: assignedFilter
			};
		}

		return filter;

	}

	generateBlackoutsFilter (yy, mm) {
		const from = moment.utc().year(yy).month(mm).date(1).startOf('month').startOf('week').toDate();
		const to = moment.utc().year(yy).month(mm).date(1).endOf('month').endOf('week').toDate();
		const filter = {
			$or: [
				{
					startDate: {
						$gte: from,
						$lte: to
					}
				},
				{
					endDate: {
						$gte: from,
						$lte: to
					}
				}
			]
		};

		return filter;
	}

	generateCalendarFilter (yy, mm) {
		const startDate = moment.utc().year(yy).month(mm).date(1).startOf('month').startOf('week').toDate();
		const endDate = moment.utc().year(yy).month(mm).date(1).endOf('month').endOf('week').toDate();

		let dateFilter = _.map(['acceptedDate', 'requestedDate1', 'requestedDate2', 'requestedDate3'], field=> {
			const q = {
				[field]: {
					$gte: startDate,
					$lte: endDate
				}
			};
			return q;
		});

		return {
			disposition: {
				$in: ["CREATED", "UPDATED", "ACCEPTED", "SCHEDULED", "IN_TRANSIT"]
			},
			$or: dateFilter
		};
	}

}

AgentOpsOrdersService.$inject = ['User'];
export default AgentOpsOrdersService;
