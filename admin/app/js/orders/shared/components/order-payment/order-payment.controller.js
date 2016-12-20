import _ from 'lodash';
class OrderPaymentController {
	constructor(User, Transaction, AlertService, $mdDialog) {
		this._User = User;
		this._Transaction = Transaction;
		this._AlertService = AlertService;
		this._$mdDialog = $mdDialog;
		this.init();
	}


	init () {
		const self = this;
		this.isWithdraw = true;
		this.amount = null;
		this.payment = {};
	}

	changeMode(value) {
		if (!value) return;
		this.isWithdraw = value;
	}

	process(form) {
		if (this.order && this.order.customer) {
			if (this.isWithdraw) {
				this._Transaction.createTransactionForCustomer(this.order.customer._id, this.payment)
				.then(res => {
					if (res.success) {
						this.init();
						form.$setPristine();
						form.$setUntouched();
						this._AlertService.success("Transaction is completed successfully!");
					} else {
						this._AlertService.error(res.message || "Failed to process");
					}
				});
			}
		}
	}

	displayPaymentMethodForm() {
		this._$mdDialog.show({
			parent: angular.element(document.body),
			clickOutsideToClose: true,
			template: `
				<md-dialog aria-label="Billing Table">
					<md-toolbar>
						<div class="md-toolbar-tools">
							<h2>Adjust Credit Card</h2>
							<span flex></span>
							<md-button class="md-icon-button" ng-click="$ctrl.cancel()">
								<i class="material-icons">clear</i>
							</md-button>
						</div>
					</md-toolbar>
					<md-dialog-content>
						<div class="md-dialog-content">
							<cb-payment-method flex customer='$ctrl.customer'
								hosted-fields-instance="$ctrl.hostedFieldsInstance"
								payment-method-nonce="$ctrl.paymentMethodNonce"
								is-locked="$ctrl.isLocked"></cb-payment-method>
						</div>
					</md-dialog-content>
				</md-dialog>
			`,
			locals: {
				customer: this.order.customer
			},
			controller: function($scope, $mdDialog, customer) {
				this.customer = customer;
				this.hostedFieldsInstance = null;
				this.paymentMethodNonce = null;
				this.isLocked = false;
				this.cancel = function() {
					$mdDialog.cancel();
				}
			},
			controllerAs: "$ctrl"
		});
	}
}

OrderPaymentController.inject = ['User', 'Order', 'AlertService', '$mdDialog'];

export default OrderPaymentController;