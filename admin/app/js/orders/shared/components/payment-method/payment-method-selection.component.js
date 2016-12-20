import controller from './payment-method-selection.controller.js'

let DefaultPaymentMethod = {
	bindings: {
		braintreeCustomer: '<',
        defaultPaymentMethod:'<',
		onDefaultPaymentMethodChanged:'&'
	},
  controller: controller,
  controllerAs:'paymentMethodSelection',
	templateUrl: 'templates/orders/shared/component/payment-method-selection.component.html'
};



export default DefaultPaymentMethod;
