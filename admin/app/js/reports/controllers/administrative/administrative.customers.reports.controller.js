import ReportsController from '../reports.controller.js';
class  AdministrativeCustomersReportsController  extends ReportsController{

	constructor ($state, $q, Market, Reporting, User, $interval, AlertService, AppConstants){
		super ($state, $q, Market, Reporting, User, $interval, AlertService, AppConstants);

		this.init();
	}

	init () {
		this.reportingName = "adminCustomers";
		this.reportType = "customers"
		super.init();
	}
}

AdministrativeCustomersReportsController.$inject = ['$state', '$q', 'Market', 'Reporting', 'User', '$interval', 'AlertService', 'AppConstants'];

export default AdministrativeCustomersReportsController;