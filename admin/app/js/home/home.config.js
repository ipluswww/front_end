let HomeConfig = function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('app.home', {
			url: '/home',
			abstract: true,
			templateUrl: 'templates/home/home.html',
			title: 'Home',
			controller: 'HomeCtrl as $parentCtrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			}
		})
		.state('app.home.list', {
			url: '/list',
			templateUrl: 'templates/home/list.html',
			title: 'Home',
			controller: 'HomeAgentOrdersListController as $ctrl',
			params: {
				query: {
					sort: "-requestedDate1",
					limit: 10,
					page: 1,
					search: null
				},
				markets: null,
				assignmentFilter: [],
				availableOrdersFilter: ['pending']
			},
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				},
				data: function(User, Agent, HomeOrderHelperService, $stateParams) {
					const agentId = User.current && User.current.agent ? User.current.agent._id : null;
					const promises = [$stateParams];
					if (agentId) {
						const filter = HomeOrderHelperService.generateFilter($stateParams);
						promises.push(Agent.orders(agentId, $stateParams.query, filter));
					}
					return Promise.all(promises);
				}
			}
		})
		.state('app.home.calendar', {
			url: '/calendar',
			templateUrl: 'templates/home/calendar.html',
			title: 'Home',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			}
		});
};

HomeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default HomeConfig;
