import controller from './space-price-display.controller.js'

let SpacePriceDisplay = {
	bindings: {
		order: '<',
		storageUnits:'<',
		isFinal: '<',
		onStorageUnitChanged:'&',
		isLocked:'<'
	},
	controller: controller,
	controllerAs: '$ctrl',
	templateUrl: 'templates/orders/shared/component/space-price-display.component.html'
};

export default SpacePriceDisplay;
