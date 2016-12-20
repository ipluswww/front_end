import API from './api.service.js';
class Container extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q, Upload) {
		super(AppConstants, $http, $httpParamSerializer, $q);
		this._Upload = Upload;
	}

	toString() {
		return 'containers';
	}

	getCurrentlyStoredItemsForCustomer(customer){
		if(!customer._id) {
			let deferred = this._$q.defer();
			deferred.resolve({data:[]});
			return deferred.promise;
		}

		let filter = {
			currentlyStored: true,
			// active: true,
			customer: customer._id
		};
		return this.list({limit: 0, page: 1}, filter);
	}

	getStorageUnitForCustomer(customer){
		if(!customer._id) {
			let deferred = this._$q.defer();
			deferred.resolve({data:[]});
			return deferred.promise;
		}

		let filter = {
			customer: customer._id,
			'subType.containerType.name': 'rooms'
		};
		return this.list({limit: 0, page: 1}, filter);
	}

	getStorageUnitForOrder(order){
		if(order.storageUnit && order.storageUnit._id){
			return this._$q.resolve({});
		}
		return this.getStorageUnitForCustomer(order.customer);
	}

	uploadPhoto(id, file, user) {
		return this._Upload.upload({
			url: this.baseAPIURL +  '/' + id + '/photos',
			data: {file: file, customer: user},
			headers: {
				"Content-Type": "multipart/form-data"
			}
        }).then(
			(res) => {
				return res.data;
			}
		);
	}

}

Container.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q', 'Upload'];
export default Container;
