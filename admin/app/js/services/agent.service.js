import API from './api.service.js';
class Agent extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
	}

	toString() {
		return 'agents';
	}

	search(key) {
		return this._$http(
			{
				url: this.baseAPIURL + '/validate/' + key,
				method: 'GET'
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}

	orders(id, query, filter = null) {
		// we will build the query string only necessary
		let queryString = '';
		if (filter) queryString = "?query=" + encodeURIComponent(JSON.stringify(filter));

		query.skip = (parseInt(query.page) - 1) * parseInt(query.limit);
		return this._$http({
			url: this.baseAPIURL + '/' + id + '/orders' + queryString,
			method: 'GET',
			params: query
		}).then(
			// On success...
			(res) => {
				return res.data;
			}
		);
	}

	blackouts(id, query, filter = null) {
		// we will build the query string only necessary
		let queryString = '';
		if (filter) queryString = "?query=" + encodeURIComponent(JSON.stringify(filter));

		query.skip = (parseInt(query.page) - 1) * parseInt(query.limit);
		return this._$http({
			url: this.baseAPIURL + '/' + id + '/blackouts' + queryString,
			method: 'GET',
			params: query
		}).then(
			// On success...
			(res) => {
				return res.data;
			}
		);
	}

	createBlackout(id, blackout) {
		return this._$http(
			{
				url: this.baseAPIURL + '/' + id + '/blackouts',
				method: 'POST',
				data: blackout
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}

	deleteBlackout(id, blackoutId) {
		return this._$http(
			{
				url: this.baseAPIURL + '/' + id + '/blackouts/' + blackoutId,
				method: 'DELETE'
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}

}

Agent.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default Agent;