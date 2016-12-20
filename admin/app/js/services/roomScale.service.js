import API from './api.service.js';
class RoomScale extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
	}

	toString() {
		return 'roomScale';
	}
}

RoomScale.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default RoomScale;