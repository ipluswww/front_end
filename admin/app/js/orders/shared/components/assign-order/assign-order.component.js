import controller from './assign-order.controller.js'

let AssignOrder = {
	bindings: {
		order: '=',
		visitor: '='
	},
    controller: controller,
    controllerAs:'$ctrl',
	templateUrl: 'templates/orders/shared/component/assign-order.component.html'
};

export default AssignOrder;
