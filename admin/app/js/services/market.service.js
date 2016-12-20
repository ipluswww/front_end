import API from './api.service.js';
class Market extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
		this._$q = $q;
		this.allMarkets = null;
	}

	toString() {
		return 'markets';
	}

	allActive() {
		return this.list({limit: 0, page: 1, sort: "name"}, {active:true}).then((res) => {
			this.allMarkets = res.data;
			return res.data;
		});
	}

	getAllActiveMarketsFromCache() {
		return this.allMarkets;
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

Market.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default Market;