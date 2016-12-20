import _ from 'lodash';
class PhoneActionModalController {
	constructor (User, Order, Visitor, SMSService, AlertService, $mdDialog, $timeout, order, number, _Service, Customer) {
		this._User = User;
		this._SMSService = SMSService;
		this._Order = Order;
		this._Visitor = Visitor;
		this._Service = _Service;
		this._Customer = Customer;
		this._AlertService = AlertService;
		this._$mdDialog = $mdDialog;
		this._$timeout = $timeout;
		this._number = number;
		this._order = order;
		this.init();
	}

	// This function is going to take care of getting the list by phone number
	init() {
		// md-select model
		this.selectedNumber = this._number;

		// main variable for number
		this.phonenumber = this._number;

		// controller variable
		this.messageStatus = "ready"; // indicate the status of sending SMS, default false
		this.messageLog = []; // sms message history( displayed in scrolled wrapper )

		// Call to initialize
		this.changeNumber();
	}


	// UI event handler of md-select change number
	changeNumber () {
		this.messageLog = [];
		this.messageStatus = "ready";

		if (this.validatePhoneNumber() === false) {
			return;
		}

		// Get message history from phone number
		this._SMSService.list({
			query: {
				$or: [
					{'fromNumber': this.phonenumber},
					{'toNumber': this.phonenumber}
				]
			}
		}).then(res => {
			// refactor the response data for UI sake

			this.messageLog = _.map(res.data, (atom) => {
				return {
					sender: (atom.fromNumber === this.selectedNumber) ? 'me' : 'customer',
					datetime: atom.dateCreated,
					msg: atom.text
				};
			});
		});

	}

	// UI event handler
	// phone icon click event handler
	callNumber() {
		let promises = [];
		const self = this;

		if (this.validatePhoneNumber() === false) {
			this._AlertService.error("Invalid Phone Number");
			return;
		}
		// first go with validation.
		window.location.href="tel://"+this.phonenumber;

		// before update the server, make sure the data is eligible 
		if (this._order && this._order.customer && this._order.customer.mobile != this.phonenumber) {
			let customerData = {
				_id: this._order.customer._id,
				mobile: this.phonenumber
			};
			// in order to update the object after closing modal
			this._order.customer.mobile = this.phonenumber;
			promises.push(this._Customer.update(customerData));

		}

		if (this._order && (!this._order.called || !this._order.calledUser)) {
			// Toggle called flag of prospect
			let obj = {
				_id: this._order._id,
				called: new Date(),
				calledUser: this._User.current.username
			};

			// in order to update the object after closing modal
			this._order.called = obj.called;
			this._order.calledUser = obj.calledUser;

			promises.push(this._Service.update(obj));
		}

		// we will update both phone number of customer and prospect but not inquiry
		Promise.all(promises).then(() => {
			this._$mdDialog.hide({data: this._order});
		});

	}

	// UI event handler
	// Send SMS button click event handler
	sendSMS() {
		const self = this;
		let promises = [];
		if (this.validatePhoneNumber() === false) {
			this._AlertService.error("Invalid Phone Number");
			return;
		}

		if (!this.message || this.message.length < 1) return;
		this.messageStatus = "sending";

		let data = {
			admin: this._User.current._id,
			toPhone: this.phonenumber,
			message: this.message
		};

		// if the phonenumber has been updated from the mobile, update the record as well.
		if (this._order && this._order.customer && this._order.customer.mobile != this.phonenumber) {
			let customerData = {
				_id: this._order.customer._id,
				mobile: this.phonenumber
			};

			promises.push(this._Customer.update(customerData));
		}

		// Call to api send sms
		promises.push(this._SMSService.sendSMS(data));
		Promise.all(promises).then((res) => {
			this._AlertService.success("Successfully sent the SMS message.");
			this.messageStatus = "sent";
			this.message = "";
			this._$timeout(() =>self.changeNumber(), 3000);
		}, (err) => {
			this._AlertService.error(err.data.message || "Error sending SMS message");
			this.message = "";
			this.messageStatus = "ready";
		});

	}

	updateList() {
		if (this.validatePhoneNumber === false) return;
		this.changeNumber();
	}

	// Helper function
	validatePhoneNumber() {
		if (this.selectedNumber === 'new_number') {
			this.phonenumber = this.newNumber;
		} else {
			this.phonenumber = this.selectedNumber;
		}

		let phoneNumberString = this.phonenumber + "";
		var phoneno = /^(([(][0-9]{3}[)])|([0-9]{3}))[- ]?[0-9]{3}[- ]?[0-9]{4}$/;
		return (phoneNumberString && phoneNumberString.trim().length >= 10 && (phoneNumberString.match(phoneno)));

	}

	cancel() {
		// in order to update the object after closing modal
		if (this._order && this._order.customer && (this.validatePhoneNumber() === true)) {
			this._order.customer.mobile = this.phonenumber;
		}

		this._$mdDialog.hide({data: this._order});
	}

}

PhoneActionModalController.$inject = ['User', 'Order', 'Visitor', 'SMSService', 'AlertService', '$mdDialog', '$timeout', 'order', 'number', '_Service', 'Customer'];
export default PhoneActionModalController;
