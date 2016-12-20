import _ from 'lodash';
import moment from 'moment';
class  ParameterDetailController {

	constructor ($state, $stateParams, $q, User, Parameter, QueryData, $mdDialog, $mdToast, $window){
		this._edit = $state.current.data.edit;
		this._$state = $state;
		this._$q = $q;
		this._User = User;
		this._Service = Parameter;
		this._QueryData = QueryData;
		this._id = $stateParams.id;
		this._$mdDialog = $mdDialog;
		this._$mdToast = $mdToast;
		this._$window = $window;

		this.init();
	}

	init () {
		this.originalCode = null;
		if (this._id) {
			this._Service.get(this._id).then( (res) => {
				this.data= _.clone(res);
				this.data.value = parseFloat(this.data.value);
				this.originalCode = this.data.name;
			});
		} else {
			this.data = this.defaultObject();
		}

	}

	defaultObject () {
		return {
			name: null,
			value: null
		};
	}
	// Check code duplciation.
	checkDuplication() {
		if (this.originalCode != this.data.name) {
			this._Service.search(this.data.name).then((res) => {
				this.parameterForm["name"].$setValidity("server", (!res.data || res.data.length < 1));
			});
		} else {
			this.parameterForm["name"].$setValidity("server", true);
		}
	}

	// Button event handler
	cancelEdit () {
		this._$state.go('app.admin.parameter.list');
	}

	saveData() {
		if(this._id) {
			this._Service.update(this.data).then( (res) => {
				this._$state.go('app.admin.parameter.detail', {id: this._id});
			});
		} else {
			this._Service.create(this.data).then( (res) => {
				this._$state.go('app.admin.parameter.detail', {id: res._id});
			});
		}
	}

	deleteRecord() {
		let self = this;
		if (this._id) {
			let confirm = this._$mdDialog.confirm()
				.title('Warnning')
				.textContent('Please make double sure before removing this parameter.')
				.ok('Confirm')
				.cancel('Cancel');
			this._$mdDialog.show(confirm).then(function () {
				self._Service.delete(self._id).then((res) => {
					self.provideFeedback("A parameter has been deleted successfully").then(self.cancelEdit);
				}, (err) => {
					self.provideFeedback("Error while deleting parameter.").then(self.cancelEdit);
				});
			}, function () {
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
		var el = angular.element(document.getElementById("parameterDetail"));
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
		this._QueryData.setQuery('parameters', null);
		this._$state.go('app.admin.parameter.list');
	}

}

ParameterDetailController.$inject = ['$state', '$stateParams', '$q', 'User', 'Parameter', 'QueryData', '$mdDialog', '$mdToast', '$window'];
export default ParameterDetailController;
