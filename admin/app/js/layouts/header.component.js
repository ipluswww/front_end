class AppHeaderCtrl {
	constructor(AppConstants, $scope, User, SidenavExpanded) {
		this.appName = AppConstants.appName;
		this.currentUser = User.current;
		this.username = User.current ? User.current.fullName : '';
		this.userService = User;
		this._SidenavExpanded = SidenavExpanded;
		$scope.$watch(() => User.current, (newUser) => {
			this.username = newUser ? newUser.fullName || newUser : '';
		});
		this._AppConstants = AppConstants;
		this._User = User;
	}

	logout() {
		this._SidenavExpanded.set(false);
		this.userService.logout();
	}

	isAuthorizedToOrderCreation(){
		let ROLES = this._AppConstants.roles;
		return this._User.isAuthorized([ROLES.superAdmin]) || this._User.isAuthorized([ROLES.admin])
			|| this._User.isAuthorized([ROLES.finance]);
	}
}

AppHeaderCtrl.inject = ['AppConstants', '$scope', 'User', 'SidenavExpanded'];

let AppHeader = {
	controller: AppHeaderCtrl,
	templateUrl: 'templates/layout/header.html'
};

export default AppHeader;
