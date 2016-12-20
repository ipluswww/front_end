import API from './api.service.js';
class Person extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
	}

	toString() {
		return 'persons';
	}
}

Person.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default Person;