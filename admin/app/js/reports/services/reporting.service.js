import _ from 'lodash';
class Reporting {
	constructor(AppConstants, $http, $httpParamSerializer) {
		this.baseAPIURL = AppConstants.api;  + "/reports"; // ;
		this._$http = $http;
		this._$httpParamSerializer = $httpParamSerializer;
		this.cache = null;
	}

    // get the old reporting
    list(typeString) {
        let queryString = '';
        let query = {sort: '-lastUpdated'}; // get the latest
        if (typeString) queryString = "?query=" + encodeURIComponent(JSON.stringify({type: typeString}));

        return this._$http({
			url: this.baseAPIURL + "/reports" + queryString,
			method: 'GET',
            params: query
		});
    }

	// generate and fire the request.
	// sample request URL: /reporting/admin/orders?createdDateFrom=1465438031802&createdDateTo=1473214031803&requestedDateFrom=1465438031804&requestedDateTo=1473214031804&orderDispositions=Accepted,Scheduled,Created,Prospect&markets=53f412e684aec29488f3be51,535186fb84ae7f947855eee3
	query(type, filter = null) {
		// we will build the query string only necessary
		let queryString = '';
		let queryArray = [];
		if (filter) {
            if (filter.createdDateFrom) queryArray.push("createdDateFrom=" + filter.createdDateFrom.getTime());
            if (filter.createdDateTo) queryArray.push("createdDateTo=" +  + filter.createdDateTo.getTime());
            if (filter.requestedDateFrom) queryArray.push("requestedDateFrom=" + filter.requestedDateFrom.getTime());
            if (filter.requestedDateTo) queryArray.push("requestedDateTo=" + filter.requestedDateTo.getTime());
            if (filter.orderDispositions) queryArray.push("orderDispositions=" + filter.orderDispositions.join(","));
            if (filter.markets) queryArray.push("markets=" + filter.markets.join(","));
        }

		queryString = queryArray.join("&");

		return this._$http({
			url: this.baseAPIURL + "/reporting/admin/" + type + "?" +  queryString,
			method: 'GET'
		});
	}

	get(id) {
		return this._$http({
			url: this.baseAPIURL + "/reports/" + id,
			method: 'GET'
		});
	}

	getAllMarkets() {
		return this.allMarkets;
	}

	setAllMarkets(allMarkets) {
		this.allMarkets = _.cloneDeep(allMarkets);
	}
}


Reporting.$inject = ['AppConstants', '$http', '$httpParamSerializer'];
export default Reporting;
