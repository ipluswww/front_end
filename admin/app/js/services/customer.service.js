import API from './api.service.js';
class Customer extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
	}

	toString() {
		return 'customers';
	}

	validate(name) {
		return this._$http({
			url: this.baseAPIURL + '/validate/' + name,
			method: 'GET'
		});
	}
}

Customer.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default Customer;