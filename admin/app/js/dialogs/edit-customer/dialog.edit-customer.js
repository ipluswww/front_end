import BaseDialog from '../base/dialog.base';

class EditCustomerDialog extends BaseDialog {

	constructor($mdDialog, $rootScope) {
		const getDefaultOptions = () => {
			return {
				templateUrl: 'templates/dialogs/dialog.edit-customer.html',
				scope: $rootScope.$new(true),
				escapeToClose: false,
				locals: {
					user: null,
					continueResp: null
				},
				controller: 'EditCustomerDialogCtrl',
				controllerAs: '$ctrl'
			}
		};
		super($mdDialog, getDefaultOptions);
		this.getDefaultOptions = getDefaultOptions;
	}

	withUser(user) {
		this.options.locals.user = user;
		return this;
	}

	withContinueResp(resp) {
		this.options.locals.continueResp = resp;
		return this;
	}
}

EditCustomerDialog.$inject = ['$mdDialog', '$rootScope'];

export default EditCustomerDialog;
