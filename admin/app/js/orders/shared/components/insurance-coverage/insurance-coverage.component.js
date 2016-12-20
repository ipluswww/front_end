import controller from './insurance-coverage.controller.js';

let InsuranceCoverage = {
	bindings: {
		order: '<'
	},
	controller: controller,
	templateUrl: 'templates/orders/shared/component/insurance-coverage.component.html'
};

export default InsuranceCoverage;
