import _ from 'lodash';
import moment from 'moment';
class  ReportsController {

	constructor ($state, $q, Market, Reporting, User, $interval, AlertService, AppConstants){
		this._$state = $state;
		this._$q = $q;
		this._Market = Market;
		this._Reporting = Reporting;
		this._User = User;
		this._$interval = $interval;
		this._AlertService = AlertService;
		this._AppConstants = AppConstants;


		// sub class specific value
		this.reportingName = null;
		this.reportType = null;

	}

	init () {
		// main wrapper element ID property
		this.parentID = "reports";

		this.allMarkets = this._Market.getAllActiveMarketsFromCache();

		this.allDispositions = [
			{text: 'Prospect'},
			{text: 'Requested'},
			{text: 'Created'},
			{text: 'Updated'},
			{text: 'Accepted'},
			{text: 'Scheduled'},
			{text: 'In_Transit'},
			{text: 'Completed'},
			{text: 'Reconciled'},
			{text: 'Payment_Hold'}
		];



		// Controller Variable definition
		this.marketsFilter = null;

		// generated report id
		this.generatedID = null;
		this.reportPolling = null;

		this.isEntryMode = false;
		this.inGenerating = false;

		// url generated from backend
		this.reportURL = null;

		// Operation Reports variable
		this.latestReport = {
			runDate: null,
			runBy: "",
			createdDateRange: {
				start: moment.utc().subtract(90, 'days').toDate(),
				end: new Date()
			},
			requestedDateRange: {
				start: null,
				end: null
			},
			dispositions: _.cloneDeep(this.allDispositions),
			markets: _.cloneDeep(this.allMarkets),
			dispositionsLabel: "None",
			marketsLabel: "None"
		};

		this.newReport = {
			runDate: null,
			runBy: "",
			createdDateRange: {
				start: moment.utc().subtract(90, 'days').toDate(),
				end: new Date()
			},
			requestedDateRange: {
				start: null,
				end: null
			},
			dispositions: _.cloneDeep(this.allDispositions),
			markets: _.cloneDeep(this.allMarkets),
			dispositionsLabel: "None",
			marketsLabel: "None"
		};

		// get meta data
		this._Reporting.list(this.reportingName).then((res) => {
			if (res.data.data.length > 0) {
				let latestReport = res.data.data[0];
				this.operationReports.runBy = latestReport.user.username;
				this.operationReports.runDate = latestReport.lastUpdated;
				this.reportURL = latestReport.url;
			}
		});

		this.updateReportLabels();

	}

	refreshReport() {
		this.isEntryMode = !this.isEntryMode;

		this.updateReportLabels();
	}

	updateReportLabels() {
		let report = this.operationReports;
		// Markets Label and dispositions Label preparation
		if (report.markets && report.markets.length > 0)
			report.marketsLabel = _.map(report.markets, 'name').join(", ");
		else
			report.marketsLabel = "None";

		if (report.dispositions && report.dispositions.length > 0) {
			if (report.dispositions.length == this.allDispositions.length)
				report.dispositionsLabel = "All Dispositions";
			else
				report.dispositionsLabel = _.map(report.dispositions, 'text').join(", ");
		}
		else
			report.dispositionsLabel = "None";
	}

	// trigger generating report.
	runReport() {
		this.inGenerating = true;
		let self = this;
		let report = this.operationReports;

		// translate filters into object.
		let obj = {
			createdDateFrom: report.createdDateRange.start,
 			createdDateTo: report.createdDateRange.end,
 			orderDispositions: _.map(report.dispositions, 'text'),
 			markets: _.map(report.markets, '_id')
		};

		if (report.requestedDateRange.start) {
			obj.requestedDateFrom = report.requestedDateRange.start
		}
		this._Reporting.query(this.reportType, obj).then((res) => {
			// we have to make sure that we got the job id
			if (!res.data._id) {
				self._AlertService.error("An error occured while generating reports");
				this.inGenerating = false;
			} else {
				// store the returned id.
				self.generatedID = res.data._id;
				self.reportPolling = self._$interval(() => {
					self.getLatestReport();
				}, 3000);
			}
		}, (err) => {
			this.inGenerating = false;
			self._AlertService.error("An error occured while generating reports");
		});
	}

	// report polling, send the interval request until we get url
	getLatestReport () {
		let self = this;

		this._Reporting.get(this.generatedID).then((res) => {
			if (res.data && res.data.url) {
				// provide feedback
				self._AlertService.success("The report has successfully been generated, please download it.")
				// reset UI
				self.inGenerating = false;
				self.isEntryMode = false;
				self.updateReportLabels();
				// report meta data
				self.reportURL = res.data.url;
				self.operationReports.runDate = res.data.lastUpdated;
				self.operationReports.runBy = self._User.current.username;
				self._$interval.cancel(self.reportPolling);
			}
		});
	}

	// stop interval for now,
	// TODO: should have an api to cancel generating: POST-alpha release consideration
	cancelReport() {
		this.isEntryMode = false;
		this.inGenerating = false;
		this._$interval.cancel(this.reportPolling);
		this.updateReportLabels();
	}

	cancelEdit() {
		this.isEntryMode = false;
		this.updateReportLabels();
	}

	hasRole(reportType) {
		const ROLES = this._AppConstants.roles;
		const reportRoles = {
			administrative: [ROLES.admin, ROLES.superAdmin, ROLES.finance],
			agent: [ROLES.agent, ROLES.admin, ROLES.superAdmin, ROLES.finance],
			financial: [ROLES.superAdmin, ROLES.finance],
			marketing: [ROLES.admin, ROLES.superAdmin],
			system: [ROLES.superAdmin]
		};
		const roles = _.get(reportRoles, reportType, []);
		const userRoles = this._User.current.roles;
		if (_.indexOf(userRoles, ROLES.user).length < 0) {
			return false;
		}
		return _.intersection(roles, userRoles).length;
	} 

}

ReportsController.$inject = ['$state', '$q', 'Market', 'Reporting', 'User', '$interval', 'AlertService', 'AppConstants'];

export default ReportsController;