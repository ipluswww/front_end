import _ from 'lodash';
import moment from 'moment';
class ContainerTypeDetailController {

	constructor ($state, $stateParams, $q, User, ContainerTypes, QueryData, $mdDialog, $mdToast, $window){
		this._edit = $state.current.data.edit;
		this._$state = $state;
		this._$q = $q;
		this._User = User;
		this._Service = ContainerTypes;
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
			});
		} else {
			this.data = this.defaultObject();
		}

	}

	defaultObject () {
		return {
			name:null,
			active: true
		};
	}

	// Check code duplciation.
	checkDuplication(newValue) {
		if (this.originalName != newValue) {
			this._Service.validate(newValue).then((res) => {
				this.containerTypesForm["name"].$setValidity("server", res.valid);
			});
		} else {
			this.containerTypesForm["name"].$setValidity("server", true);
		}
	}
	// Button event handler
	cancelEdit () {
		this._$state.go('app.admin.containerTypes.list');
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
					self.provideFeedback("A container type has been deleted successfully").then( () => {
						self.cancelEdit();
					});
				}, (err) => {
					self.provideFeedback(err.data.message || "Error while deleting container type.").then(() => {
						self.cancelEdit();
					});
				});
			}, function () {
			});
		}
	}

	saveData() {
		if(this._id) {
			this._Service.update(this.data).then( (res) => {
				this._$state.go('app.admin.containerTypes.detail', {id: this._id});
			});
		} else {
			this._Service.create(this.data).then( (res) => {
				this._$state.go('app.admin.containerTypes.detail', {id: res._id});
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
		this._QueryData.setQuery('containerTypes', null);
		this._$state.go('app.admin.containerTypes.list');
	}

}

ContainerTypeDetailController.$inject = ['$state', '$stateParams', '$q', 'User', 'ContainerTypes', 'QueryData', '$mdDialog', '$mdToast', '$window'];
export default ContainerTypeDetailController;
