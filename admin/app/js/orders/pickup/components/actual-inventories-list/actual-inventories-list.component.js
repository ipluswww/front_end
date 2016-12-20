import controller from './actual-inventories-list.controller.js'

let ActualInventoriesList = {
	bindings: {
		order: '<',
		selected: '=',
		onDataUpdated: '&',
		onErrorFeedback: '&',
		isLocked:'<'
	},
    controller: controller,
    controllerAs:'$ctrl',
	templateUrl: 'templates/orders/pickup/component/actual-inventories-list.component.html'
};



export default ActualInventoriesList;
