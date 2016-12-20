import _ from 'lodash';
import moment from 'moment';
import AbstractController from '../../abstract/abstract.controller.js';

class  HomeAgentCalendarController extends AbstractController {

	constructor ($q, $scope, $state, Agent, User, $window, $mdDialog, $mdToast, SelectedOrderService){
		// First need to check if it is alright to be accessed this url.
		// In order to prevent user to access the url by entering the urlmanually.
		super($q, User, $state, $mdDialog, $mdToast, $window);

		// Override parent property with controller specific variable
		this._allowedRoles = ['ROLE_USER', 'ROLE_ADMIN'];
		this.parentID = "homeAgentCalendar";

		this._$scope = $scope;
		this._Agent = Agent;
		this._User = User;
		this._SelectedOrderService = SelectedOrderService;

		this.agentId = this._User.current.agent ? this._User.current.agent._id : null;

		this.init();
    }

	init () {
		if (!super.init()) return false;

		this.calendar = {
			_values: {
				monthes: moment.months(),
				weekdays: moment.weekdaysShort()
			},
			yyyy: moment().year(),
			mm: moment().month(),
			dd: moment().date(),
			data: null
		};
		this.blackouts = [];

		this.drawCalendar();

		const self = this;
		const unbindOrderWatch = this._$scope.$watch(() => this._SelectedOrderService.get(), (newValue) => {
			if (newValue !==null && angular.isDefined(newValue)) {
				const selectedItem = _.find(self.data, {_id: newValue._id});
				if (selectedItem) {
					selectedItem.agentManifests = _.cloneDeep(newValue.agentManifests);
				}
			}
		});
		this._$scope.$on('$destroy', () => {
			unbindOrderWatch();
		});
	}

	getData() {
		let deferred = this._$q.defer();
		this.promise = deferred.promise;
		const query = {
			limit: 0,
			page: 1,
			skip: 0
		};
		const filter = this.generateFilter();

		this._Agent.orders(this.agentId, query, filter).then( (res) => {
			this.data = res.data;
			deferred.resolve();
		}, (err) => {
			deferred.resolve();
		});
	}

	getBlackoutData() {
		const query = {
			limit: 0,
			page: 1,
			skip: 0
		};
		const from = moment.utc().year(this.calendar.yyyy).month(this.calendar.mm).date(this.calendar.dd).startOf('month').startOf('week').toDate().toString();
		const to = moment.utc().year(this.calendar.yyyy).month(this.calendar.mm).date(this.calendar.dd).endOf('month').endOf('week').toDate().toString();
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
		this._Agent.blackouts(this.agentId, query, filter).then(res => {
			this.blackouts = res.data;
		});
	}

	// set calendar params for drawing
	drawCalendar() {
		let current = moment.utc().year(this.calendar.yyyy).month(this.calendar.mm).date(this.calendar.dd).startOf('month').startOf('week');
		const to_date = moment.utc().year(this.calendar.yyyy).month(this.calendar.mm).date(this.calendar.dd).endOf('month').endOf('week');
		
		const weeks = [];
		let week = [];

		while (current.format('YYYYMMDD') <= to_date.format('YYYYMMDD')) {
			week.push({
				yyyy: current.year(),
				mm: current.month(),
				dd: current.date(),
				active: this.calendar.mm === current.month()
			});

			if (current.weekday() === 6) {
				weeks.push(week);
				week = [];
			}

			current.add(1, 'days');
		}
		this.calendar.data = weeks;

		this.getData();
		this.getBlackoutData();
	}

