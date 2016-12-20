import Location from '../abstract/model/location.js';
class OrdersAddressService {
	constructor(OrdersValidationService, AppConstants, GoogleApi, GoogleMapApi) {
        this._OrdersValidationService = OrdersValidationService;
        this._AppConstants = AppConstants;
        this._GoogleMapApi = GoogleMapApi;
        this._GoogleApi = GoogleApi;
	}

    getAddressForCustomerItems(order) {
        if(this._OrdersValidationService.isPickup(order)){
            return order.originationLocation;
        }
        else{
            return order.terminalLocation;
        }
    }

	copyAddressForCustomerItemsToCustomer(order){
	    if(this._OrdersValidationService.isPickup(order)){
            order.customer.location = order.originationLocation;
        }
        else{
			order.customer.location = order.terminalLocation;
        }
	}

    getZipCodeForCustomerItems(order) {
        let location = this.getAddressForCustomerItems(order);
        return location ? location.zipCode : null;
    }

    hasAddressForCustomerItems(order){
        return angular.isDefined(this.getAddressForCustomerItems(order));
    }

    hasZipCodeForCustomerItems(order){
		return !!this.getZipCodeForCustomerItems(order);
    }
    
    setAddressForCustomerItems(order, newLocation){
        if(this._OrdersValidationService.isPickup(order)){
            order.originationLocation = newLocation;
        }
        else{
            order.terminalLocation = newLocation;
        }
    }

	setZipCodeForCustomerItems(order, zipCode){
		if(this._OrdersValidationService.isPickup(order)){
			if(!order.originationLocation){
				order.originationLocation = new Location();
			}
			order.originationLocation.zipCode = zipCode;
		}
		else{
			if(!order.terminalLocation){
				order.terminalLocation = new Location();
			}
			order.terminalLocation.zipCode = zipCode;
		}
	}

    setLocationCoordinate(order){
        return new Promise((resolve, reject) => {
            let location = this.getAddressForCustomerItems(order);
            if (location && location.address) {
                this._GoogleApi.getGeocode(location.address).then(result => {
                    if (result) {
                        location.coordinate = {
                            lat: result.latitude,
                            lng: result.longitude
                        };
                        return resolve(true);
                    } else {
                        location.coordinate = null;
                        return reject(`Invalid addres - ${location.address}`);
                    }
                });
            } else {
                return resolve(false);
            }
        });
    }

    isAllowableDistanceFromCustomerAddress(order) {
        return new Promise((resolve, reject) => {
            let location = this.getAddressForCustomerItems(order);
            this._GoogleMapApi.then(maps => {
                const deliveryPoint = new maps.LatLng(location.coordinate);
                const customerPoint = new maps.LatLng(order.customer.location.coordinate);
                const d = maps.geometry.spherical.computeDistanceBetween(customerPoint, deliveryPoint);

                return resolve(d < this._AppConstants.metersToMilesFactor * this._AppConstants.allowableDeliveryMilesFromCustomer);
            });
        });
    }
}

OrdersAddressService.$inject = ['OrdersValidationService', 'AppConstants', 'GoogleApi', 'uiGmapGoogleMapApi'];

export default OrdersAddressService;
