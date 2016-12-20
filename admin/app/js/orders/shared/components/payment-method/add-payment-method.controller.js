class AddPaymentMethodController {

    constructor($http, Payment, $q, AlertService) {
        this._$http = $http;
        this._$q = $q;
        this.form={};
        this.hostedFieldsInstance={};
        this._Payment = Payment;
        this.isSaving = false;
        this._AlertService = AlertService;
        this.init();
    }

    init() {
        this._Payment.getHostedFieldsInstance()
            .then((instance) => {
                this.hostedFieldsInstance = instance;
            }, (error)=>{
        });
    }
    cancelPaymentMethod() {
        this.onPaymentMethodCancelled({$event:{}});
    }
    updatePaymentMethod(){
        this.isSaving = true;
        let deferred = this._$q.defer();
        this._Payment.getPaymentMethodNonce(this.hostedFieldsInstance).then(
            (paymentMethodNonce)=> {
                this._Payment.updatePaymentMethod(this.paymentMethodToken,
                    paymentMethodNonce.nonce)
                .then(
                (res) => {
                    this._AlertService.success('Payment Method successfully updated.');
                    let returnObj = { paymentMethod: res.data.paymentMethod };
                    this.onPaymentMethodChanged({$event:returnObj});
                    this.isSaving=false;
                    deferred.resolve(returnObj);
                },
                (error)=>{
                    this.onError(error);
                    deferred.reject({ error });
                });
            },
            (error) => {
                this.onError(error);
            },
            (error)=>{
                this.onError(error);
            }
        );
        return deferred.promise;
    }

    onError(error){
        let message = "";
        if(error.data && error.data.error){
            message = error.data.error;
        }
        else {
            message = error;
        }
        return this._AlertService.error(
            'Payment Method could not be updated. \nError: ' +
            message
        );
    }
    isEdit(){
        if(angular.isDefined(this.paymentMethodToken)
            && this.paymentMethodToken !==null)
        {
            return true;
        }
        return false;
    }
}

AddPaymentMethodController.$inject = ['$http', 'Payment', '$q', 'AlertService'];
export default AddPaymentMethodController;
