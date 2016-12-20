class Admin {
	constructor(AppConstants, $http) {
		this._AppConstants = AppConstants;
		this._$http = $http;
	}

	all(query) {
		query.skip = (parseInt(query.page) - 1) * parseInt(query.limit);

		return this._$http({
			url:	this._AppConstants.api + '/admin',
			method: 'GET',
			params: query
		}).then(
			// On success...
			(res) => {
				return res.data;
			}
		);
	}

	get(id) {
		return this._$http({
			url:	this._AppConstants.api + '/admin/' + id,
			method: 'GET'
		}).then(
			// On success...
			(res) => {
				return res.data;
			}
		);
	}

	create(admin) {
		return this._$http(
			{
				url: this._AppConstants.api + '/admin',
				method: 'POST',
				data: admin
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}

	update(admin) {
		return this._$http(
			{
				url: this._AppConstants.api + '/admin/' + admin._id,
				method: 'PUT',
				data: admin
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}

	delete(adminId) {
		return this._$http(
			{
				url: this._AppConstants.api + '/admin/' + adminId,
				method: 'DELETE'
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}
}

Admin.$inject = ['AppConstants', '$http'];
export default Admin;