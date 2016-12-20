import API from './api.service.js';
class InventoryTypes extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
	}

	toString() {
		return 'inventoryTypes';
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

InventoryTypes.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default InventoryTypes;