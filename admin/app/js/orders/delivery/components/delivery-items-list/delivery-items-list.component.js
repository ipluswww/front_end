import controller from './delivery-items-list.controller.js'

let DeliveryItemsList = {
	bindings: {
		order: "=",
		filter: "<",
		currentlyStoredInventory: "<",
		isLocked:"<",
		onItemRemoved:'&'

	},
    controller: controller,
    controllerAs:'$ctrl',
	templateUrl: 'templates/orders/delivery/component/delivery-items-list.component.html'
};



export default DeliveryItemsList;
