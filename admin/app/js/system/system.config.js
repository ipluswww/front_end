let SystemConfig = function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('app.system', {
			abstract: true,
			url: '/system',
			template: '<ui-view />'
		})
		.state('app.system.access', {
			url: '/access',
			templateUrl: 'templates/system/access.html',
			title: 'Access',
			controller: 'AccessController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			}
		});
};

SystemConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default SystemConfig;
