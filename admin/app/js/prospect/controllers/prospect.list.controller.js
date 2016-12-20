import _ from 'lodash';
import moment from 'moment';
import AbstractController from '../../abstract/abstract.controller.js';
class  ProspectListController extends AbstractController {

	constructor ($q, $state, User, $mdDialog, $mdToast, $window, SelectedProspectService, data){
		// First need to check if it is alright to be accessed this url.
		// In order to prevent user to access the url by entering the urlmanually.
		super($q, User, $state, $mdDialog, $mdToast, $window);

		// Override parent property with controller specific variable
		this._allowedRoles = ['ROLE_USER', 'ROLE_ADMIN'];
		this.parentID = "prospect";

		this._SelectedProspectService = SelectedProspectService;

		this.params = data[0];
		this.data = data[1].data;
		this.totalCount = data[1].count;
		this.init();
	}

	init () {
		if (!super.init()) return false;

		// for reference for edit.
		this.selectedItem = null;

		if (this.params.id) {
			const item = _.find(this.data, {_id: this.params.id})
			if (item) {
				this.selectItem(item);
			}
		}
	}

	// call back function after pagination and column order
	getData () {
		// this.selectedItem = null;
		this.selectItem(null);
		this.params.id = null;
		this._$state.go(this._$state.current, this.params, {reload: true, notify: true, inherit: false});
	}

	isProspectView () {
		return this.params.newCustomerFilter.indexOf('inquiries') < 0
	}

	selectItem(item) {
		this.selectedItem = item;
		this._SelectedProspectService.set(item);
	}

	closePanel() {
		this.selectedItem = null;
		this._SelectedProspectService.set(null);
		this.getData();
	}
}

ProspectListController.$inject = ['$q', '$state', 'User', '$mdDialog', '$mdToast', '$window', 'SelectedProspectService', 'data'];
export default ProspectListController;
