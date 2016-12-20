import ReportsController from '../reports.controller.js';
class  AdministrativeOrdersReportsController  extends ReportsController{

	constructor ($state, $q, Market, Reporting, User, $interval, AlertService, AppConstants){
		super ($state, $q, Market, Reporting, User, $interval, AlertService, AppConstants);

		this.init();
	}

	init () {
		this.reportingName = "adminOrders";
		this.reportType = "orders"
		super.init();
	}
}

AdministrativeOrdersReportsController.$inject = ['$state', '$q', 'Market', 'Reporting', 'User', '$interval', 'AlertService', 'AppConstants'];
export default AdministrativeOrdersReportsController;