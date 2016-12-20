import authInterceptor from './app.interceptor.js';
let appConfig = function ($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider, AppConstants) {
	$httpProvider.defaults.headers.common = {};
	$httpProvider.defaults.headers.post = {};
	$httpProvider.defaults.headers.put = {};
	$httpProvider.defaults.headers.patch = {};
	// Push our interceptor for auth
	$httpProvider.interceptors.push(authInterceptor);

	$stateProvider
		.state('app', {
			abstract: true,
			templateUrl: 'templates/app-view.html',
			resolve:{
				auth: function(User) {
					return User.verifyAuth(false);
				}
			}
		});
	$urlRouterProvider.otherwise('/login');

	uiGmapGoogleMapApiProvider.configure({
		key: AppConstants.googleApiKey,
		v: '3.25', //defaults to latest 3.X anyhow
		libraries: 'weather,geometry,visualization'
	});
//  disable temporarily for development purpose	
//	$locationProvider.html5Mode(true);
};

appConfig.$inject = ['$httpProvider', '$stateProvider', '$locationProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider', 'AppConstants'];

export default appConfig;
