import API from './api.service.js';
class Discount extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
	}

	toString() {
		return 'discounts';
	}

	search(key) {
		return this._$http(
			{
				url: this.baseAPIURL + '/search/' + key,
				method: 'GET'
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}

	getByCode(code) {
		return this._$http(
			{
				url: this.baseAPIURL + '/codes/' + code,
				method: 'GET'
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}
}

Discount.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default Discount;