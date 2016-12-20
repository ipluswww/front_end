import controller from './item-price-display.controller.js'

let ItemPriceDisplay = {
	bindings: {
		order: '<',
		isFinal: '<'
	},
	controller: controller,
	controllerAs:'$ctrl',
	templateUrl: 'templates/orders/shared/component/item-price-display.component.html'
};

export default ItemPriceDisplay;
