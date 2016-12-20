import controller from './orders-table.controller.js'

let HomeOrdersTable = {
	bindings: {
		list: '=',
		options: '=',
		total: '<',
		onSelect: '&',
		onReload: '&'
	},
	controller: controller,
	controllerAs:'$ctrl',
	templateUrl: 'templates/orders/list/components/orders-table.component.html'
};

export default HomeOrdersTable;
