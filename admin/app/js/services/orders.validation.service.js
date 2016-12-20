import angular from 'angular';

class OrdersValidationService {
	constructor(AppConstants, Disposition) {
		this._AppConstants = AppConstants;
	}

    canOrderBeSavedToCreatedDisposition(order) {
        return this.isCustomerEmailValid(order)
        && this.hasValidZipCodeAndMarket(order)
        && this.hasValidCreditCard(order)
        && this.hasValidPricePlanSelection(order)
        && this.hasMetMinimumInventoryRequirements(order)
        && this.hasValidRequestedDates(order)
		&& this.isEligibleForDisposition(order,
			this._AppConstants.dispositions.created)
		&& this.doesOrderHaveEditableDisposition(order);
    }

    canOrderBeSavedToRequestedDisposition(order) {
        return this.isCustomerEmailValid(order)
            && this.hasValidZipCodeAndMarket(order)
			&& this.isEligibleForDisposition(order,
	            this._AppConstants.dispositions.requested)
			&& this.doesOrderHaveEditableDisposition(order);
    }

	canOrderBeSavedToUpdatedDisposition(order) {
		return this.isCustomerEmailValid(order)
            && this.hasValidZipCodeAndMarket(order)
			&& this.isEligibleForDisposition(order,
	            this._AppConstants.dispositions.updated)
			&& this.doesOrderHaveEditableDisposition(order);
	}

	canStorageUnitBeChanged(order) {
		if(this.isPickup(order)){
			return order.originationLocation.zipCode || (order.customer && order.customer._id);
		}
		return (order.terminalLocation && order.terminalLocation.zipCode) || (order.customer && order.customer._id);
	}

	doesOrderHaveEditableDisposition(order){
		if(!this.hasDisposition(order)
			|| order.disposition === this._AppConstants.dispositions.prospect
			|| order.disposition === this._AppConstants.dispositions.requested
			|| order.disposition === this._AppConstants.dispositions.created
			|| order.disposition === this._AppConstants.dispositions.accepted
			|| order.disposition === this._AppConstants.dispositions.updated
			|| order.disposition === this._AppConstants.dispositions.scheduled
		){
			return true;
		}
		return false;
	}

	getOrderType(order){
		if(this.isPickup(order)){
			return this._AppConstants.orderTypes.pickup;
		}
		return this._AppConstants.orderTypes.delivery;
	}

    hasAtLeastOneFutureRequestedPickupDate(order) {
        return this.isDateValid(order.requestedDate1)
        && this.isDateValid(order.requestedDate2)
        && this.isDateValid(order.requestedDate3);
    }


    hasMetMinimumInventoryRequirements(order){
        if (this.isSpacePrice(order) || (angular.isDefined(order.inventory) &&
            order.inventory !== null &&
            order.inventory.length > 0)) {
            return true;
        }
        return false;
    }
	hasCustomer(order) {
		return angular.isDefined(order.customer);
	}

	hasCustomerEmail(order) {
		return this.hasCustomer(order) && angular.isDefined(order.customer.email);
	}

	hasDisposition(order) {
		return angular.isDefined(order.disposition)
			&& order.disposition !==null
			&& order.disposition !== "";
	}

    hasFilledInValidCreditCardData() {
        let hostedFieldSelector = '.hosted-field';
        let validFieldClass = 'braintree-hosted-fields-valid';
        let numberOfValidFields = 0;
        let creditCardFields = document.querySelectorAll(hostedFieldSelector);

        for (let i = 0; i < creditCardFields.length; i++) {
            if(creditCardFields[i].className.includes(validFieldClass)) {
                numberOfValidFields++;
            }
        }
        if(numberOfValidFields < creditCardFields.length){
            return false
        }

        return true;
    }

	hasItemPriceSelection(order){
		return order.itemPriceSelection && order.itemPriceSelection.price > 0;
	}

	hasExistingCustomer(order) {
		return this.hasCustomer(order) && angular.isDefined(order.customer._id);
	}

