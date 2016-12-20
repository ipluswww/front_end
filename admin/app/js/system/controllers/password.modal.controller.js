const MASKED_PASSWORD_CONFIG = {
	visibilityToggleIcon:'visibility_off',
	inputType:'password'
};
const UNMASKED_PASSWORD_CONFIG = {
	visibilityToggleIcon:'visibility',
	inputType:'text'
};

class PasswordModalController {
	constructor(Admin, Customer, $mdDialog, user, objectType) {
		this._Admin = Admin;
		this._Customer = Customer;
		this._$mdDialog = $mdDialog;
		this._objectType = objectType;
		this._user = user;
		this.userFullname;
		this.userEmail;
		this.notificationLabel;
		this.shouldSendCustomerNotification=false;
		this.userForModification = {
			_id: user._id
		}
		this.init();
	}

	init() {
		if (this._objectType.toString()==='Customer'){
			this.configureForCustomer();
		}
		else {
			this.configureForUser();
		}

		this.passwordVisibilitySetting = MASKED_PASSWORD_CONFIG;
		this.confirmPasswordVisibilitySetting = MASKED_PASSWORD_CONFIG;
	}

	cancel() {
		this._$mdDialog.cancel();
	}

	configureForCustomer(){
		this.notificationLabel = 'Notify Customer';
		this.userFullName = this._user.name;
		this.userEmail = this._user.email;
	}
	configureForUser(){
		this.notificationLabel = 'Notify User';
		this.userFullName = this._user.fullName;
		this.userEmail = this._user.person.email;
	}

	confirm() {
		this.userForModification.password = this.userForModification.newpassword;
		this["_" + this._objectType].update(this.userForModification).then( () => {
			this._$mdDialog.hide();
		});
	}

	togglePasswordVisibility() {
		this.togglePasswordVisibilitySetting('passwordVisibilitySetting');
	}

	toggleConfirmPasswordVisibility() {
		this.togglePasswordVisibilitySetting('confirmPasswordVisibilitySetting');
	}

	togglePasswordVisibilitySetting(passwordFieldName) {
		if(this[passwordFieldName]===MASKED_PASSWORD_CONFIG) {
			this[passwordFieldName] = UNMASKED_PASSWORD_CONFIG;
		}
		else {
			this[passwordFieldName] = MASKED_PASSWORD_CONFIG;
		}
	}

	toggleNotificationOption() {
		this.shouldSendCustomerNotification=!this.shouldSendCustomerNotification;
	}
}

PasswordModalController.$inject = ['Admin', 'Customer', '$mdDialog', 'user', 'objectType'];
export default PasswordModalController;
