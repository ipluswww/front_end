import controller from './prospect-table.controller.js'

let ProspectTable = {
	bindings: {
		list: '=',
		options: '=',
		total: '<',
		onSelect: '&',
		onReload: '&'	
	},
	controller: controller,
	controllerAs:'$ctrl',
	templateUrl: 'templates/prospect/components/prospect-table.component.html'
};

export default ProspectTable;
