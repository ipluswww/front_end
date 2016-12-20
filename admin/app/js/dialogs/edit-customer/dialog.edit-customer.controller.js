class EditCustomerDialogCtrl {

	constructor(AlertService, Customer, $mdDialog, user, continueResp) {
		this._AlertService = AlertService;
		this._Customer = Customer;
		this._$mdDialog = $mdDialog;
		this.continueResp = continueResp;
		this.user = {
			_id: user._id,
			name: user.name,
			email: user.email,
			mobile: user.mobile,
			status: user.status
		};
		this.statuses = ['Active', 'Inactive', 'Prospect'];
	}

	cancel() {
		this._$mdDialog.cancel();
	}

	save() {
		this._Customer
			.update(this.user)
			.then(res => this._$mdDialog.hide(this.continueResp))
			.catch(err => {
				this._AlertService.error(err.data.error || 'Error updating customer.');
				this._$mdDialog.cancel();
			});
	}
}

EditCustomerDialogCtrl.$inject = ['AlertService', 'Customer', '$mdDialog', 'user', 'continueResp'];

export default EditCustomerDialogCtrl;
