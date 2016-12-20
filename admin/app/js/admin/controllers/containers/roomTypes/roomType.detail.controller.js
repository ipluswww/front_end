import _ from 'lodash';
import moment from 'moment';

class RoomTypeDetailController {

	constructor ($state, $stateParams, $q, User, RoomTypes, InventoryTypes, QueryData, $mdDialog, $mdToast, $window){
		this._edit = $state.current.data.edit;
		this._$state = $state;
		this._$q = $q;
		this._User = User;
		this._Service = RoomTypes;
		this._InventoryTypes = InventoryTypes;
		this._QueryData = QueryData;
		this._id = $stateParams.id;
		this._$mdDialog = $mdDialog;
		this._$mdToast = $mdToast;
		this._$window = $window;

		this.init();
	}

	init () {
		// controller variable
		this.originalName = null;

		if (this._id) {
			this._Service.get(this._id).then( (res) => {
				this.data= _.clone(res);
				this.originalName = this.data.name;
				this.data.roomUnit = this.data.unit._id;
			});
		} else {
			this.data = this.defaultObject();
		}

		this._InventoryTypes.list({page: 1, limit: 0}, {"containerType.name": "rooms", active: true}).then( (res) => {
			this.unitList = res.data;
		});


	}

	defaultObject () {
		return {
			name:null,
			active: true
		};
	}

	// Button event handler
	cancelEdit () {
		this._$state.go('app.admin.roomTypes.list');
	}

	deleteRecord() {
		let self = this;
		if (this._id) {
			let confirm = this._$mdDialog.confirm()
				.title('Warnning')
				.textContent('Please make double sure before removing this container type.')
				.ok('Confirm')
				.cancel('Cancel');
			this._$mdDialog.show(confirm).then(function () {
				self._Service.delete(self._id).then((res) => {
					self.provideFeedback("A room type has been deleted successfully").then( () => {
						self.cancelEdit();
					});
				}, (err) => {
					self.provideFeedback(err.data.message || "Error while deleting room type.");
				});
			}, function () {
			});
		}
	}

	saveData() {
		this.data.unit = _.find(this.unitList, {'_id': this.data.roomUnit});
		delete this.data.roomUnit;


		if(this._id) {
			this._Service.update(this.data).then( (res) => {
				this._$state.go('app.admin.roomTypes.detail', {id: this._id});
			}, (err) => {
				this.provideFeedback(err.data || "Error while saving room type.");
			});
		} else {
			this._Service.create(this.data).then( (res) => {
				this._$state.go('app.admin.roomTypes.detail', {id: res._id});
			}, (err) => {
				this.provideFeedback(err.data || "Error while saving room type.");
			});
		}
	}


	// The helper function: only record created within 24 hours is deletable
	isDeletable() {
		if (this.data && this.data._id && this.data.dateCreated) {
			return (moment.utc().diff(moment.utc(this.data.dateCreated), 'hours') <= 24);
		}
		return false;
	}

	// Helper functions
	//------------------------------------------------------------------------------------------------------------------
	// show feedback of action taken.
	provideFeedback(message) {
		let el = angular.element(document.getElementById("containers"));
		return this._$mdToast.show(
			this._$mdToast.simple()
				.textContent(message)
				.position('bottom right')
				.hideDelay(3000)
				.parent(el)
		);
	}

	// Back to previous location
	backTo () {
		this._$window.history.back();
	}

	// Back to list
	backToList() {
		this._QueryData.setQuery('roomTypes', null);
		this._$state.go('app.admin.roomTypes.list');
	}
}

RoomTypeDetailController.$inject = ['$state', '$stateParams', '$q', 'User', 'RoomTypes', 'InventoryTypes', 'QueryData', '$mdDialog', '$mdToast', '$window'];
export default RoomTypeDetailController;
