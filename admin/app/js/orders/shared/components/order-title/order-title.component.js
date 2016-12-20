import controller from './order-title.controller';

let OrderTitle = {
	controller: controller,
	templateUrl: 'templates/orders/shared/component/order-title.component.html',
	bindings: {
		order: '<',
		backParam: '<',
		hasExpiredDefaultPaymentMethod: '<',
		hasOrderWithPaymentHold:'<'
	},
	controllerAs:'title'
};

export default OrderTitle;
