import _ from 'lodash';
import AbstractController from './abstract.controller.js';
class  AdminController extends AbstractController {

	constructor ($q, User, $state, $mdDialog, $mdToast, $window){
		super($q, User, $state, $mdDialog, $mdToast, $window);
		this._allowedRoles = ['ROLE_USER', 'ROLE_ADMIN'];
	}

	init () {
		return super.init();
	}
};

AdminController.$inject = ['$q', 'User', '$state', '$mdDialog', '$mdToast', '$window'];
export default AdminController;
