import controller from './customer-dropoff-pickup.controller.js'

let CustomerDropoffPickup = {
	bindings: {
		order:'=',
		isLocked:'<'
	},
	controller: controller,
	controllerAs:'customerDropoffPickup',
	templateUrl: 'templates/orders/shared/component/customer-dropoff-pickup.html'
};

export default CustomerDropoffPickup;
