import _ from 'lodash';
import AdminController from '../../../abstract/admin.controller.js';
class  WarehousesController extends AdminController {

	constructor ($q, User, Warehouse, QueryData, $rootScope, $state, $mdDialog, $mdToast, $window){
		// First need to check if it is alright to be accessed this url.
		// In order to prevent user to access the url by entering the urlmanually.
		super($q, User, $state, $mdDialog, $mdToast, $window);

		this._$q = $q;
		this._User = User;
		this._Warehouse = Warehouse;
		this._QueryData = QueryData;
		this._$rootScope = $rootScope;
		this._$state = $state;
		this._$window = $window;
		window._$ctrl = this;
		this.init();
	}

	init () {
		let self = this;
		if (!super.init()) return false;

		// Controller Variable definition
		this.query  = {
			sort: "",
			limit: 10,
			page: 1,
			skip: 0,
			search: null
		};
		this.query = this._QueryData.getQuery('warehouses') || this.query;
		this.selectedId = null;
		this.totalCount = 0;

		this.getWarehouses(this.query);

		this._$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams){
				if (fromState.name === 'app.admin.warehouse.list') self._QueryData.setQuery('warehouses', self.query);
			});
	}

	// call back function after pagination and column order
	getWarehouses (query) {
		let deferred = this._$q.defer();
		this.promise = deferred.promise;

		this._Warehouse.list(query).then( (res) => {
			// TODO: after the api got in shape, need to refactor this
			this.warehouses = res.data;
			this.totalCount = res.count;
			this.query = _.clone(query);
			deferred.resolve();
		});
	}

	// Edit / delete record
	//------------------------------------------------------------------------------------------------------------------
	editSelected () {
		this._$state.go('app.admin.warehouse.edit', {id: this.selectedId});
	}


	// Table related events handler
	//------------------------------------------------------------------------------------------------------------------
	onPagination (page, limit) {
		let $ctrl = window._$ctrl; // TODO: get rid of this dirty hack
		let query = JSON.parse(JSON.stringify($ctrl.query));
		query.page = page;
		query.limit = limit;
		$ctrl.getWarehouses(query);
	}


	onSearch() {
		this.getWarehouses(this.query);
	}

	// column order
	onOrder(order) {
		let $ctrl = window._$ctrl; // TODO: get rid of this dirty hack
		let query = JSON.parse(JSON.stringify($ctrl.query));
		query.sort = order;
		$ctrl.getWarehouses(query);
	}
	// Select Row Event handler
	onRowSelect (row) {
		// Let it be simple for now
		this.selectedId = row._id;
	}
	// Back to previous location
	backTo () {
		this._$window.history.back();
	}

}

WarehousesController.$inject = ['$q', 'User', 'Warehouse', 'QueryData', '$rootScope', '$state', '$mdDialog', '$mdToast', '$window'];
export default WarehousesController;
