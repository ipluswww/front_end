let ProspectConfig = function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('app.prospect', {
			url: '/prospect',
			templateUrl: 'templates/prospect/main.html',
			title: 'Prospects',
			controller: 'ProspectListController as $ctrl',
			params: {
				id: null,
				query: {
					sort: "-requestedDate1",
					limit: 10,
					page: 1,
					search: null
				},
				markets: null,
				newCustomerFilter: ['partners', 'reservation'],
				assignmentFilter: []
			},
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				},
				data: function(Order, Visitor, ProspectHelperService, $stateParams) {
					const promises = [ $stateParams ];
					const filter = ProspectHelperService.generateFilter($stateParams);

					if (ProspectHelperService.isProspects($stateParams)) {
						promises.push(Order.list($stateParams.query, filter));
					} else {
						promises.push(Visitor.list($stateParams.query, filter));
					}

					return Promise.all(promises);
				}
			}
		})


	;

};

ProspectConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default ProspectConfig;
