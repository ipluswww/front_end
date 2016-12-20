import _ from 'lodash';
import moment from 'moment';

class AgentOpsOrdersCalendarController {

	constructor ($scope, $state, $stateParams, Agent, $window, $mdDialog, SelectedOrderService, orders, blackouts){
		// Override parent property with controller specific variable
		this._allowedRoles = ['ROLE_USER', 'ROLE_ADMIN'];
		this.parentID = "homeAgentCalendar";

		this._$scope = $scope;
		this._$state = $state;
		this._$mdDialog = $mdDialog;

		this._SelectedOrderService = SelectedOrderService;
		this._Agent = Agent;

		this.init(orders, blackouts, $stateParams);
    }

	init (orders, blackouts, params) {
		this.params = params;

		this.calendar = {
			_values: {
				monthes: moment.months(),
				weekdays: moment.weekdaysShort()
			},
			data: null
		};

		this.data = orders ? orders.data : [];
		this.blackouts = blackouts ? blackouts.data : [];

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
		this._$state.go(this._$state.current, this.params, {reload: true, notify: true, inherit: false});
	}

	getBlackoutData() {
		const query = {limit: 0, page: 1};
		const from = moment.utc().year(this.params.yy).month(this.params.mm).date(1).startOf('month').startOf('week').toDate().toString();
		const to = moment.utc().year(this.params.yy).month(this.params.mm).date(1).endOf('month').endOf('week').toDate().toString();
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
		this._Agent.blackouts(this.params.agentId, query, filter).then(res => {
			this.blackouts = res.data;
		});
	}

	// set calendar params for drawing
	drawCalendar() {
		let current = moment.utc().year(this.params.yy).month(this.params.mm).date(1).startOf('month').startOf('week');
		const to_date = moment.utc().year(this.params.yy).month(this.params.mm).date(1).endOf('month').endOf('week');
		
		const weeks = [];
		let week = [];

		while (current.format('YYYYMMDD') <= to_date.format('YYYYMMDD')) {
			week.push({
				yy: current.year(),
				mm: current.month(),
				dd: current.date(),
				active: this.params.mm === current.month()
			});

			if (current.weekday() === 6) {
				weeks.push(week);
				week = [];
			}

			current.add(1, 'days');
		}
		this.calendar.data = weeks;
	}

	setMonth(index) {
		this.params.mm = index;
		if (index !== null) {
			this.getData();
		}
	}

	onAgentChange(agentId) {
		if (agentId && this.params.agentId !== agentId) {
			this.params.agentId = agentId;
			this.getData();
		}
	}

	onArrow(step) {
		if (this.params.mm === null) {
			this.params.yy += step;
		} else {
			this.params.mm += step;
			if (this.params.mm < 0) {
				this.params.yy += step;
				this.params.mm = 11;
			} else if (this.params.mm >= 12) {
				this.params.yy += step;
				this.params.mm = 0;
			}
			this.getData();
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
	getDateOfOrder(order, yy, mm, dd) {
		const from = moment.utc().year(yy).month(mm).date(dd).startOf('day').toDate().getTime();
		const to = moment.utc().year(yy).month(mm).date(dd).startOf('day').add(24, 'hours').toDate().getTime();

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
	getOrderForDate(yy, mm, dd) {
		const from = moment.utc().year(yy).month(mm).date(dd).startOf('day').toDate().getTime();
		const to = moment.utc().year(yy).month(mm).date(dd).add(24, 'hours').toDate().getTime();
		const orders = [];

		_.each(this.data, order => {
			if (this.getDateOfOrder(order, yy, mm, dd)) {
				orders.push(order);
			}
		});
		return orders;
	}

	// display order with format
	displayOrder(order, yy, mm, dd) {
		let result = "";
		const type = this.getType(order);
		const date = this.getDateOfOrder(order, yy, mm, dd)
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
	isBlackout(yy, mm, dd, h) {
		const now = moment.utc().startOf('year').year(yy).month(mm).date(dd).hour(h).toDate().getTime();
		const blackouts = _.filter(this.blackouts, blackout => {
			return (moment.utc(blackout.startDate).toDate().getTime() <= now) && (now < moment.utc(blackout.endDate).toDate().getTime());
		});
		return blackouts.length > 0 ? blackouts[0]._id : false;
	}

	// set/unset am/pm as blackout
	toggleBlackout(yy, mm, dd, h) {
		const blackoutId = this.isBlackout(yy, mm, dd, h);
		if (blackoutId) {
			// unset blackout
			this._Agent.deleteBlackout(this.params.agentId, blackoutId).then(res => {
				this.getBlackoutData();
			});
		} else {
			// set blackout
			const blackout = {
				startDate: moment.utc().startOf('year').year(yy).month(mm).date(dd).hour(h).toDate().toString(),
				endDate: moment.utc().startOf('year').year(yy).month(mm).date(dd).hour(h + 12).toDate().toString()
			};
			this._Agent.createBlackout(this.params.agentId, blackout).then(res => {
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

AgentOpsOrdersCalendarController.$inject = ['$scope', '$state', '$stateParams', 'Agent', '$window', '$mdDialog', 'SelectedOrderService', 'orders', 'blackouts'];
export default AgentOpsOrdersCalendarController;
