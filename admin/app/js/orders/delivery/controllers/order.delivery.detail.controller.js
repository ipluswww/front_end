import _ from 'lodash';
import moment from 'moment';

import BaseOrderDetailController from '../../shared/controllers/base-order-detail.controller.js'

class OrderDeliveryDetailController extends BaseOrderDetailController {
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
            OrdersCustomerService, warehouseLocations, ConfirmDialog,
            AlertDialog, Payment, customerPaymentHoldOrders, backParam);

        // header search / filter object
        this.filter = {
            search: '',
            containerTypes: ['box', 'unboxed', 'furniture'],
            jumpTo: '',
            jumpToTarget: null
        };
        this.setCustomerStoredInventory(currentlyStoredInventory);
    }

    onInventoryFilterChanged($event) {
        this.filter = $event.filter;
        this.filteredStoredInventory = this._StoredInventoryService
            .getCurrentlyStoredInventoryFiltered(this.currentlyStoredInventory,
                this.order, this.filter);
    }

    onItemAddedToOrderInventory($event){
        let item = $event.item;
        if (this.order.inventory.length === 0) {
            this.order.warehouseLocation = item.warehouseLocation;
            this.order.originationLocation = this.order.warehouseLocation.location;
        }

        if (this.order.warehouseLocation && item.warehouseLocation
            && this.order.warehouseLocation._id === item.warehouseLocation._id) {

            this.order.inventory.push(item);
            this.filteredStoredInventory = this._StoredInventoryService
                .getCurrentlyStoredInventoryFiltered(this.currentlyStoredInventory,
                    this.order, this.filter);
        }
        this.updateItemPrice(); 

    }

    setCustomerStoredInventory(inventory) {
        this.currentlyStoredInventory = inventory;
        this.filteredStoredInventory = this._StoredInventoryService
            .getCurrentlyStoredInventoryFiltered(this.currentlyStoredInventory,
                this.order, this.filter);
    }

    onInventoryItemRemoved($event){
        let order = _.cloneDeep(this.order);
        _.remove(order.inventory, (item) => {
            return (item._id === $event.item._id);
        });
        this.order = order;
        this.filteredStoredInventory = this._StoredInventoryService
            .getCurrentlyStoredInventoryFiltered(this.currentlyStoredInventory,
                this.order, this.filter);
        this.updateItemPrice();
    }
}

OrderDeliveryDetailController.$inject = ['Order', 'SharedOrderService', 'AppConstants',
    '$state',  'order', 'AlertService', 'spaceEstimators', 'Pricing',
    'OrdersValidationService', 'currentlyStoredInventory', 'Market', 'SubMarket',
    'Container', 'SharedOrderHelperService', 'OrdersAddressService',
    'StoredInventoryService', 'customer', 'OrdersCustomerService',
    'warehouseLocations','ConfirmDialog', 'AlertDialog', 'backParam', 'Payment',
    'customerPaymentHoldOrders'];
export default OrderDeliveryDetailController;
