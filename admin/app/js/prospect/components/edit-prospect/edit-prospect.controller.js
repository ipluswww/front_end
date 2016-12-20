import _ from 'lodash';
import moment from 'moment';
class  ProspectEditController {

	constructor ($q, $scope, $state, $stateParams, Order, User, Customer, $mdDialog,
		$window, SelectedProspectService, OrdersValidationService, AlertService){
		// First need to check if it is alright to be accessed this url.
		// In order to prevent user to access the url by entering the urlmanually.
		// super($q, User, $state, $mdDialog, $mdToast, $window);

		// Override parent property with controller specific variable
		this._allowedRoles = ['ROLE_USER', 'ROLE_ADMIN'];
		this.parentID = "prospect";

		// service assignment
		this._$scope = $scope;
        this._$state = $state;
        this._$stateParams = $stateParams;
        this._$mdDialog = $mdDialog;
		this._Service = Order;
		this._Customer = Customer;
		this._User = User;
		this._SelectedProspectService = SelectedProspectService;
		this._OrdersValidationService = OrdersValidationService;
        this._AlertService = AlertService;
		this.init();
	}

	init () {
		// if (!super.init()) return false;

		this.bookmarkList = [
			{
				domSelector: "#orderID",
				iconClass: "vertical_align_top",
				tooltip: "Back to top"
			},
			{
				domSelector: "#orderNote",
				iconClass: "speaker_notes",
				tooltip: "Jump to Notes section"
			},
			{
				domSelector: "#orderEvent",
				iconClass: "event",
				tooltip: "Jump to Events section"
			}
		];

		// Controller variables
		this.inEdit = false; // show if we are in Edit mode
		this.inNewNote = false; // creating a new note status

		this.groupedInventories = [];

		let self = this;
		this.containerTypes = ['box', 'unboxed', 'furniture'];
		// Dirty variable mapping, but hope it to work
		const unbindOrderWatch = this._$scope.$watch(() => this._SelectedProspectService.get(), (newValue) => {
			self.data = _.cloneDeep(newValue);
			self.groupedInventories = self._Service.getSortedInventories(self.data);
		});

		this._$scope.$on('$destroy', () => {
            unbindOrderWatch();
        });
        

	}


	// close panel
	closePanel() {
		this.inEdit = false;
        this.onClosePanel();
	}

	// UI button click event handler _______________________________________________________________________________
	// Edit Prospect button click handler
	triggerEditMode() {
		this.inEdit = true;
	}

	// TABLE UI interaction helpers-----------------------------------------------------------------------------------
	openPhoneCallModal() {
		let self = this;
		this._$mdDialog.show({
			controller: 'PhoneActionModalController as  $ctrl',
			templateUrl: '../../../templates/shared/_phone_action_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose: true,
			locals: {number: this.data.customer.mobile, order: this.data, _Service: this._Service}
		}).then((data) => {
			// after closing phone call modal
			self.data = data.data;
		});
	}

	// Assign user, just `assign to me` or `clear assignment`
	assignUser(boolean) {
		let obj = {
			_id: this.data._id,
			assigned: null,
			assignedDate: null
		};
		if (boolean === true) {
			obj = {
				_id: this.data._id,
				assigned: this._User.current._id,
				assignedDate: new Date()
			};
		}

		this._Service.update(obj).then((res) => {
			this._AlertService.success("The records has been successfully updated with assigned information.");
		});
	}

	// action button: email1 and email2
	toggleEmail(field) {
		let self = this;
		let object = {_id: self.data._id};
		let fieldSent = field + "Sent";
		let fieldUsername = field + "Username";
		if (self.data[fieldSent]) {
			// if we are going to unset the existing called flag, first make double sure.
			var confirm = this._$mdDialog.confirm()
				.textContent('Are you sure you want to disable the ' + field + ' flag?')
				.ok('Yes')
				.cancel('No');
			this._$mdDialog.show(confirm).then(function() {
				// once confirm, call to api.
				self.data[fieldSent]= null;
				self.data[fieldUsername] = null;
				// reduce the payload as much as possible, only required information shall be sent.
				object[fieldSent] = self.data[fieldSent];
				object[fieldUsername] = self.data[fieldUsername];

				self._Service.update(object).then((res) => {
					self._AlertService.success("The record has been successfully updated with the " + field + " information.");
				});
			}, function() {
			});

		} else {
			// In case there was no `called` flag set.
			self.data[fieldSent] = new Date();
			self.data[fieldUsername]= this._User.current.username;

			// reduce the payload as much as possible, only required information shall be sent.
			object[fieldSent] = self.data[fieldSent];
			object[fieldUsername] = self.data[fieldUsername];
			this._Service.update(object).then((res) => {
				self._AlertService.success("The record has been successfully updated with the " + field + " information.");
			});
		}

	}

	// Cancel icon click event handler
	// open cancel reason modal first and allow user to choose the reason
	// also event update should be considered
	cancelItem () {
		const self = this;
		this._$mdDialog.show({
			controller: 'CancelDialogController as  $ctrl',
			templateUrl: '../../../templates/shared/_cancel_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose: false
		}).then((data) => {
			let object = {
				_id: this.data._id,
				disposition: "CANCELLED",
				reasonCancellationDisposition: data
			};

			this._Service.update(object).then((res) => {
				self._AlertService.success("The record has been successfully marked as 'canceled'").then(self.closePanel());
			});

		});

	}

