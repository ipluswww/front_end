import _ from 'lodash';
import moment from 'moment';

let LogisticsConfig = function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('app.logistics', {
			abstract: true,
			url: '/logistics',
			template: '<ui-view />'
		})
		.state('app.logistics.overview', {
			url: '/overview',
			templateUrl: 'templates/logistics/overview.html',
			title: 'Logistics',
			controller: 'LogisticsController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			}
		})

		.state('app.logistics.agent_ops', {
			abstract: true,
			url: '/agent-ops',
			templateUrl: 'templates/logistics/agent_ops/agent.html',
			title: 'Agent',
			controller: 'AgentOpsController as $parentCtrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			}
		})
		.state('app.logistics.agent_ops.list', {
			url: '/list',
			templateUrl: 'templates/logistics/agent_ops/orders_list.html',
			title: 'Agent Orders',
			controller: 'AgentOpsOrdersListController as $ctrl',
			params: {
				agentId: null,
				query: {
					sort: "-requestedDate",
					limit: 10,
					page: 1,
					search: null
				},
				filter: {
					availableOrderFilter: ['pending'],
					assignmentFilter: []
				},
				filterExpanded: false
			},
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				},
				orders: function(User, Agent, $stateParams, AgentOpsOrdersService) {
					if (!$stateParams.agentId) {
						$stateParams.agentId = User.current && User.current.agent ? User.current.agent._id : null;
						if (!$stateParams.agentId) {
							return Promise.resolve({count: 0, data: []});
						}
					}
					const filter = AgentOpsOrdersService.generateListFilter($stateParams.filter.availableOrderFilter, $stateParams.filter.assignmentFilter);
					return Agent.orders($stateParams.agentId, $stateParams.query, filter);
				}
			}
		})
		.state('app.logistics.agent_ops.calendar', {
			url: '/calendar',
			templateUrl: 'templates/logistics/agent_ops/calendar.html',
			title: 'Agent Calendar',
			controller: 'AgentOpsOrdersCalendarController as $ctrl',
			params: {
				agentId: null,
				yy: moment.utc().year(),
				mm: moment.utc().month()
			},
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				},
				orders: function(User, Agent, $stateParams, AgentOpsOrdersService) {
					if (!$stateParams.agentId) {
						$stateParams.agentId = User.current && User.current.agent ? User.current.agent._id : null;
						if (!$stateParams.agentId) {
							return Promise.resolve({count: 0, data: []});
						}
					}
					const query = {limit: 0, page: 1};
					const filter = AgentOpsOrdersService.generateCalendarFilter($stateParams.yy, $stateParams.mm);
					return Agent.orders($stateParams.agentId, query, filter)
				},
				blackouts: function(User, Agent, $stateParams, AgentOpsOrdersService) {
					if (!$stateParams.agentId) {
						$stateParams.agentId = User.current && User.current.agent ? User.current.agent._id : null;
						if (!$stateParams.agentId) {
							return Promise.resolve({count: 0, data: []});
						}
					}
					const query = {limit: 0, page: 1};
					const filter = AgentOpsOrdersService.generateBlackoutsFilter($stateParams.yy, $stateParams.mm);
					return Agent.blackouts($stateParams.agentId, query, filter)
				}
			}
		});
};

LogisticsConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default LogisticsConfig;
