import controller from './default-payment-method.controller.js'

let DefaultPaymentMethod = {
	bindings: {
		braintreeCustomer: '<',
        paymentMethod:'<'
	},
  controller: controller,
  controllerAs:'defaultPaymentMethod',
	templateUrl: 'templates/orders/shared/component/default-payment-method.component.html'
};



export default DefaultPaymentMethod;
