class  BaseOrderStepController {
    constructor (order, spaceEstimators, OrdersValidationService, OrdersAddressService,
        AlertService, currentlyStoredInventory, customer, AlertDialog, Payment,
        customerPaymentHoldOrders, Pricing, backParam){
        this.order=order;
        this.spaceEstimators = spaceEstimators;
        this._OrdersValidationService = OrdersValidationService;
        this._AlertService = AlertService;
        this._OrdersAddressService = OrdersAddressService;
        this.currentlyStoredInventory = currentlyStoredInventory;
        this.customer = customer;
        this._AlertDialog = AlertDialog;
        this._Payment = Payment;
        this._Pricing = Pricing;
        this.customerPaymentHoldOrders = customerPaymentHoldOrders;
        this.backParam = backParam;
    }

    hasOrderWithPaymentHold(){
        return this.customerPaymentHoldOrders.length > 0;
    }

    hasExpiredDefaultPaymentMethod(){
        return this._Payment.isDefaultPaymentMethodExpired(this.braintreeCustomer);
    }

    isLocked() {
        return !this._OrdersValidationService.doesOrderHaveEditableDisposition(this.order);
    }

    isOrderValidForCreateStep() {
        return this._OrdersValidationService.hasValidPricePlanSelection(this.order)
        && this._OrdersValidationService.hasCustomerEmail(this.order)
        && this._OrdersValidationService.hasValidZipCodeAndMarket(this.order)
        && this._OrdersValidationService.hasMetMinimumInventoryRequirements(this.order);
    }

    loadBraintreeCustomer() {
        if(this.order.customer.customerId){
            this._Payment.getCustomer(this.order.customer.customerId)
                .then((cust)=>{
                    this.braintreeCustomer = cust;
                    console.log(cust);
                });
        }
    }

    setUrl() {
        this._$state.transitionTo(this._$state.current.name,
            {id: this.order._id, customerId: this.order.customer._id},
            { notify: false });
    }

    setCoordinateWithAllowableDistanceVerification() {
        this._OrdersAddressService.setLocationCoordinate(this.order).then(result => {
            console.log(this.order);
            if (result) {
                if (!this._OrdersValidationService.isPickup(this.order)) {
                    return this._OrdersAddressService.isAllowableDistanceFromCustomerAddress(this.order);
                }
            }
        }).then(result => {
            if (angular.isDefined(result) && result === false) {
                this._AlertDialog
                    .withTitle("Warning")
                    .withDescription("This delivery is more than 40 miles from the customer’s home address.")
                    .show();
            }
        }).catch(err => {
            console.log("err>>", err);
            this._AlertService.error(err);
        });
    }

    updateSpacePrice() {
        if((this._OrdersValidationService.hasValidZipCodeAndMarket(this.order)
            || this._OrdersValidationService.hasExistingCustomer(this.order))
            && this._OrdersValidationService.hasStorageUnit(this.order)) {
            this._Pricing.updateSpacePrice(this.order, this.spaceEstimators).then((res)=>{
                this._SharedOrderService.setOrder(this.order);
            });
        }
    }

    updateItemPrice() {
        if((this._OrdersValidationService.hasValidZipCodeAndMarket(this.order)
            || this._OrdersValidationService.hasExistingCustomer(this.order))) {
            this._Pricing.updateItemPrice(this.order, this.spaceEstimators,
                this.currentlyStoredInventory).then((res) => {
                this._SharedOrderService.setOrder(this.order);
            }, (err) => {
                this._AlertService.error(err.data);
            });
        }

    }

}

export default BaseOrderStepController;
