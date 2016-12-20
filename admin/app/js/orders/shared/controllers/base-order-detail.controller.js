import _ from 'lodash';
import BaseOrderStepController from './base-order-step.controller.js';

class  BaseOrderDetailController extends BaseOrderStepController {
    constructor (Order, SharedOrderService, AppConstants,
        $state, order, AlertService, spaceEstimators,
        Pricing, OrdersValidationService, currentlyStoredInventory,
        Market, SubMarket, Container, SharedOrderHelperService,
        OrdersAddressService, StoredInventoryService, customer,
        OrdersCustomerService, warehouseLocations, ConfirmDialog, AlertDialog,
                 Payment, customerPaymentHoldOrders, backParam){
        super(order, spaceEstimators, OrdersValidationService, OrdersAddressService, AlertService,
            currentlyStoredInventory, customer, AlertDialog, Payment, customerPaymentHoldOrders,
            Pricing, backParam);
        this._$state = $state;
        this._Order = Order;
        this._SharedOrderService = SharedOrderService;
        this._AppConstants = AppConstants;
        this._AlertService = AlertService;
        this._Market = Market;
        this._SubMarket = SubMarket;
        this._Container = Container;
        this._SharedOrderHelperService = SharedOrderHelperService;
        this._OrdersAddressService = OrdersAddressService;
        this._StoredInventoryService = StoredInventoryService;
        this._OrdersCustomerService = OrdersCustomerService;
        this._ConfirmDialog = ConfirmDialog;
        this.warehouseLocations = warehouseLocations;
        this.init();
    }

    init() {
        this.autoAssignSpaceOrItemPriceSelection();
        this._OrdersCustomerService.setCustomerOnOrderIfNotExists(this.order, this.customer);
        this.loadOrderFromCustomer();
    }

    autoAssignSpaceOrItemPriceSelection(){
        if(this.isLocked() || this._OrdersValidationService.hasManuallySelectedPrice(this.order)){
            return;
        }

        if(this._OrdersValidationService.hasItemPriceSelection(this.order)
            && this._OrdersValidationService.hasSpacePriceSelection(this.order)
            && this.order.itemPriceSelection.price < this.order.spacePriceSelection.price){
            this.spacePrice = false;
        }

    }

    clearDeliveryItems() {
        if(!this._OrdersValidationService.isPickup(this.order)){
            this.order.inventory = [];
        }
    }

    goToCreationStep() {
        this._SharedOrderService.setOrder(this.order);
        if(this._OrdersValidationService.isPickup(this.order)){
            this._$state.go('app.orders.pickup.create',{id:this.order._id, back: this._backParam});
        }
        else {
            this._$state.go('app.orders.delivery.create',{id:this.order._id, back: this._backParam});
        }
    }

    getCustomerNameLabel() {
        if (this.order && this.order._id && this._OrdersValidationService.hasExistingCustomer(this.order)) {
            return this.order.customer.name + " (" + this.order.disposition + ")";
        } else {
            return this._OrdersValidationService.hasExistingCustomer(this.order) ? this.order.customer.name : "New Customer";
        }
    }

    selectPricePlanOption(isSpacePrice) {
        if(this.isLocked()) return;

        this.order.spacePrice = isSpacePrice;
        this.order.hasManuallySelectedPrice = true;
    }

    loadOrderFromCustomer() {
        if(this._OrdersValidationService.hasExistingCustomer(this.order)){
            this._OrdersCustomerService.setLocationFromCustomer(this.order, this.customer);
            this._OrdersCustomerService.setDiscountCodeFromCustomer(this.order);
            this.setCurrentlyStoredItemsForCustomer().then((res)=>{
                this._Container.getStorageUnitForOrder(this.order).then((res)=>{
                	if(res.data && res.data.length > 0){
    					this.order.storageUnit = res.data[0];
    				}
                    this.setUrl();
                    this._SharedOrderHelperService
                        .getMarketFromCustomer(this.order.customer).then((res)=>{
                        this.order.market = res;
                        return res;
                    }).finally((res)=>{
                        this.updateItemPrice();
                        this.updateSpacePrice();
                    });
                });
            });
        }
    }

    onCustomerUpdated($event) {
        const newCustomer = $event.newCustomer;
        const previousCustomer = $event.previousCustomer;
        if (previousCustomer.defaultMarket) newCustomer.defaultMarket = previousCustomer.defaultMarket;
        if (newCustomer._id) this.checkForExistingOrder(newCustomer, previousCustomer);
        else {
            this.order.customer = newCustomer;
            this.currentlyStoredInventory = [];
        }
    }

    checkForExistingOrder(newCustomer, previousCustomer) {
        const query = { limit: 10, page: 1, skip: 0 };
        const filter = { customer: newCustomer._id, disposition: { $in: ['PROSPECT', 'REQUESTED'] } };
        this._Order.list(query, filter)
            .then(response => {
                if (response.data && response.data.length > 0){
                    this.order = response.data[0];
                } else this.confirmNewOrder(newCustomer, previousCustomer);
            });
    }

    confirmNewOrder(newCustomer, previousCustomer) {
        const orderType = this._OrdersValidationService.isPickup(this.order) ? 'pickup' : 'delivery';
        const title = 'There are no open ' + orderType + ' orders for customer ' + this.order.customer.name + '.';
        const description= 'Do you wish to create a new ' + orderType + ' order?';

        this._ConfirmDialog
            .withTitle(title)
            .withDescription(description)
            .withContinueText('YES')
            .withCancelText('NO')
            .show()
            .then(() => {
                this.clearDeliveryItems();
                this.loadOrderFromCustomer();
            })
            .catch(() => this.order.customer = previousCustomer);
    }

    onInventoryItemQuanityUpdated($event) {
        let order = _.cloneDeep(this.order);
        this._StoredInventoryService.adjustInventoryBasedOnItemQuantityChanged($event, order);
        this.order = order;
        this.updateItemPrice();
    }

    onItemAddedToOrderInventory($event) {
        let order = _.cloneDeep(this.order);
        order.inventory.push($event.item);
        this.order = order;
        this.updateItemPrice();
    }

    onStorageUnitChanged(changeEvent) {
        this.order.storageUnit=changeEvent.storageUnit;
        this.updateSpacePrice();

    }

    onZipCodeMarketUpdated($event){
        this.order.market = $event.market;
        this.order.customer.defaultMarket = this.order.market;
        this._OrdersAddressService.setZipCodeForCustomerItems(this.order, $event.zipCode);
        this.updateSpacePrice();
        this.updateItemPrice();
    }

    setCurrentlyStoredItemsForCustomer() {
        return this._Container.getCurrentlyStoredItemsForCustomer(this.order.customer)
            .then((res)=>{
                this.setCustomerStoredInventory(res.data);
            });
    }

    setCustomerStoredInventory(inventory) {
        this.currentlyStoredInventory = inventory;
    }
}

export default BaseOrderDetailController;
