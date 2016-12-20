import API from './api.service.js';
class SMSService extends API {

  constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
		this._AppConstants = AppConstants;
		this._$http = $http;
	}

	toString() {
		return 'sms';
	}

	sendSMS(data) {
		return this._$http({
			url: this._AppConstants.api + '/sendSMS',
			method: 'POST',
			data: data
		});
	}

}

SMSService.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default SMSService;
