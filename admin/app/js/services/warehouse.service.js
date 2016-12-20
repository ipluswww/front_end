import API from './api.service.js';
class Warehouse extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		super(AppConstants, $http, $httpParamSerializer, $q);
	}
	toString() {
		return 'warehouseLocations';
	}

	freeWarehouses() {
		return this._$http(
			{
				url: this.baseAPIURL + '/agent-free',
				method: 'GET'
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}

	associateAgent(id, agentId) {
		return this._$http(
			{
				url: this.baseAPIURL + '/' + id + '/agent',
				method: 'POST',
				data: {
					agentId: agentId
				}
			}
		);
	}

	unassociateAgent(id) {
		return this._$http(
			{
				url: this.baseAPIURL + '/' + id + '/agent',
				method: 'DELETE',
			}
		);
	}


	allActive() {
		return this.list({limit: 0, page: 1}, {active:true});
	}

}

Warehouse.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default Warehouse;