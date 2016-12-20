import _ from 'lodash';
class  AbstractController {

	constructor ($q, User, $state, $mdDialog, $mdToast){
		this._$q = $q;
		this._User = User;
		this._$state = $state;
		this._$mdDialog = $mdDialog;
		this._$mdToast = $mdToast;

		// Controller variable
		this._allowedRoles = null;
		this.parentID = null;
	}

	init () {
		// First and foremost, we have to check if the page is alright to be accessed with the current oles.
		if (this._User.isAuthorized(this._allowedRoles) == false) {
			this._$state.go('app.home.list');
			return false;
		}
		return true;
	}

	isAllowedEdit() {
		return this._User.isAllowedEdit();
	}


	// call back function after pagination and column order
	getData (query) {
		let deferred = this._$q.defer();
		this.promise = deferred.promise;

		let filter = this.generateFilter();

		this._Service.list(query, filter).then( (res) => {
			this.data = res.data;
			this.totalCount = res.count;
			this.query = _.clone(query);
			deferred.resolve();
		}, (err) => {
			deferred.resolve();
		});


	}

	// Helper functions
	//------------------------------------------------------------------------------------------------------------------
	// show feedback of action taken.
	provideFeedback(message) {
		var el = angular.element(document.getElementById(this.parentID));
		return this._$mdToast.show(
			this._$mdToast.simple()
				.textContent(message)
				.position('bottom right')
				.hideDelay(1000)
				.parent(el)
		);
	}

};

AbstractController.$inject = ['$q', 'User', '$state', '$mdDialog', '$mdToast'];
export default AbstractController;
