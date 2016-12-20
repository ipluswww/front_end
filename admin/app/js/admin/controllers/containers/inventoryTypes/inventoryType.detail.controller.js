import _ from 'lodash';
import moment from 'moment';
class InventoryTypeDetailController {

	constructor ($state, $stateParams, $q, User, InventoryTypes, ContainerTypes, QueryData, $mdDialog, $mdToast, $window){

		this._edit = $state.current.data.edit;
		this._$state = $state;
		this._$q = $q;
		this._User = User;
		this._Service = InventoryTypes;
		this._ContainerTypes = ContainerTypes;
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
				this.data.containerTypeName = res.containerType && res.containerType.name ? res.containerType.name : null;
			});
		} else {
			this.data = this.defaultObject();
		}

		this._ContainerTypes.filter({active: true}).then( (res) => {
			this.containerTypesList = res.data;
		});


	}

	defaultObject () {
		return {
			name:null,
			active: false,
			estimatedWeight: 0.0,
			points: 0.0
		};
	}

	// Check code duplciation.
	checkDuplication() {
		if (this.originalName != this.data.name) {
			this._Service.validate(this.data.name).then((res) => {
				this.inventoryTypesForm["name"].$setValidity("server", res.valid);
			});
		} else {
			this.inventoryTypesForm["name"].$setValidity("server", true);
		}
	}
	// Button event handler
	cancelEdit () {
		this._$state.go('app.admin.inventoryTypes.list');
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
					self.provideFeedback("A inventory type has been deleted successfully").then( () => {
						self.cancelEdit();
					});
				}, (err) => {
					self.provideFeedback(err.data.message || "Error while deleting inventory type.").then(() => {
						self.cancelEdit();
					});
				});
			}, function () {
			});
		}
	}

	saveData() {
		this.data.containerType = _.find(this.containerTypesList, {name: this.data.containerTypeName});
		delete this.data.containerTypeName;
		if(this._id) {
			this._Service.update(this.data).then( (res) => {
				this._$state.go('app.admin.inventoryTypes.detail', {id: this._id});
			});
		} else {
			this._Service.create(this.data).then( (res) => {
				this._$state.go('app.admin.inventoryTypes.detail', {id: res._id});
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
		this._QueryData.setQuery('inventoryTypes', null);
		this._$state.go('app.admin.inventoryTypes.list');
	}

}

InventoryTypeDetailController.$inject = ['$state', '$stateParams', '$q', 'User', 'InventoryTypes', 'ContainerTypes', 'QueryData', '$mdDialog', '$mdToast', '$window'];
export default InventoryTypeDetailController;
