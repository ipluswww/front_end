import _ from 'lodash';
class ConvertDialogController {
    constructor ($mdDialog) {
        this._$mdDialog = $mdDialog;
    }


	cancel() {
		this._$mdDialog.cancel();
	}

    confirm(reason) {
		this._$mdDialog.hide(reason);
	}
}

ConvertDialogController.$inject = [ '$mdDialog'];
export default ConvertDialogController;
