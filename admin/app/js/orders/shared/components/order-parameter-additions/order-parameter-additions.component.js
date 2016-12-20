import controller from './order-parameter-additions.controller.js'

let AddOns = {
	bindings: {
		order: "=",
		isLocked:'<'
	},
	controller: controller,
	controllerAs:'addOns',
	templateUrl: 'templates/orders/shared/component/order-parameter-additions.component.html'
};



export default AddOns;
