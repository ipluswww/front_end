import _ from 'lodash';
import moment from 'moment';
import AbstractController from '../../abstract/abstract.controller.js';
class  HomeAgentOrdersListController extends AbstractController {

	constructor ($q, $scope, $state, Order, User, Agent, $window, $mdDialog, $mdToast, SelectedOrderService, data){
		// First need to check if it is alright to be accessed this url.
		// In order to prevent user to access the url by entering the urlmanually.
		super($q, User, $state, $mdDialog, $mdToast, $window);
		// Override parent property with controller specific variable
		this._allowedRoles = ['ROLE_USER', 'ROLE_ADMIN'];
		this.parentID = "homeAgentList";

		this._$scope = $scope;
		this._Order = Order;
		this._Service = this._Order;
		this._User = User;
		this._Agent = Agent;
		this._SelectedOrderService = SelectedOrderService;

		window._$ctrl = this;

		this.params = data[0];
		if (data[1]) {
			this.data = data[1].data;
			this.totalCount = data[1].count;
		}

		this.init();
    }

	init () {
		// in case we fail on roles check, exit
		if (!super.init()) return false;

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



	// call back function after pagination and column order
	getData () {
		this.selectedItem = null;
		this._$state.go(this._$state.current, this.params, {reload: true, notify: true, inherit: false});
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
		$ctrl.params.query.page = page;
		$ctrl.params.query.limit = limit;
		$ctrl.getData();
	}


	onSearch() {
		this.selectedItem = null;
		this.getData();
	}

	// column order
	onOrder(order) {
		let $ctrl = window._$ctrl; // TODO: get rid of this dirty hack
		$ctrl.params.query.sort = order;
		$ctrl.getData();
	}
	// Select Row Event handler
	onRowSelect (row) {
		// Let it be simple for now
		this.selectedId = row._id;
	}


	// UI action functions
	// Filter panel---------------------------------------------------------------------------------
	// UI action function

	// filter panel, but this is a different action
	onAgentSummaryReport() {
		this.provideFeedback("Agent summary report");
	}


	// phone call cell click handler
	openPhoneCallModal(number, order) {
		this._$mdDialog.show({
			controller: 'PhoneActionModalController as  $ctrl',
			templateUrl: '../../../templates/shared/_phone_action_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose: true,
			locals: {number: number, order: order, _Service: this._Service}
		}).then((data) => {
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
			this.getData();
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

	// Table helper: Est weight
	estWeightLabel(item) {
		if (item && item.weight) {
			let weight =item.weight;
			// TODO: temporary range for now.
			return parseInt(weight * 0.9) + " - " + parseInt(weight * 1.2);
		}
		return "";
	}

}

HomeAgentOrdersListController.$inject = ['$q', '$scope', '$state', 'Order', 'User', 'Agent', '$window', '$mdDialog', '$mdToast', 'SelectedOrderService', 'data'];
export default HomeAgentOrdersListController;
