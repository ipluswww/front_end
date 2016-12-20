import _ from 'lodash';
import moment from 'moment';
import AbstractController from '../../abstract/abstract.controller.js';
class  HomeAgentOrdersEditController extends AbstractController {

	constructor ($q, $scope, $state, Order, User, Customer, $mdDialog, $mdToast, $window, SelectedOrderService){
		// First need to check if it is alright to be accessed this url.
		// In order to prevent user to access the url by entering the urlmanually.
		super($q, User, $state, $mdDialog, $mdToast, $window);

		// Override parent property with controller specific variable
		this._allowedRoles = ['ROLE_USER', 'ROLE_ADMIN'];
		this.parentID = "homeAgentList";

		// service assignment
		this._$scope = $scope;
		this._Service = Order;
		this._Customer = Customer;
		this._User = User;
		this._SelectedOrderService = SelectedOrderService;
		this.init();
	}

	init () {
		if (!super.init()) return false;

		// Controller variables
		this.inNewNote = false; // creating a new note status

		let self = this;

		this.containerTypes = ['box', 'unboxed', 'furniture'];
		const unbindOrderWatch = this._$scope.$watch(() => this._SelectedOrderService.get(), (newValue) => {
			self.data = _.cloneDeep(newValue);
			self.groupedInventories = self._Service.getSortedInventories(self.data);
		});

		this._$scope.$on('$destroy', () => {
            unbindOrderWatch();
        });
        
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
			this.provideFeedback("The note has successfully been updated.");
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
				this.provideFeedback("The note has successfully been udpated.");
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
			this.provideFeedback("The note has successfully been updated.");
		});
	}
	// Note related functions
	//________________________________________________________________________

	// Upload realted functions
	//________________________________________________________________________
	uploadAgentManifest(file) {
		if (file) {
			this._Service.addAgentManifest(this.data._id, file, this._User.current._id).then((res) => {
				this.data.agentManifests = res.agentManifests;
				this.provideFeedback("The agent manifest has succcessfully been uploaded.");

				this._SelectedOrderService.set(this.data);
			});
		}
	}

	removeAgentManifest(agentManifest) {
		var confirm = this._$mdDialog.confirm()
			.textContent('Are you sure you want to delete this file?')
			.ok('Yes')
			.cancel('No');
		this._$mdDialog.show(confirm).then(() => {
			this._Service.removeAgentManifest(this.data._id, agentManifest._id).then((res) => {
				this.data.agentManifests = res.agentManifests;
				this.provideFeedback("The agent manifest has succcessfully been removed.");

				this._SelectedOrderService.set(this.data);
			});
		});
	}

	displayAgentManifest(agentManifest) {
		const created = moment.utc(agentManifest.dateCreated);
		let fileName = _.last(agentManifest.url.split('/'));
		fileName = fileName.substring(fileName.indexOf('_') + 1);
		return `${fileName} / ${agentManifest.user.username} / ${created.format('MMM DD,YYYY hh:mm A')}`;
	}
}

HomeAgentOrdersEditController.$inject = ['$q', '$scope', '$state', 'Order', 'User', 'Customer', '$mdDialog', '$mdToast', '$window', 'SelectedOrderService'];
export default HomeAgentOrdersEditController;
