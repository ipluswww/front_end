import API from './api.service.js';
class OrderSource extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
	}

	toString() {
		return 'orderSources';
	}
}

OrderSource.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default OrderSource;