import angular from 'angular';
import client from 'braintree-web/client';
import hostedFields from 'braintree-web/hosted-fields';
import _ from 'lodash';

const HOSTED_FIELDS_STYLES= {
	  'input': {
		'font-size': '14pt',
		'height':'25px'
	  },
	  'input.invalid': {
		'color': 'red'
	  },
	  'input.valid': {
		'color': 'green'
	  }
	};

const HOSTED_FIELDS = {
  number: {
	selector: '#card-number',
	placeholder: '#### #### #### ####'
  },
  cvv: {
	selector: '#cvv',
	placeholder: '###'
  },
  expirationDate: {
	selector: '#expiration-date',
	placeholder: 'MM / YYYY'
  }
};

class Payment {
	constructor(AppConstants, $http, $q) {
		this.baseAPIURL = AppConstants.api + "/payments";
		this._$http = $http;
        this._$q = $q;
	}

	changePaymentMethod(customer, hostedFieldsInstance) {
        let deferred = this._$q.defer();
        this.getPaymentMethodNonce(hostedFieldsInstance).then(
            (paymentMethodNonce)=> {
                let customerWithNonce = {
                    customerId: customer.customerId,
                    paymentMethodNonce: paymentMethodNonce.nonce
                };
                this._$http.post(
                        this.baseAPIURL + '/customers/change-payment-method',
                        customerWithNonce)
                    .then(
                    (res) => {
                        deferred.resolve({ customer: res.data });
                        return res.data;
                    },
                    (error)=>{
                    }
                );
            }
        );
        return deferred.promise;
    }

	createCustomerInVault(braintreeCustomerWithNonce) {
		return this._$http.post(
				this.baseAPIURL + '/createCustomerInVault',
				braintreeCustomerWithNonce);
	}

    createCustomerInVaultWithPaymentMethod(customer, hostedFieldsInstance) {
        let deferred = this._$q.defer();
        this.getPaymentMethodNonce(hostedFieldsInstance).then(
            (paymentMethodNonce)=> {
                let customerWithNonce = {
                    customer: customer,
                    paymentMethodNonce: paymentMethodNonce.nonce
                };
                this.createCustomerInVault()
				.then(
				(res) => {
					deferred.resolve({ customer: res.data });
					return res.data;
				},
				(error)=>{
				});
            }
        );
        return deferred.promise;
    }

	getClientToken() {
  	  return this._$http.get(this.baseAPIURL + '/client_token');
    }

	getCustomer(braintreeCustomerId) {
		return this._$http.get(this.baseAPIURL +  '/btCustomers/' + braintreeCustomerId)
		.then(
			// On success...
			(res) => {
				return res.data;
			}
		);
	}

	getDefaultPaymentMethod(braintreeCustomer) {
		return _.find(braintreeCustomer.paymentMethods, (paymentMethod) => {
			return paymentMethod.default;
		});
	}

    getHostedFieldsInstance() {
        let deferred = this._$q.defer();
        this.getClientToken()
        .then((response)=> {
          client.create({
            authorization: response.data.clientToken
        }, (clientErr, clientInstance) => {
            if (clientErr) {
					deferred.reject();
              	return;
            }

            hostedFields.create({
              client: clientInstance,
              styles: HOSTED_FIELDS_STYLES,
              fields: HOSTED_FIELDS
          }, (hFieldsErr, hFieldsInstance) => {
              deferred.resolve(hFieldsInstance);
            });
          });
      }, (error)=> {
		  deferred.reject();
      });
      return deferred.promise;

    }

    getPaymentMethodNonce(hostedFieldsInstance) {
        var deferred = this._$q.defer();

        hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
            if (tokenizeErr) {
				deferred.reject(tokenizeErr.name + ' - ' + tokenizeErr.message);
				return;
            }
            let nonce = payload.nonce;
            deferred.resolve({ nonce });
        });
        return deferred.promise;
      }

    isDefaultPaymentMethodExpired(braintreeCustomer){
       if(!braintreeCustomer) return false;

        let paymentMethod = this.getDefaultPaymentMethod(braintreeCustomer);
        if(!paymentMethod) return false;

        return paymentMethod.expired;
    }

    getDefaultPaymentMethod(braintreeCustomer) {
        return _.find(braintreeCustomer.paymentMethods, (paymentMethod) => {
            return paymentMethod.default;
        });
    }
	updatePaymentMethod(paymentMethodToken, paymentMethodNonce){
		return this._$http.put(this.baseAPIURL +  '/paymentMethods/'
			+ paymentMethodToken, {paymentMethodNonce: paymentMethodNonce});
	}

}

Payment.$inject = ['AppConstants', '$http', '$q'];
export default Payment;
