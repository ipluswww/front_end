import _ from 'lodash';
class WarehousesModalController {
	constructor(Warehouse, $mdDialog, warehouses) {
		this._Warehouse = Warehouse;
		this._$mdDialog = $mdDialog;

		this.warehouses = _.clone(warehouses);
		this.init();
	}

	init  () {
		// Init varialble
		this._Warehouse.all().then( (res) => {
			this.allWarehouses = res.data;
		})
	}

	// Helper functions
	//------------------------------------------------------------------------------------------------------------------

	// Checkbox list helper functions
	//----------------------------------------------------------------------------------
	// Check item is existing in the list with the proven key
	exists (item, key) {
		return (_.findIndex(this.warehouses, (atom) => {
			return item[key] === atom[key];
		}) >=0);
	}

	// Adds or removes an item based on existence
	toggle (item, key) {
		if (this.exists(item, key)) {
			_.remove(this.warehouses, (atom) => {
				return item[key] === atom[key];
			});
		} else {
			this.warehouses.push(item);
		}
	}

	// Toggle All warehouses
	toggleAll () {
		if (this.warehouses.length === this.allWarehouses.length) {
			this.warehouses = [];
		} else {
			this.warehouses = _.clone(this.allWarehouses);
		}
	}
	//------------------------------------------------------------------------------------------------------------------


	cancel() {
		this._$mdDialog.cancel();
	}

	confirm() {
		this._$mdDialog.hide({warehouses: this.warehouses, allWarehouses: (this.warehouses.length == this.allWarehouses.length)});
	}

}

WarehousesModalController.$inject = ['Warehouse', '$mdDialog', 'warehouses'];
export default WarehousesModalController;
