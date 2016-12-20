import controller from './customer-email-lookup.controller.js'

let SpacePrice = {
	bindings: {
    	order:'<',
		isLocked:'<',
		onCustomerUpdated: '&'
	},
	controller: controller,
	controllerAs:'customerEmailLookup',
	templateUrl: 'templates/orders/shared/component/customer-email-lookup.component.html'
};

export default SpacePrice;