	hasManuallySelectedPrice(order){
		return angular.isDefined(order.hasManuallySelectedPrice)
			&& order.hasManuallySelectedPrice != null
			&& order.hasManuallySelectedPrice ===true;
	}
    hasStorageUnit(order){
        if (order.storageUnit &&
            order.storageUnit.subType) {
            return true;
        }
        return false;
    }

	hasSpacePriceSelection(order) {
		return order.spacePriceSelection && order.spacePriceSelection.price > 0;
	}

	hasUniqueRequestedDates(order) {
		let dates = [];
		if(this.isDateFilledIn(order.requestedDate1)){
			dates.push(new Date(order.requestedDate1));
		}
		if(this.isDateFilledIn(order.requestedDate2)){
			dates.push(new Date(order.requestedDate2));
		}
		if(this.isDateFilledIn(order.requestedDate3)){
			dates.push(new Date(order.requestedDate3));
		}
        let uniqueDates = _.uniqBy(dates, (d) => {
            return [d.getDate(),d.getTime()].join();
        });
        return uniqueDates.length === dates.length;
    }

    hasValidCreditCard(order) {
        if (angular.isDefined(order.customer.paymentMethodToken) &&
            order.customer.paymentMethodToken !== null) {
            return true;
        }
        return this.hasFilledInValidCreditCardData();
    }

	hasValidPricePlanSelection(order){

		if ((this.isSpacePrice(order)  && this.hasStorageUnit(order) && this.hasSpacePriceSelection(order))
			||(!this.isSpacePrice(order)  && this.hasItemPriceSelection(order))
			|| !this.doesOrderHaveEditableDisposition(order)){
			return true;
		}
		return false;
	}
    hasValidMarket(order){
        if (angular.isDefined(order.market) &&
            angular.isDefined(order.market._id)) {
            return true;
        }
        return false
    }

	hasValidRequestedDates(order){
		return this.hasUniqueRequestedDates(order)
		&& this.hasAtLeastOneFutureRequestedPickupDate(order);
	}

    hasValidZipCode(order){
        if (this.isPickup(order) && angular.isDefined(order.originationLocation) &&
            angular.isDefined(order.originationLocation.zipCode) &&
            order.originationLocation.zipCode !== null) {
            return true;
        }

        if (!this.isPickup(order) && angular.isDefined(order.terminalLocation) &&
            angular.isDefined(order.terminalLocation.zipCode) &&
            order.terminalLocation.zipCode !== null) {
            return true;
        }
        return false;
    }

    hasValidZipCodeAndMarket(order){
        return this.hasValidZipCode(order)
            && this.hasValidMarket(order);
    }

    isCustomerEmailValid(order) {
        if(angular.isDefined(order.customer.email)
            && order.customer.email !== null){
            return this.isValidEmail(order.customer.email);
        }
        return false;
    }

	isPickup(order){
		return order.goingToWarehouse;
	}

	isValidEmail(email) {
		const regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        return typeof email === "string" && regex.test(email);
	}

    isDateInTheFuture(date) {
        let dt = moment(date)
        let now = moment();

        if (now > dt) {
           return false;
        }
        return true;
    }

    isDateFilledIn(date){
        if (angular.isDefined(date) &&
            date !== null) {
            return true;
        }
        return false;
    }

    isDateValid(date) {
        if (this.isDateFilledIn(date)) {
            return this.isDateInTheFuture(date)
        }
        return true;
    }

    isOrderNew(order){
        if(angular.isUndefined(order._id)|| order._id === null) {
            return true;
        }

        return false;
    }

	isSpacePrice(order) {
		return order.spacePrice;
	}

	isItemPrice(order) {
		return !this.isSpacePrice(order);
	}

    isEligibleForDisposition(order, toDisposition) {
		return order.allowableDispositions.indexOf(toDisposition) > -1;
    }
}

OrdersValidationService.$inject = ['AppConstants'];

export default OrdersValidationService;
