class PasswordController {

	constructor (User, $state) {
		this._User = User; // Sahred User Service Object from services/user.service
		this._$state = $state;
	}

	initiateRequest() {
		this.isSubmitting = true;
		this._User.forgotPassword(this.formData.email).then(
			// Callback for success
			(res) => {
				this.isSubmitting = false;
			},
			// Callback for failure
			(err) => {
				this.errors = true;
				this.isSubmitting = false;
			}
		);
	}

	// The submit handler for the form
	resetPassword() {
	}
}

PasswordController.$inject = ['User', '$state'];

export default PasswordController;
