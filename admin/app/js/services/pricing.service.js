import API from './api.service.js';
import Bid from '../abstract/model/bid.js';
class Pricing extends API {
	constructor(AppConstants, $http, $httpParamSerializer, $q,
		OrdersValidationService, StoredInventoryService) {
		super(AppConstants, $http, $httpParamSerializer, $q);
		this._AppConstants = AppConstants;
		this._OrdersValidationService = OrdersValidationService;
		this._StoredInventoryService = StoredInventoryService;
	}

    toString() {
		return 'pricingEstimator';
	}

    getPricePerPoint(order, points) {
		let zipCode = this._OrdersValidationService.isPickup(order) ? order.originationLocation.zipCode
			: order.terminalLocation.zipCode;

		if(!(zipCode.length === 5 || order.customer._id)) {
			return this._$q.resolve({ data: { price: 0}});
		}

        let query = {
            points: points
        };
    	query.zipCode = zipCode;

        if (order.customer && order.customer._id) {
            query.customerId = order.customer._id;
        }

        let queryString = "?points=" + query.points;
        if (query.zipCode)  queryString += "&zipCode=" + query.zipCode;
        if (query.customerId)  queryString += "&customerId=" + query.customerId;

        return this._$http.get(this.baseAPIURL + queryString);
    }

    getPriceFromBids(order, isSpacePrice){
		let bid = new Bid(order, isSpacePrice);
		return this._$http.post(this._AppConstants.api + '/bids', bid);
	}

	updateSpacePrice(order, storageUnits) {
		if(!order.spacePriceSelection){
			order.spacePriceSelection = {};
		}
			let storageUnit = this._StoredInventoryService.getStorageUnitRecordFromOrderStorageUnit(order, storageUnits)
			if (!order.storageUnit || !order.spacePriceSelection || !storageUnit)
			return this._$q.resolve({ data: { price: 0}});

		order.spacePriceSelection.itemCap = this._StoredInventoryService.getStorageUnitCapacity(order, storageUnits);

		return this.getPriceFromBids(order, true).then((res) => {
				if (angular.isDefined(res.data.value)) {
					order.spacePriceSelection.price = this.getTotalPrice(res.data.value, res.data.additionalCoverageCost);
				}
			});
	}

	updateItemPrice(order, storageUnits, currentlyStoredInventory) {
		let deferred = this._$q.defer();
		let totalInventory = this._StoredInventoryService.getTotalInventory(order, currentlyStoredInventory);
		if(!order.itemPriceSelection){
			order.itemPriceSelection = {};
		}
		order.itemPriceSelection.total = this._StoredInventoryService.getInventoryItemCount(totalInventory);
		order.itemPriceSelection.pointsTotal = this._StoredInventoryService.getPoints(totalInventory);
		order.itemPriceSelection.itemCap = this._StoredInventoryService.getStorageUnitCapacity(order, storageUnits);

		this.getPriceFromBids(order, false).then((res) => {
			order.itemPriceSelection.price = this.getTotalPrice(res.data.value, res.data.additionalCoverageCost);
			deferred.resolve();
		}, (err) => {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	getTotalPrice(value, additionalCoverageCost) {
		let insuranceCost =0, price =0;
		if (angular.isDefined(additionalCoverageCost)) {
			insuranceCost = additionalCoverageCost;
		}
		if (angular.isDefined(value)) {
			price = value;
		}
		return price + insuranceCost;
	}
}

Pricing.$inject = ['AppConstants', '$http', '$httpParamSerializer', '$q',
	'OrdersValidationService', 'StoredInventoryService'];
export default Pricing;
