import _ from 'lodash';
class ParentMarketModalcontroller {
	constructor(Market, $mdDialog, data) {
		this._Service = Market;
		this._$mdDialog = $mdDialog;

		this.selected = null;
		if (data && data._id) this.selected = data._id;
		this.init();
	}

	init  () {
		// Init varialble
		this._Service.allActive().then( (res) => {
			this.totalData = res;
		})
	}

	// Helper functions
	//------------------------------------------------------------------------------------------------------------------


	cancel() {
		this._$mdDialog.cancel();
	}

	confirm() {
		this._$mdDialog.hide({data: _.find(this.totalData, {'_id': this.selected})});
	}

}

ParentMarketModalcontroller.$inject = ['Market', '$mdDialog', 'data'];
export default ParentMarketModalcontroller;
