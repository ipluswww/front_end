import controller from './zipcode-lookup.controller.js'

let ZipcodeLookupComponent = {
	bindings: {
    	order:'<',
		isLocked:'<',
		onZipUpdated: '&',
		currentlyStoredInventory:'<'
	},
  	controller: controller,
  	controllerAs: 'zipcodeLookup',
	templateUrl: 'templates/orders/shared/component/zipcode-lookup.component.html'
};

export default ZipcodeLookupComponent;
