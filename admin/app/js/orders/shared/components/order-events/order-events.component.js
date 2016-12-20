import controller from './order-events.controller';

let OrderEvents = {
	controller: controller,
	templateUrl: 'templates/orders/shared/component/order-events.component.html',
	bindings: {
		order: '<'
	}
};

export default OrderEvents;
