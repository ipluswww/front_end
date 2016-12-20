class PaymentMethodSelectionController {
    constructor(Payment) {
        this._Payment = Payment;
        this.selection=this.defaultPaymentMethod;
        this.init();
    }

    init() {

    }

    saveChanges() {
        this._Payment.changeDefaultPaymentMethod(this.selection).then((res)=>{
            this.selection = res.paymentMethod;
            this.onDefaultPaymentMethodChanged();
        });
    }

    isDirty() {
        return this.selection !== this.defaultPaymentMethod;
    }
}

PaymentMethodSelectionController.$inject = ['Payment'];
export default PaymentMethodSelectionController;
