class ProcessingDialogCtrl {
	constructor($scope, $mdDialog) {
		this._$scope = $scope;
		this._$mdDialog = $mdDialog;
		this.isProcessing=false;
		this.init();
	}


	init () {
		const unbindStateChangeStart = this._$scope.$on('$stateChangeStart', (event) => {
			if (!event.defaultPrevented) this.openModal();
		});

		const unbindStateChangeSuccess = this._$scope.$on('$stateChangeSuccess', () => this.closeModal());
		const unbindStateChangeError = this._$scope.$on('$stateChangeError', () => this.closeModal());
		const unbindBeginProcessing = this._$scope.$on('beginProcessing', () => this.openModal());
		const unbindEndProcessing = this._$scope.$on('endProcessing', () => this.closeModal());

		this._$scope.$on('$destroy', () => {
			unbindStateChangeStart();
			unbindStateChangeSuccess();
			unbindStateChangeError();
			unbindBeginProcessing();
			unbindEndProcessing();
		});
	}

	openModal() {
		if(!this.isProcessing) {
			this.isProcessing = true;
			this._$mdDialog.show({
				template: '<h4 class="text-center">Processing...</h4>',
				parent: angular.element(document.body)
			});
		}
	}

	closeModal() {
		this._$mdDialog.hide();
		this.isProcessing = false;
	}

}

ProcessingDialogCtrl.$inject = ['$scope', '$mdDialog']

let ProcessingDialog = function () {
	return {
		controller: ProcessingDialogCtrl
	};

};

export default ProcessingDialog ;
