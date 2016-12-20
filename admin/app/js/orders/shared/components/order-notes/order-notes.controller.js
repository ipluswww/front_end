import _ from 'lodash';
class OrderNotesController {
	constructor(User, Order, AlertService, $mdDialog) {
		this._User = User;
		this._Order = Order;
		this._AlertService = AlertService;
		this._$mdDialog = $mdDialog;
		this.init();
	}


	init () {
		
	}

	createNote() {
		_.forEach(this.order.notesObj, (atom) => {
			atom.inEdit = false;
		});

		this.inNewNote = true;
		this.newNoteText = "";
	}

	createNewNote() {
		this.inNewNote = false;

		this.order.notesObj.push({
			text: this.newNoteText,
			dateCreated: new Date(),
			person: _.cloneDeep(this._User.current)
		});
		// For security, avoid _id
		let data = _.cloneDeep(this.order.notesObj);
		data = _.map(data, (atom, i) => {
			return {
				text: atom.text,
				person: atom.person._id,
				dateCreated: atom.dateCreated
			};
		});
		// save to the server
		this._Order.update({_id: this.order._id, notesObj: data}).then((res) => {
			this._AlertService.success('The note has successfully been saved.');
		});
	}

	editNote(note) {
		_.forEach(this.order.notesObj, (atom) => {
			atom.inEdit = false;
		});

		note.inEdit = true;
		this.inNewNote = false;
	}

	saveNote(index) {
		_.forEach(this.order.notesObj, (atom) => {
			atom.inEdit = false;
		});

		let data = _.cloneDeep(this.order.notesObj);
		data = _.map(data, (atom, i) => {
			let dateCreated = atom.dateCreated;
			if (i === index) dateCreated = new Date();
			return {
				text: atom.text,
				person: atom.person._id,
				dateCreated: dateCreated
			};
		});

		this._Order.update({_id: this.order._id, notesObj: data}).then((res) => {
			this._AlertService.success('The note has successfully been updated.');
		});
	}

	deleteNote(note, index) {
		var confirm = this._$mdDialog.confirm()
			.textContent('Are you sure you want to delete this note?')
			.ok('Yes')
			.cancel('No');
		let self = this;

		this._$mdDialog.show(confirm).then(() => {
			self.order.notesObj.splice(index, 1);

			let data = _.cloneDeep(this.order.notesObj);
			data = _.map(data, (atom, i) => {
				return {
					text: atom.text,
					person: atom.person._id,
					dateCreated: atom.dateCreated
				};
			});

			this._Order.update({_id: this.order._id, notesObj: data}).then((res) => {
				this._AlertService.success("The note has successfully been deleted.");
			});
		});
	}
}

OrderNotesController.inject = ['User', 'Order', 'AlertService', '$mdDialog'];

export default OrderNotesController;
