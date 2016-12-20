import _ from 'lodash';
class InventoryTypesController {

	constructor ($q, User, InventoryTypes, ContainerTypes, QueryData, $rootScope, $state, $window){
		this._$q = $q;
		this._User = User;
		this._Service = InventoryTypes;
		this._ContainerTypes = ContainerTypes;
		this._QueryData = QueryData;
		this._$rootScope = $rootScope;
		this._$state = $state;
		this._$window = $window;
		window._$ctrl = this;
		this.init();
	}

	init () {
		let self = this;
		// Controller Variable definition
		this.query  = {
			sort: "",
			limit: 10,
			page: 1,
			skip: 0,
			filter: ['box', 'unboxed', 'furniture', 'rooms'],
			search: null
		};
		this.query = this._QueryData.getQuery('inventoryTypes') || this.query;
		this.selectedId = null;
		this.totalCount = 0;

		this.containerTypes = [
			{
				name: 'box',
				iconClass: 'drafts'
			},
			{
				name: 'unboxed',
				iconClass: 'motorcycle'
			},
			{
				name: 'furniture',
				iconClass: 'weekend'
			},
			{
				name: 'rooms',
				iconClass: 'video_label'
			}
		];

		this.getData(this.query);

		this._$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams){
				if (fromState.name === 'app.admin.inventoryTypes.list') self._QueryData.setQuery('inventoryTypes', self.query);
			});
	}

	// call back function after pagination and column order
	getData(query) {
		let deferred = this._$q.defer();
		this.promise = deferred.promise;


		let originalQuery = _.clone(query);
		delete query.containerTypeName;

		// generate filter based on containerType selection
		let filter = {'containerType.name': {$in: originalQuery.filter}};

		this._Service.list(query, filter).then( (res) => {
			this.data = res.data;
			this.totalCount = res.count;
			this.query = _.clone(originalQuery);
			deferred.resolve();
		});
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
		this.getData(this.query);
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
	// Back to previous location
	backTo () {
		this._$window.history.back();
	}


	// container type related helpers
	isContainerTypeSelected(containerType) {
		return (this.query.filter.indexOf(containerType.name) >= 0);		
	}

	// container type toggle
	toggleContainerType(containerType) {
		if (this.isContainerTypeSelected(containerType)) {
			this.query.filter.splice(this.query.filter.indexOf(containerType.name), 1);
		} else {
			this.query.filter.push(containerType.name);
		}

		this.getData(this.query);
	}

}

InventoryTypesController.$inject = ['$q', 'User', 'InventoryTypes', 'ContainerTypes', 'QueryData', '$rootScope', '$state', '$window'];
export default InventoryTypesController;
