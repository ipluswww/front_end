let AuthConfig = function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('app.login', {
			url: '/login',
			templateUrl: 'templates/auth/auth.html',
			title: 'Sign in',
			controller: 'AuthController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(false);
				}
			}
		})
		.state('app.password', {
			url: '/password',
			templateUrl: 'templates/auth/password.html',
			title: 'Sign up',
			controller: 'PasswordController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(false);
				}
			}
		});
};

AuthConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default AuthConfig;
