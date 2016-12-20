import controller from './inventory-to-capacity-display.controller.js'

let InventoryToCapacityDisplay = {
	bindings: {
		order: '<',
		currentlyStoredInventory: '<'
	},
    controller: controller,
    controllerAs:'inventoryToCapacity',
	templateUrl: 'templates/orders/shared/component/inventory-to-capacity-display.component.html'
};



export default InventoryToCapacityDisplay;
