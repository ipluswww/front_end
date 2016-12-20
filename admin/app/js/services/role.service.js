class Role {
	constructor(AppConstants, $http) {
		this._AppConstants = AppConstants;
		this._$http = $http;
	}

	all() {
		return this._$http({
			url: this._AppConstants.api + '/authorities',
			method: 'GET'
		}).then(
			// On success...
			(res) => {
				return res.data;
			}
		);
	}

};
Role.$inject = ['AppConstants', '$http'];
export default Role;