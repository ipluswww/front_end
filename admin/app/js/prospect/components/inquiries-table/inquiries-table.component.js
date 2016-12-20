import controller from './inquiries-table.controller.js'

let InquiriesTable = {
	bindings: {
		list: '=',
		options: '=',
		total: '<',
		onReload: '&'	
	},
	controller: controller,
	controllerAs:'$ctrl',
	templateUrl: 'templates/prospect/components/inquiries-table.component.html'
};

export default InquiriesTable;
