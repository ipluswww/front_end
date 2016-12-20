import angular from 'angular';

import ReportsController from './controllers/reports.controller.js';
import AdministrativeOrdersReportController from './controllers/administrative/administrative.orders.reports.controller.js';
import AdministrativeCustomersReportController from './controllers/administrative/administrative.customers.reports.controller.js';
import AdministrativeOrdersCancellationReportController from './controllers/administrative/administrative.ordersCancellation.reports.controller.js';

import ReportingService from './services/reporting.service.js';

import ReportConfig from './report.config.js';

angular
	.module('closetboxAdmin.report', [])

	.controller('ReportsController', ReportsController)
	.controller('AdministrativeOrdersReportController', AdministrativeOrdersReportController)
	.controller('AdministrativeCustomersReportController', AdministrativeCustomersReportController)
	.controller('AdministrativeOrdersCancellationReportController', AdministrativeOrdersCancellationReportController)

	.service('Reporting', ReportingService)

	.config(ReportConfig);
