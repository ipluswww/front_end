import API from './api.service.js';
class Order extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q, Upload) {
		super(AppConstants, $http, $httpParamSerializer, $q);
		this._Upload = Upload;
		this._AppConstants = AppConstants;
	}

	toString() {
		return 'orders';
	}

	addAgentManifest(id, file, user) {
		return this._Upload.upload({
			url: this.baseAPIURL +  '/' + id + '/agentManifests',
			data: {file: file, user: user},
			headers: {
				"Content-Type": "multipart/form-data"
			}
        }).then(
			(res) => {
				return res.data;
			}
		);
	}

	removeAgentManifest(id, agentManifestId) {
		return this._$http(
			{
				url: this.baseAPIURL + '/' + id + '/agentManifests/' + agentManifestId,
				method: 'DELETE'
			}
		).then(
			(res) => {
				return res.data;
			}
		);
	}

	// change disposition from one to another.
	// we expect the backend to take care of event logging
	changeDisposition(order, newDisposition, option) {

		let object = {
			_id: order._id,
			disposition: newDisposition
		};

		// if we need to update some other fields besides disposition update.
		object = _.extend(object, option);

		return this.update(object);
	}

	// should be moved to another standalone service
	// need discussion which service is more appropriate for holding this information
	getSortedInventories(order) {
		let groupedInventories = [];
		let containerTypes = ['box', 'unboxed', 'furniture'];
		if (order && order.inventory) {
			groupedInventories = _.sortBy(order.inventory, [
				(atom) => {
					// first sort by container types
					return containerTypes.indexOf(atom.subType.containerType.name);
				},
				(atom) => {
					// sort by alphanumeric within the same container type.
					return atom.subType.name;
				}
			]);

			groupedInventories = _.groupBy(groupedInventories, (atom) => {
				return atom.subType.containerType.name;
			});
		}

		return groupedInventories;
	}

	getPaymentHoldOrdersForCustomer(customer) {
		if(!customer || !customer._id) {
			return this._$q.resolve({data:[]});
		}

		const filter = {
			"customer._id": customer._id
		};

		const q = {
			page: 1,
			limit: 0
		};
		return this.list(q, filter);
	}
}

Order.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q', 'Upload'];
export default Order;
