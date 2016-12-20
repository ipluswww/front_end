import API from './api.service.js';
class RoomEstimator extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
	}

	toString() {
		return 'roomEstimators';
	}


}

RoomEstimator.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default RoomEstimator;