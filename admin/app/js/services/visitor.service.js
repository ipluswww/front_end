import API from './api.service.js';
class Visitor extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
	}

	toString() {
		return 'visitors';
	}

}

Visitor.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default Visitor;