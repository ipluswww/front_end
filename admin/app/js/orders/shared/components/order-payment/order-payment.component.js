import controller from './order-payment.controller';

let OrderPayment = {
	controller: controller,
	templateUrl: 'templates/orders/shared/component/order-payment.component.html',
	bindings: {
		order: '<'
	}
};

export default OrderPayment;
