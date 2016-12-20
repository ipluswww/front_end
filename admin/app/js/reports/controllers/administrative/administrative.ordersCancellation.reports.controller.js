import ReportsController from '../reports.controller.js';
class AdministrativeOrdersCancellationReportController  extends ReportsController{

    constructor ($state, $q, Market, Reporting, User, $interval, AlertService, AppConstants){
        super ($state, $q, Market, Reporting, User, $interval, AlertService, AppConstants);

        this.init();
    }

    init () {
        this.reportingName = "adminOrdersCancellation";
        this.reportType = "ordersCancellation"
        super.init();
    }
}

AdministrativeOrdersCancellationReportController.$inject = ['$state', '$q', 'Market', 'Reporting', 'User', '$interval', 'AlertService', 'AppConstants'];
export default AdministrativeOrdersCancellationReportController;