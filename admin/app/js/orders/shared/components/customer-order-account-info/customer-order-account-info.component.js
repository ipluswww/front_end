import controller from './customer-order-account-info.controller.js';

let CustomerOrderAccountInfo = {
	bindings: {
		customer:'=',
		order:'=',
		isLocked:'<',
		warehouseLocations:'<',
		onAddressChanged: '&'
	},
	controller: controller,
	controllerAs:'customerInfo',
	templateUrl: 'templates/orders/shared/component/customer-order-account-info.component.html'
};

export default CustomerOrderAccountInfo;
