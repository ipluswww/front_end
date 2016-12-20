class AuthController {

    constructor (User, $state) {
        this._User = User; // Sahred User Service Object from services/user.service
        this._$state = $state;

        this.title = $state.current.title;
        this.authType = $state.current.name.replace('app.', '');
        
        this.errors = null;
        this.serverError = false;
    }

	// Login button handler
	//---------------------------------------------------------------------------------------
    submitForm() {
        this.errors = null;
        this.serverError = false;
	    // TODO validate first
        this.isSubmitting = true;
        this._User.attemptAuth(this.authType, this.formData).then(
    	    // Callback for success
            (res) => {
	            this._$state.go('app.home.list');
            },
            // Callback for failure
            (err) => {
       	        this.isSubmitting = false;
	            if (err.data) {
		            this.errors = err.data; //.errors;
	            } else {
		            this.serverError = true;
	            }
	        }
        ).catch((reason) => {
            this.serverError = true;
        });
    }
	//---------------------------------------------------------------------------------------
}

AuthController.$inject = ['User', '$state'];

export default AuthController;
