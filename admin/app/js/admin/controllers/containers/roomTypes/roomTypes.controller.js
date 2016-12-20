import _ from 'lodash';
class RoomTypesController {

	constructor ($q, User, RoomTypes, QueryData, $rootScope, $state, $window){
		this._$q = $q;
		this._User = User;
		this._Service = RoomTypes;
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
			search: null
		};
		this.query = this._QueryData.getQuery('roomTypes') || this.query;
		this.selectedId = null;
		this.totalCount = 0;

		this.getData(this.query);

		this._$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams){
				if (fromState.name === 'app.admin.roomTypes.list') self._QueryData.setQuery('roomTypes', self.query);
			});
	}

	// call back function after pagination and column order
	getData(query) {
		let deferred = this._$q.defer();
		this.promise = deferred.promise;

		this._Service.list(query).then( (res) => {
			this.data = res.data;
			this.totalCount = res.count;
			this.query = _.clone(query);
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

}

RoomTypesController.$inject = ['$q', 'User', 'RoomTypes', 'QueryData', '$rootScope', '$state', '$window'];
export default RoomTypesController;
