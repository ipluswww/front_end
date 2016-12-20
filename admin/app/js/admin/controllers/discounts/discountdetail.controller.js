import _ from 'lodash';
import moment from 'moment';
class  DiscountDetailController {

	constructor ($state, $stateParams, $q, User, Discount, QueryData, $mdDialog, $mdToast, $window){
		this._edit = $state.current.data.edit;
		this._$state = $state;
		this._$q = $q;
		this._User = User;
		this._Service = Discount;
		this._QueryData = QueryData;
		this._id = $stateParams.id;
		this._$mdDialog = $mdDialog;
		this._$mdToast = $mdToast;
		this._$window = $window;

		this.init();
	}

	init () {
		// controller variable
		this.originalCode = null;

		if (this._id) {
			this._Service.get(this._id).then( (res) => {
				this.data= _.clone(res);
				this.originalCode = this.data.code;
			});
		} else {
			this.data = this.defaultObject();
		}


		this.types = ["PERCENT", "FIRST_MONTH_FIXED", "FIRST_MONTH_FREE"];
	}

	defaultObject () {
		return {
			code:null,
			discountPercent: 0.0,
			fixedPrice: 0.0,
			status: true,
			type: "PERCENT"
		};
	}

	// Check code duplciation.
	checkDuplication() {
		if (this.originalCode != this.data.code) {
			this._Service.search(this.data.code).then((res) => {
				this.discountForm["code"].$setValidity("server", (!res.data || res.data.length < 1));
			});
		} else {
			this.discountForm["code"].$setValidity("server", true);
		}
	}
	// Button event handler
	cancelEdit () {
		this._$state.go('app.admin.discount.list');
	}

	deleteRecord() {
		let self = this;
		if (this._id) {
			let confirm = this._$mdDialog.confirm()
				.title('Warnning')
				.textContent('Please make double sure before removing this discount.')
				.ok('Confirm')
				.cancel('Cancel');
			this._$mdDialog.show(confirm).then(function () {
				self._Service.delete(self._id).then((res) => {
					self.provideFeedback("A discount has been deleted successfully").then( () => {
						self.cancelEdit();
					});
				}, (err) => {
					self.provideFeedback("Error while deleting discount.").then( () => {
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
				this._$state.go('app.admin.discount.detail', {id: this._id});
			});
		} else {
			this._Service.create(this.data).then( (res) => {
				this._$state.go('app.admin.discount.detail', {id: res._id});
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
		var el = angular.element(document.getElementById("discountDetail"));
		this._$mdToast.show(
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
		this._QueryData.setQuery('discounts', null);
		this._$state.go('app.admin.discount.list');
	}
}

DiscountDetailController.$inject = ['$state', '$stateParams', '$q', 'User', 'Discount', 'QueryData', '$mdDialog', '$mdToast', '$window'];
export default DiscountDetailController;
