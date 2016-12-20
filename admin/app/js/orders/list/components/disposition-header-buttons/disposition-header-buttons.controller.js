import _ from 'lodash';
class DispositionHeaderButtonsController {
    constructor($state, $stateParams, User, Order, OrdersValidationService, AppConstants, $mdDialog, AlertService) {
        this._$state = $state;
        this._$stateParams = $stateParams;
        this._User = User;
        this._Order = Order;
		this._OrdersValidationService = OrdersValidationService;
		this._AppConstants = AppConstants;
        this._$mdDialog = $mdDialog;
        this._AlertService = AlertService;
        this.init();
    }

    init() {

    }

	// UI helper: detect if the button is eligible to be displayed
	//_________________________________________________________________________
	canOrderBeChangedToCreated(){
		return this.order !== null && this.isDispositionDifferentAndEligible(this.order, this._AppConstants.dispositions.created);
	}
	canOrderBeChangedToScheduled(){
		return this.order !== null &&
        this.isDispositionDifferentAndEligible(this.order, this._AppConstants.dispositions.scheduled);
	}

	canOrderBeChangedToInTransit() {
		return this.order !== null && this.isDispositionDifferentAndEligible(this.order, this._AppConstants.dispositions.inTransit);
	}

	canOrderBeChangedToAccepted() {
		return this.order !== null
        && this.isDispositionDifferentAndEligible(this.order, this._AppConstants.dispositions.accepted);
	}

	canOrderBeChangedToCancelled() {
		return this.order !== null && this.isDispositionDifferentAndEligible(this.order, this._AppConstants.dispositions.cancelled);
	}

	canOrderBeChangedToPaymentHold() {
		return this.order !== null && this.isDispositionDifferentAndEligible(this.order, this._AppConstants.dispositions.paymentHold);
	}
	canOrderBeChangedToCompleted() {
		return this.order !== null && this.isDispositionDifferentAndEligible(this.order, this._AppConstants.dispositions.completed);
	}

    isDispositionDifferentAndEligible(order, toDisposition){
        return toDisposition !== order.disposition && this._OrdersValidationService.isEligibleForDisposition(order, toDisposition);
    }
	//_________________________________________________________________________



	// Create Order button click event handler
	goToCreateOrderWizard() {
		const params = _.cloneDeep(this._$stateParams);
		const back = {
			name: this._$state.current.name,
			params: _.assign(params, {id: this.order._id})
		};
        if (this._OrdersValidationService.isPickup(this.order))
			this._$state.go("app.orders.pickup.detail",
                {id:this.order._id, back});
		else
			this._$state.go("app.orders.delivery.detail",
                {id:this.order._id, customerId:this.order.customer._id, back});
    }


	// complete button click event handler
	completeOrder() {
		const self = this;
		this._$mdDialog.show({
			controller: 'ConfirmModalController as  $ctrl',
			templateUrl: '../../../templates/shared/_confirm_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose: false,
			locals: {
				title: 'Warning',
				textContent: 'Are you sure you would like to change this order to COMPLETED disposition?'
			}
		}).then((data) => {
			this._Order.changeDisposition(this.order, this._AppConstants.dispositions.completed).then((res) => {
				self.order = res;
				self._AlertService.success("The order has been successfully marked as '" + this._AppConstants.dispositions.completed + "'");
			});
		});

	}


	// schedule button click event handler
	scheduleOrder() {
		const self = this;
		if (this.order.disposition === this._AppConstants.dispositions.inTransit) {
			// for in transit status, we have some other handling
			this._$mdDialog.show({
				controller: 'ConfirmModalController as  $ctrl',
				templateUrl: '../../../templates/shared/_confirm_dialog.html',
				parent: angular.element(document.body),
				clickOutsideToClose: false,
				locals: {
					title: 'Warning',
					textContent: 'Are you sure you would like to change this order to SCHEDULED disposition?'
				}
			}).then((data) => {
				this._Order.changeDisposition(this.order, this._AppConstants.dispositions.scheduled).then((res) => {
                    self.order = res;
                    self._AlertService.success("The order has been successfully marked as '" + this._AppConstants.dispositions.scheduled + "'");
				});
			});
		} else {
			// from accept => scheduled won't have any other handling
			this._Order.changeDisposition(this.order, this._AppConstants.dispositions.scheduled).then((res) => {
                self.order = res;
                self._AlertService.success("The order has been successfully marked as '" + this._AppConstants.dispositions.scheduled + "'");
			});
		}
	}
	// accept order button click event handler
	acceptOrder() {
		const self = this;
		this._Order.changeDisposition(this.order, this._AppConstants.dispositions.accepted).then((res) => {
            self.order = res;
            self._AlertService.success("The order has been successfully marked as '" + this._AppConstants.dispositions.accepted + "'");
		});
	}
    // cancel button click event handler
    cancelOrder () {
		const self = this;
		this._$mdDialog.show({
			controller: 'CancelDialogController as  $ctrl',
			templateUrl: '../../../templates/shared/_cancel_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose: false
		}).then((data) => {
			this._Order.changeDisposition(this.order, this._AppConstants.dispositions.cancelled).then((res) => {
                self.order = res;
                self._AlertService.success("The order has been successfully marked as '" + this._AppConstants.dispositions.cancelled + "'");
			});
		});
	}

    // pay hold button click event handler
	payHoldOrder() {
		const self = this;

		this._$mdDialog.show({
			controller: 'ConfirmModalController as  $ctrl',
			templateUrl: '../../../templates/shared/_confirm_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose: false,
			locals: {
				title: 'Warning',
				textContent: 'Are you sure you would like to change this order to PAYMENT HOLD disposition?'
			}
		}).then((data) => {
			this._Order.changeDisposition(this.order, this._AppConstants.dispositions.paymentHold).then((res) => {
                self.order = res;
                self._AlertService.success("The order has been successfully marked as '" + this._AppConstants.dispositions.paymentHold + "'");
			});
		});
	}

	// inTransit button click event handler
	inTransitOrder() {
		const self = this;
		this._Order.changeDisposition(this.order, this._AppConstants.dispositions.inTransit).then((res) => {
            self.order = res;
            self._AlertService.success("The order has been successfully marked as '" + this._AppConstants.dispositions.inTransit + "'");
		});
	}
};

DispositionHeaderButtonsController.$inject = ['$state', '$stateParams', 'User', 'Order', 'OrdersValidationService', 'AppConstants', '$mdDialog', 'AlertService'];

export default DispositionHeaderButtonsController;