	// api call related helper
	generateFilter () {
		const startDate = moment.utc().year(this.calendar.yyyy).month(this.calendar.mm).date(this.calendar.dd).startOf('month').startOf('week').toDate();
		const endDate = moment.utc().year(this.calendar.yyyy).month(this.calendar.mm).date(this.calendar.dd).endOf('month').endOf('week').toDate();

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

	setMonth(index) {
		this.calendar.mm = index;
		if (index !== null) {
			this.calendar.dd = 1;
			this.drawCalendar();
		}
	}

	onArrow(step) {
		if (this.calendar.mm === null) {
			this.calendar.yyyy += step;
		} else {
			this.calendar.dd = 1;
			this.calendar.mm += step;
			if (this.calendar.mm < 0) {
				this.calendar.yyyy += step;
				this.calendar.mm = 11;
			} else if (this.calendar.mm >= 12) {
				this.calendar.yyyy += step;
				this.calendar.mm = 0;
			}
			this.drawCalendar();
		}
	}

	// check if order is pending/in_process/in_transit
	getType(order) {
		let type = "in_process";
		if ( order.disposition === "CREATED" || (order.disposition === "UPDATED" && !order.acceptedDate) ) {
			type = "pending";
		} else if ( order.disposition === "SCHEDULED" || order.disposition === "IN_TRANSIT" ) {
			type = "in_transit";
		}
		return type;
	}

	// find date field for order
	getDateOfOrder(order, yyyy, mm, dd) {
		const from = moment.utc().year(yyyy).month(mm).date(dd).startOf('day').toDate().getTime();
		const to = moment.utc().year(yyyy).month(mm).date(dd).startOf('day').add(24, 'hours').toDate().getTime();

		const type = this.getType(order);
		let date = null;

		if (type !== "pending") {
			const accDate = order.acceptedDate ? moment.utc(order.acceptedDate).toDate().getTime() : 0;
			if (from <= accDate && accDate < to) {
				date = order.acceptedDate
			}
		} else {
			const reqDate1 = order.requestedDate1 ? moment.utc(order.requestedDate1).toDate().getTime() : 0;
			const reqDate2 = order.requestedDate2 ? moment.utc(order.requestedDate2).toDate().getTime() : 0;
			const reqDate3 = order.requestedDate3 ? moment.utc(order.requestedDate3).toDate().getTime() : 0;
			if (from <= reqDate1 && reqDate1 < to) {
				date = order.requestedDate1;
			} else if (from <= reqDate2 && reqDate2 < to) {
				date = order.requestedDate2;
			} else if (from <= reqDate3 && reqDate3 < to) {
				date = order.requestedDate3;
			}
		}
		return date;
	}

	// get orders by year, month, day, and am/pm
	getOrderForDate(yyyy, mm, dd) {
		const from = moment.utc().year(yyyy).month(mm).date(dd).startOf('day').toDate().getTime();
		const to = moment.utc().year(yyyy).month(mm).date(dd).add(24, 'hours').toDate().getTime();
		const orders = [];

		_.each(this.data, order => {
			if (this.getDateOfOrder(order, yyyy, mm, dd)) {
				orders.push(order);
			}
		});
		return orders;
	}

	// display order with format
	displayOrder(order, yyyy, mm, dd) {
		let result = "";
		const type = this.getType(order);
		const date = this.getDateOfOrder(order, yyyy, mm, dd)
		if (type === "in_transit") {
			result = `${moment.utc(date).format('HH:mm')}-${moment.utc(date).add(2,'hours').format('HH:mm')}`;
		} else if (type === "in_process") {
			result = `${moment.utc(date).format('HH:mm')}-${moment.utc(date).add(2,'hours').format('HH:mm')}`;
		} else if (type === "pending") {
			result = `${moment.utc(date).format('A')}`;
		}
		result += order.goingToWarehouse ? " Pickup" : " Delivery";
		result += " " + order.customer.name;
		return result;
	}

	// check if am/pm is blackouts, return blackoutId or false
	isBlackout(yyyy, mm, dd, h) {
		const now = moment.utc().startOf('year').year(yyyy).month(mm).date(dd).hour(h).toDate().getTime();
		const blackouts = _.filter(this.blackouts, blackout => {
			return (moment.utc(blackout.startDate).toDate().getTime() <= now) && (now < moment.utc(blackout.endDate).toDate().getTime());
		});
		return blackouts.length > 0 ? blackouts[0]._id : false;
	}

	// set/unset am/pm as blackout
	toggleBlackout(yyyy, mm, dd, h) {
		const blackoutId = this.isBlackout(yyyy, mm, dd, h);
		if (blackoutId) {
			// unset blackout
			this._Agent.deleteBlackout(this.agentId, blackoutId).then(res => {
				this.getBlackoutData();
			});
		} else {
			// set blackout
			const blackout = {
				startDate: moment.utc().startOf('year').year(yyyy).month(mm).date(dd).hour(h).toDate().toString(),
				endDate: moment.utc().startOf('year').year(yyyy).month(mm).date(dd).hour(h + 12).toDate().toString()
			};
			this._Agent.createBlackout(this.agentId, blackout).then(res => {
				this.getBlackoutData();
			});
		}
	}

	openScheduleModal(order) {
		this._$mdDialog.show({
			controller: 'ScheduleModalController as  $ctrl',
			templateUrl: '../../../templates/shared/_schedule_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose: true,
			locals: {order: order}
		}).then((data) => {
			this.getData(this.query);
		});
	}

	// selectedItem
	selectItem(order) {
		this.selectedItem = order;
		this._SelectedOrderService.set(order);
	}

	getTypeString(order) {
		return (order && order.goingToWarehouse === true) ? "Pickup" : "Delivery";
	}

}

HomeAgentCalendarController.$inject = ['$q', '$scope', '$state', 'Agent', 'User', '$window', '$mdDialog', '$mdToast', 'SelectedOrderService'];
export default HomeAgentCalendarController;
