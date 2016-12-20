class OrderTitleController {
	constructor($state, AppConstants, OrdersValidationService) {
		this._$state = $state;
		this._AppConstants = AppConstants;
		this._OrdersValidationService = OrdersValidationService;
	}

	getTitle() {
		let title = '';
		if(this._OrdersValidationService.isOrderNew(this.order)){
			title = 'New ';
		}
		title+= this.getOrderType();
		title+= this.getOrderId();

		return title;
	}
	
	getOrderId() {
		let orderIdString = '';
		if (this.order && this.order._id) {

			let orderId = this.order._id + '';
			orderIdString = ' - ' + orderId.substring(0, orderId.length - 5) + '<span>' + orderId.slice(-5) + '</span> ';

		}
		return orderIdString;
	}
	
	getOrderType() {
		let orderType = '';
		if(this._OrdersValidationService.isPickup(this.order)){
			if (this.order.disposition === this._AppConstants.dispositions.prospect) {
				orderType = 'Prospect Conversion';
			}
			else if (this.order.disposition === this._AppConstants.dispositions.requested) {
				orderType = 'Requested Conversion';
			}
			else {
				orderType = 'Pickup Order'
			}
		}
		else {
			orderType = 'Delivery Order'
		}
		return orderType;
	}

	goBack() {
		this._$state.go(this.backParam.name, this.backParam.params);
	}

	isBackable() {
		return !!this.backParam;
	}

	isPickup() {
		return this._OrdersValidationService.isPickup(this.order);
	}

}

OrderTitleController.inject = ['$state', 'AppConstants', 'OrdersValidationService'];

export default OrderTitleController;
