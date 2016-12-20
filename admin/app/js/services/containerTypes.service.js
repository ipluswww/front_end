import API from './api.service.js';
class ContainerTypes extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
	}

	toString() {
		return 'containerTypes';
	}

	validate(key) {
		return this._$http(
			{
				url: this.baseAPIURL + '/validate/' + key,
				method: 'GET'
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}

}

ContainerTypes.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default ContainerTypes;