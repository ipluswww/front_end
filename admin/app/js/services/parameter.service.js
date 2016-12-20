import API from './api.service.js';
class Parameter extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
	}

	toString() {
		return 'parameters';
	}

	search(key) {
		return this._$http(
			{
				url: this.baseAPIURL,
				method: 'GET',
				params: { search: key }
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}
}

Parameter.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default Parameter;