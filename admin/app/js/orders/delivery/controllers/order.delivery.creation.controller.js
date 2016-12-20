import BaseOrderCreationController from '../../shared/controllers/base-order-creation.controller.js'
class OrderDeliveryCreationController  extends BaseOrderCreationController {
    constructor ($state, order, SharedOrderHelperService, SharedOrderService,
            AlertService, AppConstants, OrdersValidationService, spaceEstimators,
            currentlyStoredInventory, OrdersAddressService, OrdersCustomerService,
            customer, warehouseLocations, Payment, $rootScope,
            AlertDialog, backParam, customerPaymentHoldOrders, Pricing){
        super($state, order, SharedOrderHelperService, SharedOrderService,
                AlertService, AppConstants, OrdersValidationService, spaceEstimators,
                currentlyStoredInventory, OrdersAddressService, OrdersCustomerService,
                customer, warehouseLocations, Payment, $rootScope,
                AlertDialog, customerPaymentHoldOrders, Pricing, backParam);
    }
}

OrderDeliveryCreationController.$inject = ['$state', 'order', 'SharedOrderHelperService',
    'SharedOrderService', 'AlertService', 'AppConstants', 'OrdersValidationService',
    'spaceEstimators', 'currentlyStoredInventory', 'OrdersAddressService',
    'OrdersCustomerService', 'customer', 'warehouseLocations', 'Payment', '$rootScope',
    'AlertDialog', 'backParam', 'customerPaymentHoldOrders', 'Pricing'];
export default OrderDeliveryCreationController;
