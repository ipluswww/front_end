import API from './api.service.js';
class SubMarket extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
		this._$q = $q;
	}

	toString() {
		return 'subMarkets';
	}

	checkUniq(type, value) {
		return this._$http({
			url: this.baseAPIURL + '/validate/'   + type + '?value=' + value,
			method: 'GET'
		});
	}

	updatePricing(id, data) {
		if (data) {
			return this._$http(
				{
					url: this.baseAPIURL + '/' + id + '/pricing',
					method: 'POST',
					data: data
				}
			).then(
				(res) => {
					return res.data;
				}
			);
		} else {
			let d = this._$q.defer();

			d.resolve(null);
			return d.promise;
		}
	}

	getPricing(id) {
		return this._$http({
			url: this.baseAPIURL + '/'   + id + '/pricing',
			method: 'GET'
		});
	}
}

SubMarket.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default SubMarket;