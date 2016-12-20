import BaseOrderStepController from './base-order-step.controller.js';
class  BaseOrderCreationController extends BaseOrderStepController {
    constructor ($state, order, SharedOrderHelperService, SharedOrderService,
            AlertService, AppConstants, OrdersValidationService, spaceEstimators,
            currentlyStoredInventory, OrdersAddressService, OrdersCustomerService,
            customer, warehouseLocations, Payment, $rootScope,
            AlertDialog, customerPaymentHoldOrders, Pricing, backParam){
        super(order, spaceEstimators, OrdersValidationService, OrdersAddressService,
            AlertService, currentlyStoredInventory, customer, AlertDialog, Payment, customerPaymentHoldOrders,
            Pricing, backParam);
        this._$state = $state;
        this.title = 'Order Confirmation';
        this._AlertService = AlertService;
        this.hostedFieldsInstance = null;
        this._SharedOrderHelperService = SharedOrderHelperService;
        this._SharedOrderService = SharedOrderService;
        this.paymentMethodNonce = null;
        this._AppConstants = AppConstants;
        this._OrdersAddressService = OrdersAddressService;
        this._OrdersCustomerService = OrdersCustomerService;
        this.warehouseLocations = warehouseLocations;
        this._$rootScope = $rootScope;
        this.init();
    }

    init() {
        if (!this.isOrderValidForCreateStep()) {
            this.goToPreviousStep();
        }
        this.loadBraintreeCustomer();
    }

    getErrorMessage(errorResponse){
        let error = errorResponse.data.error;
        let errorMessage = error.message;
        errorMessage += ' / ' + error.errors.source.message;

        return errorMessage;
    }

    goToPreviousStep() {
        this._SharedOrderService.setOrder(this.order);
        if(this._OrdersValidationService.isPickup(this.order)){
            this._$state.go('app.orders.pickup.detail', {id:this.order._id, back: this._backParam});
        }
        else {
            this._$state.go('app.orders.delivery.detail', {id:this.order._id, back: this._backParam});
        }
    }

    isSaveCreatedOrderEnabled() {
        return this.isFormValid()
        && this._OrdersValidationService.canOrderBeSavedToCreatedDisposition(this.order)
        && !this.isLocked()
            && !this._Payment.isDefaultPaymentMethodExpired(this.braintreeCustomer);
    }

    isSaveRequestedOrderEnabled() {
        return this.isFormValid()
        && this._OrdersValidationService.canOrderBeSavedToRequestedDisposition(this.order)
        && !this.isLocked();
    }

    isSaveUpdatedOrderEnabled() {
        return this.isFormValid()
        && this._OrdersValidationService.canOrderBeSavedToUpdatedDisposition(this.order)
        && !this.isLocked();
    }

    isSaveCreatedOrderVisible() {
        return this.isFormValid()
        && this._OrdersValidationService.doesOrderHaveEditableDisposition(this.order)
        && this._OrdersValidationService.isEligibleForDisposition(this.order,
            this._AppConstants.dispositions.created)
        && (this._OrdersValidationService.isOrderNew(this.order)
        || !this.isLocked());
    }

    isSaveRequestedOrderVisible() {
        return this.isFormValid()
        && this._OrdersValidationService.doesOrderHaveEditableDisposition(this.order)
        && this._OrdersValidationService.isEligibleForDisposition(this.order,
            this._AppConstants.dispositions.requested)
        && (this._OrdersValidationService.isOrderNew(this.order)
        || !this.isLocked());
    }

    isSaveUpdatedOrderVisible() {
        return this.isFormValid()
        && this._OrdersValidationService.isEligibleForDisposition(this.order,
            this._AppConstants.dispositions.updated)
        && this._OrdersValidationService.doesOrderHaveEditableDisposition(this.order)
        && !this._OrdersValidationService.isOrderNew(this.order)
        && !this.isLocked();
    }

    isFormValid() {
        return this.form.$valid;
    }

    onCustomerValuationUpdated($event) {
        let copiedOrder = _.cloneDeep(this.order);
        copiedOrder.customer.customerValuation = $event.customerValuation;
        this._OrdersCustomerService.setCustomerValuationFromCustomer(copiedOrder);
        this.order = copiedOrder;
        this.updateSpacePrice();
        this.updateItemPrice();
    }

    onDiscountUpdated($event){
        let discount = $event.discount;
        let copiedOrder = _.cloneDeep(this.order);
        if(!copiedOrder.customer.discountsApplied){
            copiedOrder.customer.discountsApplied = [];
        }
        if($event.discount === null){
            copiedOrder.customer.discountsApplied = [];
            copiedOrder.discountCode = null;
            copiedOrder.discount = null;
        }
        else {
            copiedOrder.discountCode = discount.code;
            copiedOrder.customer.discountsApplied.push(discount.code);
            copiedOrder.discount = discount;
        }
        this.order = copiedOrder;

        this.updateItemPrice();
        this.updateSpacePrice();
    }

    onPaymentMethodUpdated($event){
        this.loadBraintreeCustomer();
    }

    onAddressChanged($event) {
        this.setCoordinateWithAllowableDistanceVerification();
    }

    saveCreatedOrder() {
        if(this.isSaveCreatedOrderEnabled()) {
            this._SharedOrderService.setOrder(this.order);
            this.order.disposition = this._AppConstants.dispositions.created;
            this.saveOrder();
        }
        else {
            this._AlertService.error('Order cannot be saved');
        }
    }

    saveOrder() {
        if(!this._OrdersValidationService.hasExistingCustomer(this.order)) {
            this._OrdersAddressService.copyAddressForCustomerItemsToCustomer(this.order);
        }
        if(!this._OrdersValidationService.hasValidCreditCard(this.order)){
            return this._AlertService.error('Credit Card information is not valid.');
        }
        this._$rootScope.$broadcast('beginProcessing');
        this._SharedOrderHelperService.saveOrder(this.order, this.hostedFieldsInstance,
            this.paymentMethodNonce)
            .then((res)=>{
                /* in order to trigger $onChanges of child components bound to a
                    property of an object, you have to copy the object and reset the field.
                    The below is all to trigger the payment method component to get updated. */
                let updatedOrder = _.cloneDeep(this.order);
                angular.merge(updatedOrder, res);
                this.order = updatedOrder;
                this.loadBraintreeCustomer();
                this.setUrl();
                this._SharedOrderService.setOrder(this.order);
                this._AlertService.success('Order has been successfully saved.');
            },
            (error)=>{
                let key = this._OrdersValidationService.getOrderType(this.order);
                this.order = this._SharedOrderService.getOrder(key);
                let msg = this.getErrorMessage(error);
                this._AlertService.error(msg);
            })
            .finally(()=>{
                this._$rootScope.$broadcast('endProcessing');
            });
    }
    saveRequestedOrder(){
        if(this.isSaveRequestedOrderEnabled()) {
            this._SharedOrderService.setOrder(this.order);
            this.order.disposition = this._AppConstants.dispositions.requested;
            this.saveOrder();
        }
        else {
            this._AlertService.error('Order cannot be saved');
        }
    }

    saveUpdatedOrder(){
        if(this.isSaveUpdatedOrderEnabled()) {
            this._SharedOrderService.setOrder(this.order);
            this.saveOrder();
        }
        else {
            this._AlertService.error('Order cannot be saved');
        }
    }

    isItemPriceSelected() {
        return this._OrdersValidationService.isItemPrice(this.order);
    }

    isExistingCustomer() {
        return this._OrdersValidationService.hasExistingCustomer(this.order);
    }
}

export default BaseOrderCreationController;
