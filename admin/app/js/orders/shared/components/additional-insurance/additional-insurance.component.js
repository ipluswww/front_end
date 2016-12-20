import controller from './additional-insurance.controller.js'

let AdditionalInsurance = {
	bindings: {
		order: '<',
		isLocked:'<',
		onCustomerValuationUpdated: '&'
	},
	controller: controller,
	controllerAs:'additionalInsurance',
	templateUrl: 'templates/orders/shared/component/additional-insurance.component.html'
};



export default AdditionalInsurance;
