import _ from 'lodash';
import moment from 'moment';
import AdminController from '../../../abstract/admin.controller.js';
class  WarehouseDetailController extends AdminController {

	constructor ($state, $stateParams, $q, User, Warehouse, QueryData, $mdDialog, $mdToast, $window){
		super($q, User, $state, $mdDialog, $mdToast, $window);
		this._edit = $state.current.data.edit;
		this._$state = $state;
		this._$q = $q;
		this._User = User;
		this._Service = Warehouse;
		this._QueryData = QueryData;
		this._id = $stateParams.id;
		this._$mdDialog = $mdDialog;
		this._$mdToast = $mdToast;
		this._$window = $window;
		this.init();
	}

	init () {
		super.init();
		if (this._id) {
			this._Service.get(this._id).then( (res) => {
				this.data = _.extend(this.defaultObject(), _.clone(res));
				this.data.zipCodesData = _.clone(res.zipCodes);
			});
		} else {
			this.data = this.defaultObject();
		}
	}

	defaultObject () {
		return {
			location: {
				coordinate: {}
			},
			handlingRate: 0.0,
			storeRate: 0.0,
			laborRate_1m: 0.0,
			laborRate_2m_2h: 0.0,
			laborRate_2m_ah: 0.0,
			laborRate_3m_2h: 0.0,
			laborRate_3m_ah: 0.0,
			laborRate_4m_2h: 0.0,
			laborRate_4m_ah: 0.0,
			agent: null,
			markets: []
		};
	}

	// button handler for opening dialogs
	openAssociateAgentsDialog () {
		this._$mdDialog.show({
			controller: 'AgentsModalController as $ctrl',
			templateUrl: 'templates/shared/_agent_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose:false,
			locals: { data: this.data.associatedAgent}
		}).then( (res) => {
			this.data.agent = res.data;
			this.data.associatedAgent = _.clone(res.data);
			this.data.agentName = res.data.name;
		});
	}

	// Edit Markets button handler
	openMarketsDialog() {
		this._$mdDialog.show({
			controller: 'MarketsModalController as $ctrl',
			templateUrl: 'templates/shared/_market_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose:false,
			locals: { markets: this.data.associatedMarkets }
		}).then( (res) => {
			this.data.associatedMarkets = _.clone(res.markets);
		});
	}


	// Button event handler
	cancelEdit () {
		this._$state.go('app.admin.warehouse.list');
	}

	deleteRecord() {
		let self = this;
		if (this._id) {
			let confirm = this._$mdDialog.confirm()
				.title('Warnning')
				.textContent('Please make double sure before removing this discount.')
				.ok('Confirm')
				.cancel('Cancel');
			this._$mdDialog.show(confirm).then(function () {
				self._Service.delete(self._id).then((res) => {
					self.provideFeedback("A discount has been deleted successfully").then( () => {
						self.cancelEdit();
					});
				}, (err) => {
					self.provideFeedback("Error while deleting discount.").then( () => {
						self.cancelEdit();
					});
				});
			}, function () {
			});
		}
	}


	saveData() {
		this.data.zipCodes = _.map(this.data.zipCodesData, 'text');
		let data = _.clone(this.data);
		delete data.zipCodesData;
		data.associatedAgent = (data.associatedAgent && data.associatedAgent._id) ? data.associatedAgent._id : null;
		data.associatedMarkets = _.map(data.associatedMarkets, '_id');
		if(this._id) {
			this._Service.update(data).then( (res) => {
				this._$state.go('app.admin.warehouse.detail', {id: this._id});
			});
		} else {
			this._Service.create(data).then( (res) => {
				this._$state.go('app.admin.warehouse.detail', {id: res._id});
			});
		}
	}


	// The helper function: only record created within 24 hours is deletable
	isDeletable() {
		if (this.data && this.data._id && this.data.dateCreated) {
			return (moment.utc().diff(moment.utc(this.data.dateCreated), 'hours') <= 24);
		}
		return false;
	}


	// Helper functions
	//------------------------------------------------------------------------------------------------------------------
	// show feedback of action taken.
	provideFeedback(message) {
		var el = angular.element(document.getElementById("warehouseDetail"));
		return this._$mdToast.show(
			this._$mdToast.simple()
				.textContent(message)
				.position('bottom right')
				.hideDelay(3000)
				.parent(el)
		);
	}

	backTo () {
		this._$window.history.back();
	}

	// Back to list
	backToList() {
		this._QueryData.setQuery('warehouses', null);
		this._$state.go('app.admin.warehouse.list');
	}

}

WarehouseDetailController.$inject = ['$state', '$stateParams', '$q', 'User', 'Warehouse', 'QueryData', '$mdDialog', '$mdToast', '$window'];
export default WarehouseDetailController;
