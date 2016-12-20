import controller from './currently-stored-count.controller.js'

let CurrentlyStoredCount = {
	bindings: {
		order: '<',
		currentlyStoredInventory:'<'
	},
    controller: controller,
    controllerAs:'currentlyStoredCount',
	templateUrl: 'templates/orders/shared/component/currently-stored-count.component.html'
};



export default CurrentlyStoredCount;
