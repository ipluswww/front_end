class OrdersCustomerService {
	constructor(OrdersValidationService, OrdersAddressService) {
        this._OrdersValidationService = OrdersValidationService;
        this._OrdersAddressService = OrdersAddressService;
	}

	setCustomerOnOrderIfNotExists(order, customer){
        if(customer){
            if(!order.customer || !order.customer._id) {
                order.customer = customer;
            }
        }
    }

    setCustomerValuationFromCustomer(order){
        order.customerValuation = order.customer.customerValuation;
    }

    setDiscountCodeFromCustomer(order) {
        if(order.customer.discountsApplied
            && order.customer.discountsApplied.length > 0){
            order.discounts = order.customer.discountsApplied[0];
            order.discountCode = order.customer.discountsApplied[0];
        }
    }

    setLocationFromCustomer(order){
        if(this._OrdersValidationService.hasExistingCustomer(order)) {
            this._OrdersAddressService
                .setAddressForCustomerItems(order, order.customer.location);
        }
    }

}

OrdersCustomerService.$inject = ['OrdersValidationService', 'OrdersAddressService'];

export default OrdersCustomerService;
