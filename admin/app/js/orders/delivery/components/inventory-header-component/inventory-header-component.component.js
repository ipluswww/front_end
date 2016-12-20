import controller from './inventory-header-component.controller.js'

let InventoryHeaderComponent = {
	bindings: {
		order: "<",
		filter: "<",
		onFilterChanged: '&',
		isLocked:'<'
	},
    controller: controller,
    controllerAs:'$ctrl',
	templateUrl: 'templates/orders/delivery/component/inventory-header-component.component.html'
};



export default InventoryHeaderComponent;
