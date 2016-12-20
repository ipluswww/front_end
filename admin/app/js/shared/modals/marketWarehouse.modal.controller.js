import _ from 'lodash';
class MarketWarehouseModalController {
	constructor(Warehouse, $mdDialog, data) {
		this._Warehouse = Warehouse;
		this._$mdDialog = $mdDialog;

		this.data = _.clone(data) || [];
		this.init();
	}

	init  () {
		// Init varialble
		this._Warehouse.all().then( (res) => {
			this.allWarehouses= res.data;
		})
	}

	// Helper functions
	//------------------------------------------------------------------------------------------------------------------

	// Checkbox list helper functions
	//----------------------------------------------------------------------------------
	// Check item is existing in the list with the proven key
	exists (item, key) {
		return (_.findIndex(this.data, (atom) => {
			return item[key] === atom[key];
		}) >=0);
	}

	// Adds or removes an item based on existence
	toggle (item, key) {
		if (this.exists(item, key)) {
			_.remove(this.data, (atom) => {
				return item[key] === atom[key];
			});
		} else {
			if (this.data.length < 3) this.data.push(item);
		}
	}

	cancel() {
		this._$mdDialog.cancel();
	}

	confirm() {
		this._$mdDialog.hide({data: this.data});
	}

}

MarketWarehouseModalController.$inject = ['Warehouse', '$mdDialog', 'data'];
export default MarketWarehouseModalController;
