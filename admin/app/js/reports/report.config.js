let ReportConfig = function ($stateProvider, $urlRouterProvider, Reporting) {
	$stateProvider
		.state('app.reports', {
			url: '/reports',
			templateUrl: 'templates/report/main.html',
			title: 'Reports',
			controller: 'ReportsController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				},
				allMarkets: function(Market) {
					return Market.allActive().then((res) => {
						return res.data;
					});
				}
			}
		})


	;

};

ReportConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default ReportConfig;
