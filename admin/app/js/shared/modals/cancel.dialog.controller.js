import _ from 'lodash';
class CancelDialogController {
    constructor ($mdDialog, order, number) {
        this._$mdDialog = $mdDialog;
        this.init();
    }

    init() {
        // Main controller variables 
        this.reasons = [];
        this.allReasons = [
            "Availability", 
            "Customer Situation",
            "Duplicate Order",
            "No Longer Needed",
            "No Response",
            "Price",
            "Same Day",
            "Short Term"
        ];
    }


	// Helper functions
	//------------------------------------------------------------------------------------------------------------------

	// Checkbox list helper functions
	//----------------------------------------------------------------------------------
	// Check item is existing in the list with the proven key
	exists (item) {
		return (this.reasons.indexOf(item) >=0);
	}

	// Adds or removes an item based on existence
	toggle (item) {
		if (this.exists(item)) {
			_.remove(this.reasons, item);
		} else {
			this.reasons.push(item);
		}
	}


	cancel() {
		this._$mdDialog.cancel();
	}

    confirm() {
        // On exit we are going to generate the reason object based on user selection
        let obj = {};
        _.forEach(this.allReasons, (reason) => {
            obj[reason] = this.exists(reason);
        });
		this._$mdDialog.hide(obj);
	}
}

CancelDialogController.$inject = [ '$mdDialog'];
export default CancelDialogController;
