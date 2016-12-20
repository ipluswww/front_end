class HomeCtrl {
	constructor(AppConstants, User, $state, $scope) {
		this.appName = AppConstants.appName;
		this.roles = User.current.roles || [];
		this._$state = $state;
		this._$scope = $scope;
		this.init();
	}

	init () {
		const self = this;
		// for now it is going to be simple role checker.
		this.isAgent = this.checkAgent();

		let statesArray = ["list", "calendar"];
		for (let i = 0; i < statesArray.length + 1; i++) {
			if (this._$state.current.name.indexOf(statesArray[i]) > 0) this.selectedIndex = i;
		}

		this._$scope.$watch(() => this.selectedIndex, function (newVal) {
			// avoid infinite loop
			if (self._$state.current.name.indexOf(statesArray[newVal]) > 0) return;
			self._$state.go("app.home." + statesArray[newVal]);
		});
	}

	checkAgent() {
		return ((this.roles.indexOf('ROLE_AGENT') >= 0) && (this.roles.indexOf('ROLE_USER') >= 0));
	}
}

HomeCtrl.$inject = ['AppConstants', 'User', '$state', '$scope'];
export default HomeCtrl;