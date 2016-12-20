import _ from 'lodash';
class ScheduleModalController {
	constructor (User, Order, $mdDialog, AlertService, order) {
		this._User = User;
		this._Order = Order;
		this._$mdDialog = $mdDialog;
		this._AlertService = AlertService;
		this._order = order;
		this.init();
	}

	init() {
		if (this._order.acceptedDate) {
			this.acceptedDate = new Date(this._order.acceptedDate);
		} else {
			this.acceptedDate = new Date();
		}
	}

	// select requested date,
	// TODO: need to check if this conversion is also taking place.
	// am => 12:00 am, pm => 12:00 pm
	selectRequestedDate(index) {
		this.acceptedDate = new Date(this._order["requestedDate" + index]);
	}

	upperRangeTime() {
		if (this.acceptedDate) {
			let upperRange = new Date(_.cloneDeep(this.acceptedDate));
			return moment(upperRange).add(2, 'hours').format("hh a");
		}
		return "";
	}

	cancel() {
		this._$mdDialog.hide();
	}

	// The purpose of this dialog, accept the order
	acceptOrder() {
		let self = this;
		// make double sure that we have acceptedDate
		if (!this.acceptedDate) return;
		// in case it is invalid to accept the order, we display the feedback.
		if (["REQUESTED", "SCHEDULED", "IN-TRANSIT", "COMPLETED", "RECONCILED", "PAYMENT_HOLD"].indexOf(this._order.disposition) >= 0) {
			this.provideFeedback("You are not allowed to change or update the actual scheduled date");
		} else {

			let dateString = moment(this.acceptedDate).format("DD/MM/YY");
			let hourRange  = moment(this.acceptedDate).format("hh a") + " and " + moment(this.acceptedDate).add(2, 'hours').format("hh a");

			// make double sure
			var confirm = this._$mdDialog.confirm()
				.textContent('You are about to officially accept this order with this scheduled date ' + dateString + ' between ' + hourRange + '. Please confirm?')
				.ok('Yes')
				.cancel('No');


			this._$mdDialog.show(confirm).then(() => {
				// only for "CREATED" and "UPDATED"
				if (["CREATED", "UPDATED"].indexOf(self._order.disposition) >= 0) {
					// prepare the updating object
					let obj = {
						_id: self._order._id,
						disposition: "ACCEPTED",
						acceptedDate: self.acceptedDate
					};
					// updating
					self._Order.update(obj).then( (res) => {
						self._AlertService.success("The prospect has been marked as accepted.");
						self._order.disposition = "ACCEPTED";
						self._order.acceptedDate = _.cloneDeep(self.acceptedDate);
					}, (err) => {
						if (err && err.data) self._AlertService.error(err.data.message || "The prospect has been marked as accepted.");
					} );

				}
			}, () => {
			});
		}
	}
}

ScheduleModalController.$inject = ['User', 'Order', '$mdDialog', 'AlertService', 'order'];
export default ScheduleModalController;
