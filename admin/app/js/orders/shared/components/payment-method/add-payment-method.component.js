import controller from './add-payment-method.controller.js'

let AddPaymentMethod = {
	bindings: {
		paymentMethodToken: '<',
		paymentMethodNonce:'=',
		hostedFieldsInstance:'=',
		onPaymentMethodChanged:'&',
		onPaymentMethodCancelled:'&'
	},
  controller: controller,
  controllerAs:'addPaymentMethod',
  templateUrl: 'templates/orders/shared/component/add-payment-method.component.html'
};



export default AddPaymentMethod;
