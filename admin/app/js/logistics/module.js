import angular from 'angular';

import LogisticsController from './overview/logistics.controller.js';

import AgentOpsController from './agent_ops/controllers/agent_ops.controller.js';
import AgentOpsOrdersListController from './agent_ops/controllers/agent_ops.orders.list.controller.js';
import AgentOpsOrdersCalendarController from './agent_ops/controllers/agent_ops.orders.calendar.controller.js';

import LogisticsConfig from './logistics.config.js';

import AgentOpsOrdersService from './agent_ops/services/agent_ops.orders.service.js';


angular
	.module('closetboxAdmin.logistics', [])

	.controller('LogisticsController', LogisticsController)

	.controller('AgentOpsController', AgentOpsController)
	.controller('AgentOpsOrdersListController', AgentOpsOrdersListController)
	.controller('AgentOpsOrdersCalendarController', AgentOpsOrdersCalendarController)

	.service('AgentOpsOrdersService', AgentOpsOrdersService)

	.config(LogisticsConfig);
