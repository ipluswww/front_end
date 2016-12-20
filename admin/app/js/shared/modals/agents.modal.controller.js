import _ from 'lodash';
// Used From
//   - warehouse create/edit
class AgentsModalController {
	constructor(Agent, $mdDialog, data) {
		this._Service = Agent;
		this._$mdDialog = $mdDialog;

		this.selected = null;
		if (data && data._id) this.selected = data._id;
		this.init();
	}

	init  () {
		// Init varialble
		this._Service.all().then( (res) => {
			this.totalData = res.data;
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

AgentsModalController.$inject = ['Agent', '$mdDialog', 'data'];
export default AgentsModalController;
