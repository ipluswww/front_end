import controller from './order-inventories.controller';

let OrderInventories = {
	controller: controller,
	templateUrl: 'templates/orders/shared/component/order-inventories.component.html',
	bindings: {
		shortVersion: '@',
		inventories: '<'
	}
};

export default OrderInventories;
