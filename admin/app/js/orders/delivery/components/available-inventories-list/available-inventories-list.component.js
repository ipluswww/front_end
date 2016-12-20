import controller from './available-inventories-list.controller.js'

let AvailableInventoriesList = {
	bindings: {
		order: "<",
		currentlyStoredInventory: "<",
		onItemAddedToDelivery: "&",
		warehouseLocations:'<',
		isLocked:'<'
	},
    controller: controller,
    controllerAs:'$ctrl',
	templateUrl: 'templates/orders/delivery/component/available-inventories-list.component.html'
};



export default AvailableInventoriesList;
