import controller from './inventory-filter.controller.js'

let InventoryFilter = {
	bindings: {
		order: '<',
		selected: '=',
		onDataUpdated: '&',
		onErrorFeedback: '&',
		isLocked:'<'
	},
    controller: controller,
    controllerAs:'$ctrl',
	templateUrl: 'templates/orders/pickup/component/inventory-filter.component.html'
};



export default InventoryFilter;
