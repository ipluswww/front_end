import angular from 'angular';

// Create the module where our functionality can attach to
let homeModule = angular.module('closetboxAdmin.home', []);

// Include our UI-Router config settings
import HomeConfig from './home.config';

// Components
import HomeOrdersTable from './components/home-orders-table/home-orders-table.component';

// Controllers
import HomeCtrl from './home.controller';

import HomeAgentOrdersListController from './agent/agent.orders.list.controller.js';
import HomeAgentOrdersEditController from './agent/agent.orders.edit.controller.js';
import HomeAgentCalendarController from './agent/agent.calendar.controller.js';
import PhoneActionModalController from '../shared/modals/phonemodal.controller.js';
import ScheduleModalController from '../shared/modals/schedulemodal.controller.js';

// Services
import SelectedOrderService from './services/selected.order.service.js';
import HomeOrderHelperService from './services/home.order.helper.service.js';

homeModule
	.component('cbHomeOrdersTable', HomeOrdersTable)

	.controller('HomeCtrl', HomeCtrl)
    .controller('HomeAgentOrdersListController', HomeAgentOrdersListController)
    .controller('HomeAgentCalendarController', HomeAgentCalendarController)
    .controller('HomeAgentOrdersEditController', HomeAgentOrdersEditController)
    .controller('PhoneActionModalController', PhoneActionModalController)
    .controller('ScheduleModalController', ScheduleModalController)

    .service('SelectedOrderService', SelectedOrderService)
    .service('HomeOrderHelperService', HomeOrderHelperService)
    .config(HomeConfig);

export default homeModule;