	// customer email unique check
	checkDuplicate() {
		let originalData = this._SelectedProspectService.get();
		if (originalData.customer.email != this.data.customer.email) {
			this._Customer.validate(this.data.customer.email).then((res) => {
				this.prospectForm["email"].$setValidity("server", res.data.valid || false);
			});
		} else {
			this.prospectForm["email"].$setValidity("server", true);
		}
	}

	// change zipcode will search for market and also agent?


	// Note related functions
	//________________________________________________________________________
	editNote(note) {
		note.inEdit = true;
	}

	saveNote($index) {
		// first make sure to close all the ones.
		_.forEach(this.data.notesObj, (atom) => {
			atom.inEdit = false;
		});
		// first for the safety reason, person to ObjectID

		let data = _.cloneDeep(this.data.notesObj);
		data = _.map(data, (atom, i) => {
			let dateCreated = atom.dateCreated;
			if (i === $index) dateCreated = new Date();
			return {
				text: atom.text,
				person: atom.person._id,
				dateCreated: dateCreated
			};
		});

		this._Service.update({_id: this.data._id, notesObj: data}).then((res) => {
			this._AlertService.success("The note has successfully been udpated.");
		});
	}

	deleteNote(note, $index) {
		var confirm = this._$mdDialog.confirm()
			.textContent('Are you sure you want to delete this note?')
			.ok('Yes')
			.cancel('No');
		let self = this;
		this._$mdDialog.show(confirm).then(() => {
			self.data.notesObj.splice($index, 1);
			// For security, avoid _id
			let data = _.cloneDeep(this.data.notesObj);
			data = _.map(data, (atom, i) => {
				return {
					text: atom.text,
					person: atom.person._id,
					dateCreated: atom.dateCreated
				};
			});
			// save to the server
			this._Service.update({_id: this.data._id, notesObj: data}).then((res) => {
				this._AlertService.success("The note has successfully been udpated.");
			});
		});
	}


	// Trigger creating a new note
	createNote() {
		// first make sure to close all the ones.
		_.forEach(this.data.notesObj, (atom) => {
			atom.inEdit = false;
		});

		this.newNoteText = "";
		this.inNewNote = true;
	}

	// save the new note
	createNewNote() {
		this.inNewNote = false;

		this.data.notesObj.push({
			text: this.newNoteText,
			dateCreated: new Date(),
			person: _.cloneDeep(this._User.current)
		});
		// For security, avoid _id
		let data = _.cloneDeep(this.data.notesObj);
		data = _.map(data, (atom, i) => {
			return {
				text: atom.text,
				person: atom.person._id,
				dateCreated: atom.dateCreated
			};
		});
		// save to the server
		this._Service.update({_id: this.data._id, notesObj: data}).then((res) => {
			this._AlertService.success("The note has successfully been udpated.");
		});
	}
	// Note related functions
	//________________________________________________________________________


	createOrder() {
		const params = _.cloneDeep(this._$stateParams);
		const back = {
			name: this._$state.current.name,
			params: _.assign(params, {id: this.data._id})
		};

		if(this._OrdersValidationService.isPickup(this.data)) {
			this.closePanel();
			this._$state.go('app.orders.pickup.detail', {id: this.data._id, back});
		}
		else {
			this.closePanel();
			this._$state.go('app.orders.delivery.detail', {id: this.data._id, back});
		}
	}



	// save button click event handler
	save() {
		// first check if the data is secure and complete
		if (!this.data.originationLocation.zipCode || this.data.originationLocation.zipCode.length !== 5) {
			this._AlertService.success("Please make sure to input valid zipcode.");
			return;
		}
		let promises = [];
		const self = this;
		let data = _.cloneDeep(this._SelectedProspectService.get());
		// First check if the customer information has been changed.
		let customerDiff = _.reduce(data.customer, function(result, value, key) {
		    return _.isEqual(value, self.data.customer[key]) ?
		        result : result.concat(key);
		}, []);
		if (customerDiff && customerDiff.length > 0) {
			let customerObj = {_id: this.data.customer._id};
			_.forEach(customerDiff, (atom) => {
				customerObj[atom] = this.data.customer[atom];
			})
			promises.push(this._Customer.update(customerObj));
		}

		// object update
		let obj = _.cloneDeep(this.data);
		// we already updated customer object from above
		delete obj.customer;
		// also remove some unnecessary ones.
		delete obj.containers;
		delete obj.events;
		delete obj.market;
		delete obj.assigned;

		promises.push(this._Service.update(obj));


		Promise.all(promises).then( () => {
			self._AlertService.success("The prospect has successfully been updated.");
			self.inEdit = false;
		});

	}

	// if we wnat to cnacel the edit, we should reset the value as well.
	cancel() {
		this.data = _.cloneDeep(this._SelectedProspectService.get());

		this.inEdit = false;
	}


	// UI data format helper function
	sourceLabel () {
		let array = [];
		if (!this.data) return;
		if (this.data.partners == true) array.push("Partners");
		if (this.data.reservation == true) array.push("Reservation");
		return array.join(", ");
	}


}

ProspectEditController.$inject = ['$q', '$scope', '$state', '$stateParams', 'Order', 'User',
'Customer', '$mdDialog', '$window',
'SelectedProspectService', 'OrdersValidationService', 'AlertService'];
export default ProspectEditController;
