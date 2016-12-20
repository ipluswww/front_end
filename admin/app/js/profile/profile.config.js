let ProfileConfig = function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('app.profile', {
			url: '/profile',
			templateUrl: 'templates/profile/profile.html',
			title: 'Profile',
			controller: 'ProfileController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			}
		});
};

ProfileConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default ProfileConfig;
