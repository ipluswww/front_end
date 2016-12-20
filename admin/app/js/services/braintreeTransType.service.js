import API from './api.service.js';
class BraintreeTransType extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
	}

	toString() {
		return 'braintreeTransTypes';
	}
}

BraintreeTransType.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default BraintreeTransType;