import _ from 'lodash';
class ConfirmModalController {
    constructor ($mdDialog, title, textContent) {
        this._$mdDialog = $mdDialog;
        this.title = title;
        this.textContent = textContent;
    }

    init() {
    }

	cancel() {
		this._$mdDialog.cancel();
	}

    confirm() {
		this._$mdDialog.hide(true);
	}
}

ConfirmModalController.$inject = [ '$mdDialog', 'title', 'textContent'];
export default ConfirmModalController;
