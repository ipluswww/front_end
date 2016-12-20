import _ from 'lodash';
import moment from 'moment';
import BaseOrderDetailController from '../../shared/controllers/base-order-detail.controller.js'

class  OrderPickupDetailController extends BaseOrderDetailController {
    constructor (Order, SharedOrderService, AppConstants,
        $state, order, AlertService, spaceEstimators,
        Pricing, OrdersValidationService, currentlyStoredInventory,
        Market, SubMarket, Container, SharedOrderHelperService,
        OrdersAddressService, StoredInventoryService, customer,
        OrdersCustomerService, warehouseLocations, ConfirmDialog, 
        AlertDialog, backParam, Payment, customerPaymentHoldOrders){
        super(Order, SharedOrderService, AppConstants,
            $state, order, AlertService, spaceEstimators,
            Pricing, OrdersValidationService, currentlyStoredInventory,
            Market, SubMarket, Container, SharedOrderHelperService,
            OrdersAddressService, StoredInventoryService, customer,
            OrdersCustomerService, warehouseLocations, ConfirmDialog, AlertDialog,
            Payment, customerPaymentHoldOrders, backParam);
    }
}

OrderPickupDetailController.$inject = ['Order', 'SharedOrderService', 'AppConstants',
    '$state',  'order', 'AlertService', 'spaceEstimators', 'Pricing',
    'OrdersValidationService', 'currentlyStoredInventory', 'Market', 'SubMarket',
    'Container', 'SharedOrderHelperService', 'OrdersAddressService',
    'StoredInventoryService', 'customer', 'OrdersCustomerService',
    'warehouseLocations', 'ConfirmDialog', 'AlertDialog', 'backParam',
    'Payment', 'customerPaymentHoldOrders'];

export default OrderPickupDetailController;
