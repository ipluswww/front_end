import controller from './subscription-summary.controller.js'

let SubscriptionSummary = {
	bindings: {
		order: '<',
		currentlyStoredInventory: '<'
	},
	controller: controller,
	controllerAs: 'subscriptionSummary',
	templateUrl: 'templates/orders/shared/component/subscription-summary.component.html'
};

export default SubscriptionSummary;
