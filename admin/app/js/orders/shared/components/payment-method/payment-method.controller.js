const CONST_MODE_ADD_NEW="AddNewPaymentMethod";
const CONST_MODE_DISPLAY_DEFAULT="DisplayDefaultPaymentMethod";

class PaymentMethodController {

    constructor($http, paymentService) {
        this._$http = $http;
        this._paymentService = paymentService;
        this.braintreeCustomer={};
        this.defaultPaymentMethod={};
        this._mode=CONST_MODE_ADD_NEW;
    }

    $onChanges(changeEvent) {
        if(changeEvent.braintreeCustomer && changeEvent.braintreeCustomer.currentValue){
            this._mode=CONST_MODE_DISPLAY_DEFAULT;
            this.setDefaultPaymentMethod();
        }
    }

    hasDefaultPaymentMethod() {
        if(this.defaultPaymentMethod.token) {
            return true;
        }

        return false;
    }

    changeCreditCardSelection() {
        this._mode = CONST_MODE_ADD_NEW;
    }

    onPaymentMethodChanged($event) {
        this.defaultPaymentMethod = $event.paymentMethod;
        this.setDefaultPaymentMethod();
        this._mode=CONST_MODE_DISPLAY_DEFAULT;
        this.onPaymentMethodUpdated({$event});

    }
    onPaymentMethodCancelled($event) {
        this._mode=CONST_MODE_DISPLAY_DEFAULT;
    }

    setDefaultPaymentMethod(paymentMethod){
        if(this.braintreeCustomer){
            this.defaultPaymentMethod = 
                this._paymentService.getDefaultPaymentMethod(this.braintreeCustomer);
        }
        else {
            this._mode = CONST_MODE_ADD_NEW;
        }
    }

    shouldDisplayAddPaymentMethod() {
        return !this.isLocked && this._shouldDisplayBasedOnMode(CONST_MODE_ADD_NEW);
    }

    shouldDisplayDefaultPaymentMethod() {
        return this._shouldDisplayBasedOnMode(CONST_MODE_DISPLAY_DEFAULT);
    }

    shouldDisplayChangeCreditCardSelection() {
        return !this.isLocked && this.shouldDisplayDefaultPaymentMethod();
    }

    _shouldDisplayBasedOnMode(mode) {
        if(this._mode === mode) {
            return true;
        }

        return false;
    }
}

PaymentMethodController.$inject = ['$http', 'Payment'];
export default PaymentMethodController;
