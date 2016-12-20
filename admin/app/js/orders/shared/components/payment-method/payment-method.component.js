import controller from './payment-method.controller.js'

let PaymentMethod = {
	bindings: {
		customer:'<',
		braintreeCustomer:'<',
		paymentMethodNonce:'=',
		hostedFieldsInstance:'=',
		isLocked:'<',
		onPaymentMethodUpdated:'&'
	}, 
  controller: controller,
  controllerAs:'paymentMethod',
	templateUrl: 'templates/orders/shared/component/payment-method.component.html'
};



export default PaymentMethod;
