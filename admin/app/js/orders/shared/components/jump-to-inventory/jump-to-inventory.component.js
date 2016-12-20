import controller from './jump-to-inventory.controller.js'

let JumpToInventory = {
	bindings: {
		filter: "=",
		inventory: "<"
		},
    controller: controller,
    controllerAs:'jumpToInput',
	templateUrl: 'templates/orders/shared/component/jump-to-inventory.component.html'
};



export default JumpToInventory;
