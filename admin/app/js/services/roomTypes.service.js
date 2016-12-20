import API from './api.service.js';
class RoomTypes extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
	}

	toString() {
		return 'roomTypes';
	}
}

RoomTypes.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default RoomTypes;