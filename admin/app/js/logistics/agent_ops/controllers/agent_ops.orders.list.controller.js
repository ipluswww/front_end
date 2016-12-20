import _ from 'lodash';
import moment from 'moment';
import AbstractController from '../../../abstract/abstract.controller.js';
class AgentOpsOrdersListController extends AbstractController {

	constructor ($q, $scope, $state, $stateParams, User, $window, $mdDialog, $mdToast, SelectedOrderService, orders){
		// First need to check if it is alright to be accessed this url.
		// In order to prevent user to access the url by entering the urlmanually.
		super($q, User, $state, $mdDialog, $mdToast, $window);
		// Override parent property with controller specific variable
		this._allowedRoles = ['ROLE_USER', 'ROLE_ADMIN'];
		this.parentID = "ordersList";

		this._User = User;
		this._SelectedOrderService = SelectedOrderService;

		this._$scope = $scope;
		window._$ctrl = this;

		this.init(orders, $stateParams);
	}

	init (orders, params) {
		// in case we fail on roles check, exit
		if (!super.init()) return false;

		this.availableOrderFilter = ["pending"]; // UI customer filter variable
		this.assignmentFilter = []; // UI assignement filter variable
		this.limitedMarkets = this._User.current.markets;

		// Assign data
		this.data = orders.data;
		this.totalCount = orders.count;

		// Controller Variable definition
		this.agentId = params.agentId;
		this.query  = params.query;
		this.availableOrderFilter = params.filter.availableOrderFilter;
		this.assignmentFilter = params.filter.assignmentFilter;

		// filter panel expanded / collapsed indicator
		this.filterExpanded = params.filterExpanded;
		this.bookmarkList = [
			{
				domSelector: "#orderID",
				iconClass: "vertical_align_top",
				tooltip: "Back to top"
			},
			{
				domSelector: "#orderNote",
				iconClass: "speaker_notes",
				tooltip: "Jump to Notes section"
			},
			{
				domSelector: "#orderEvent",
				iconClass: "event",
				tooltip: "Jump to Events section"
			}
		];
		// Sync order with details view
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


	getData (query=null) {
		if (!query) {
			query = this.query;
		}

		const params = {
			agentId: this.agentId,
			query,
			filter: {
				availableOrderFilter: this.availableOrderFilter || [],
				assignmentFilter: this.assignmentFilter || []
			},
			filterExpanded: this.filterExpanded
		};

		this._$state.go(this._$state.current, params, {reload: true, notify: true, inherit: false});
	}

	// row click event handler, to show the right hand side pullout
	selectItem(item) {
		this.selectedItem = item;
		this._SelectedOrderService.set(item);
	}


	// Table related events handler
	//------------------------------------------------------------------------------------------------------------------
	onPagination (page, limit) {
		let $ctrl = window._$ctrl; // TODO: get rid of this dirty hack
		let query = JSON.parse(JSON.stringify($ctrl.query));
		query.page = page;
		query.limit = limit;

		$ctrl.getData(query);
	}


	onSearch() {
		this.selectedItem = null;
		this.getData(this.query);
	}

	// Select a Agent on agent-select
	onAgentChange(agentId) {
		if (agentId && this.agentId !== agentId) {
			this.agentId = agentId;
			const q = {
				page: 1,
				search: null
			};
			this.getData(q);
		}
	}

	// column order
	onOrder(order) {
		let $ctrl = window._$ctrl; // TODO: get rid of this dirty hack
		let query = JSON.parse(JSON.stringify($ctrl.query));
		query.sort = order;

		$ctrl.getData(query);
	}
	// Select Row Event handler
	onRowSelect (row) {
		// Let it be simple for now
		this.selectedId = row._id;
	}


	// UI action functions
	// Filter panel---------------------------------------------------------------------------------
	// UI action function
	// Display / hide filter panel on header
	toggleFilterPanel () {
		this.filterExpanded = !this.filterExpanded;
	}

	// UI action function : New Customer Filter
	// toggle between RESERVATION, PARTNERS and INQUIRIES
	toggleAvailableOrderFilter(filterType) {
		if (this.availableOrderFilter.indexOf(filterType) < 0) {
			this.availableOrderFilter.push(filterType);
		} else {
			_.pull(this.availableOrderFilter, filterType);
		}

		if (this.availableOrderFilter.length == 0) {
			this.availableOrderFilter.push('pending');
		}

		this.getData(this.query);
	}



	// UI action function
	// toggle between Assigned, not assigned
	toggleAssignmentFilter(filterType) {
		if (this.assignmentFilter.indexOf(filterType) < 0) {
			// if the other item already exist in the array, empty the array first.
			if (this.assignmentFilter && this.assignmentFilter.length > 0) this.assignmentFilter = [];
			this.assignmentFilter.push(filterType);
		} else {
			_.pull(this.assignmentFilter, filterType);
		}

		this.getData(this.query);
	}

	// filter panel, but this is a different action
	onAgentSummaryReport() {
		this.provideFeedback("Agent summary report");
	}

	// Filter panel end-----------------------------------------------------------------------------


	// phone call cell click handler
	openPhoneCallModal(number, order) {
		this._$mdDialog.show({
			controller: 'PhoneActionModalController as  $ctrl',
			templateUrl: '../../../templates/shared/_phone_action_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose: true,
			locals: {number: number, order: order, _Service: this._Service}
		}).then((data) => {
			this.getData(this.query);
		});
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

	// View helper
	// Table Helper: address
	addressString(item) {
		if (item.goingToWarehouse === true) {
			if (item.tasks && item.tasks['Customer Dropoff/Pickup'] === true) {
				return "Drop Off Access: " + (item.terminalLocation.address || "") + " / " + (item.originationLocation.address || "");
			} else {
				return "Pickup At: " + item.customer.location.address;
			}
		} else {
			if (item.tasks && item.tasks['Customer Dropoff/Pickup'] === true) {
				return "Pick Up Access: " + (item.originationLocation.address || "") + " / " + (item.terminalLocation.address || "");
			} else {
				return "Deliver To: " + item.customer.location.address;
			}

		}
	}

	// Table helper : type string
	getTypeString(item) {
		// first deal with
		return (item && item.goingToWarehouse === true) ? "Pickup" : "Delivery";
	}

}

AgentOpsOrdersListController.$inject = ['$q', '$scope', '$state', '$stateParams', 'User', '$window', '$mdDialog', '$mdToast', 'SelectedOrderService', 'orders'];
export default AgentOpsOrdersListController;
