class AlertService {
	constructor($mdToast, $mdDialog) {
		this._$mdToast = $mdToast;
        this._$mdDialog = $mdDialog;
		this.allMarkets = null;
	}

	success(message){
        return this._$mdToast.show(this._getStandardConfig(message));
    }

    error(message) {
        return this._$mdToast.show(
            this._getStandardConfig(message).theme('error-toast')
        );
    }

    _getStandardConfig(message) {
        return this._$mdToast
            .simple()
            .textContent(message)
            .position('bottom right')
            .hideDelay(1000);
    }
}

AlertService.$inject = ['$mdToast', '$mdDialog'];
export default AlertService;
