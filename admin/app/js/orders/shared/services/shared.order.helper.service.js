class SharedOrderHelperService {
    constructor(AppConstants, $http, $q, Payment, Order, Customer, Market,
        SubMarket) {
        this.baseAPIURL = AppConstants.api;
        this._$http = $http;
        this._$q = $q;
        this._Payment = Payment;
        this._Order = Order;
        this._Customer = Customer;
        this.paymentMethod = {};
        this._Market = Market;
        this._SubMarket = SubMarket;
    }

    changePaymentMethod(customer, hostedFieldsInstance){
        return this._PaymentService.changePaymentMethod(customer,
          hostedFieldsInstance);
    }

    clearPaymentMethodNonce(order) {
        if(order.customer.paymentMethodNonce) {
            delete order.customer.paymentMethodNonce;
        }
    }

    doesCustomerHaveSubscription(customer) {
        return angular.isDefined(customer.subscriptionId)
            && customer.subscriptionId !== null;
    }

    doesCustomerHavePaymentMethod(customer) {
        return angular.isDefined(customer.paymentMethodToken)
            && customer.paymentMethodToken !== null;
    }
    isCustomerIntegrated(customer) {
        return angular.isDefined(customer.customerId)
            && customer.customerId !== null;
    }

    saveOrder(order, hostedFieldsInstance, paymentMethodNonce) {
        let deferred = this._$q.defer();
        if(paymentMethodNonce === null &&
            (angular.isUndefined(order.customer.paymentMethodToken)
                || order.customer.paymentMethodToken ===null)) {
            this._Payment.getPaymentMethodNonce(hostedFieldsInstance).then(
                (pmNonce)=> {
                    this.setPaymentMethodNonce(order,pmNonce);
                    this._Order.save(order)
                    .then(
                    (res) => {
                        this.clearPaymentMethodNonce(order);
                        deferred.resolve(res);
                        return res;
                    },
                    (error)=>{
                        console.log(error);
                        deferred.reject(error);
                    });
                }
            );
        }
        else {
            this._Order.save(order)
            .then(
            (res) => {
                deferred.resolve(res);
                return res;
            },
            (error)=>{
                deferred.reject(error);
                console.log(error);
            });
        }

        return deferred.promise;
    }

    setPaymentMethodNonce(order, paymentMethodNonce) {
        order.customer.paymentMethodNonce = paymentMethodNonce.nonce;
    }

    updateCustomerWithPaymentMethod(order, paymentMethod){
        this.paymentMethod = paymentMethod;
        return this._Customer.get(order.customer._id).then((res)=>{
            let customer = res;
            customer.paymentMethodToken = this.paymentMethod.token;
            return this._Customer.update(customer);
        });
    }

    getMarketFromCustomer(customer) {
        let deferred = this._$q.defer();
        // Always, make sure to check both market and submarket
        let defaultMarket = customer.defaultMarket._id ? customer.defaultMarket._id : customer.defaultMarket;

        this._SubMarket.get(defaultMarket).then((response) => {
            if (response) {
                deferred.resolve(response);
            } else {
                this._Market.get(defaultMarket).then((response)=>{
                    deferred.resolve(response);
                },
                (error)=>{
                    deferred.reject(error);
                });
            }
        },
        (error)=>{
            this._Market.get(defaultMarket).then((response)=>{
                deferred.resolve(response);
            },
            (error)=>{
                deferred.reject(error);
            });
        });


        return deferred.promise;
    }
}

SharedOrderHelperService.$inject = ['AppConstants', '$http', '$q', 'Payment',
    'Order', 'Customer', 'Market', 'SubMarket'];
export default SharedOrderHelperService;
