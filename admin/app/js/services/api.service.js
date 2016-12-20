import _ from 'lodash';
class API {
	constructor(AppConstants, $http, $httpParamSerializer, $q) {
		this.baseAPIURL = AppConstants.api + "/" + this.toString();
		this._$http = $http;
		this._$q = $q;
		this._$httpParamSerializer = $httpParamSerializer;
		this.cache = null;
	}

	toString() {
		return "";
	}

	// With pagination
	list(query, filter = null) {
		// we will build the query string only necessary
		let queryString = '';
		if (filter) queryString = "?query=" + encodeURIComponent(JSON.stringify(filter));


		query.skip = (parseInt(query.page) - 1) * parseInt(query.limit);
		return this._$http({
			url: this.baseAPIURL + queryString,
			method: 'GET',
			params: query
		}).then(
			// On success...
			(res) => {
				return res.data;
			}
		);
	}

	// All records, without pagination
	all() {
		let d = this._$q.defer();
		if (!this.cache) {
			return this.list({limit: 0, page: 1});
		} else {
			d.resolve(this.cache);
			return d.promise();
		}
	}


	get(id) {
		return this._$http({
			url:	this.baseAPIURL +  '/' + id,
			method: 'GET'
		}).then(
			// On success...
			(res) => {
				return res.data;
			}
		);
	}

	create(data) {
		return this._$http(
			{
				url: this.baseAPIURL,
				method: 'POST',
				data: data
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}

	// Update record, with post
	update(data) {
		let _data = _.cloneDeep(data);
		let id = _data._id;
		delete _data._id;
		return this._$http(
			{
				url: this.baseAPIURL +  '/' + id,
				method: 'PUT',
				data: _data
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}


	delete(id) {
		return this._$http(
			{
				url: this.baseAPIURL + '/' + id,
				method: 'DELETE'
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}


	// Filter function, mostly used in containers page
	filter(params) {
		let qs = this._$httpParamSerializer(params);
		return this._$http(
			{
				url: this.baseAPIURL + "?" + qs,
				method: 'GET'
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}

	save(data){
		if(data._id) {
			return this.update(data);
		}
		return this.create(data);	
	}

}

API.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q'];
export default API;
