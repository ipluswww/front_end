class CustomerOrderAccountInfoController { 
	constructor(OrdersValidationService, StoredInventoryService) {
		this._OrdersValidationService = OrdersValidationService;
		this._StoredInventoryService = StoredInventoryService;
		this.fromAgent="";
		this.fromWarehouse="";
		this.init();
	}

	init(){
		if(!this._OrdersValidationService.isPickup(this.order)){
			let warehouseId = this.order.inventory[0].warehouseLocation;
			let warehouse = this.getWarehouse(warehouseId);
			this.fromAgent = warehouse.agentName;
			this.fromWarehouse = warehouse.location.address + ' ' +
				warehouse.location.zipCode;
		}
	}

	getWarehouse(warehouseLocation){
		let warehouse = _.find(this.warehouseLocations, (wl)=>{
			return wl._id = warehouseLocation;
		});
		return warehouse;
	}

	isPickup() {
		return this._OrdersValidationService.isPickup(this.order);
	}

	changeAdress() {
		this.onAddressChanged();
	}
}

CustomerOrderAccountInfoController.$inject = ['OrdersValidationService',
	'StoredInventoryService'];

export default CustomerOrderAccountInfoController;
