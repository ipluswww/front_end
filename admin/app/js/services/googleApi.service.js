class GoogleApi {
	constructor(AppConstants, $http) {
		this._AppConstants = AppConstants;
		this._$http = $http;
	}

	getGeocode(address) {
		return this._$http({
			url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + this._AppConstants.googleApiKey,
			method: 'GET',
			headers: {
				'Authorization': undefined
			}
		}).then(
			// On success...
			(res) => {
				const data = res.data;
				if (res.status === 200 && data.status === "OK" && data.results.length > 0) {
					return {
						latitude: data.results[0].geometry.location.lat,
						longitude: data.results[0].geometry.location.lng
					};
				} else {
					return false;
				}
			}
		);
	}

};
GoogleApi.$inject = ['AppConstants', '$http'];
export default GoogleApi;
