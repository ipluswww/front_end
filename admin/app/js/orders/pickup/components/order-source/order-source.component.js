import controller from './order-source.controller.js'

let OrderSource = {
	bindings: {
		order: '=',
		isLocked:'<'
	},
	controller: controller,
	controllerAs: '$ctrl',
	templateUrl: 'templates/orders/pickup/component/order-source.component.html'
};

export default OrderSource;
