import _ from 'lodash';
class  AccessController {

	constructor ($q, User, Admin, Person, Customer, Role, Zones, Market, Warehouse, $mdDialog,
				 AlertService, AppConstants, EditCustomerDialog) {
		window._accessCtrl = this;
		this._$q = $q;
		this._User = User;
		this._Admin = Admin;
		this._Person = Person;
		this._Customer = Customer;
		this._Zones = Zones;
		this._$mdDialog = $mdDialog;
		this._Role = Role;
		this._Market = Market;
		this._Warehouse = Warehouse;
		this._AlertService = AlertService;
		this._AppConstants = AppConstants;
		this._EditCustomerDialog = EditCustomerDialog;

		this.init();
	}

	init () {
		// Init common variables, Summary of variables.
		// valid only for user tab(administrator)
		this.userTab = {
			readonly:  true,
			selectedRow: null,
			promise: null
		}; // User tab
		this.customerTab = {
			readonly:  true,
			selectedRow: null,
			promise: null
		}; // User tab
		this.user = null; // administrator object for right hand side
		this.customer = null; // customer object
		this.clonedUser = null; // the server data, acts as backup object for this.user
		this.clonedCustomer = null; // the server data, acts as backup object for this.customer

		this.totalMarkets = null; // holding all Markets record
		this.totalWarehouses = null; // holding all warehouses record

		// Rest user object with default
		this.resetUserObject();

		this.timezones = this._Zones.get(); // Timezone control list


		// Params for Admin api to get Admin
		this.admin = {
			query: {
				sort: "",
				limit: 10,
				page: 1,
				skip: 0,
				search: null
			},
			selected: null
		};
		this.getAdmins(this.admin.query);


		// Custoemrs
		// Params for Admin api to get Admin
		this.customer = {
			query: {
				sort: "",
				limit: 10,
				page: 1,
				skip: 0,
				search: null
			}
		};

		this.getCustomers(this.customer.query);

		// Call to authorities for roles list
		this._Role.all().then( (res) => {
			this.roles = res;
		});


		// Call to markets
		this._Market.all().then( (res) => {
			this.totalMarkets = res;
		});

		// Call to warehouses
		this._Warehouse.all().then( (res) => {
			this.totalWarehouses = res;
		});

		// Roles for agent user
		this.agentRoles = [this._AppConstants.roles.agent, this._AppConstants.roles.user];
	}


	// Admin users table helper methods
	//------------------------------------------------------------------------------------------------------------------
	// Only valid for pagination controls
	onPagination (page, limit) {
		let $ctrl = window._accessCtrl; // TODO: get rid of this dirty hack
		let query = JSON.parse(JSON.stringify($ctrl.admin.query));
		query.page = page;
		query.limit = limit;
		$ctrl.getAdmins(query);
	}


	onSearch() {
		this.getAdmins(this.admin.query);
	}

	// column order
	onOrder(order) {
		let $ctrl = window._accessCtrl; // TODO: get rid of this dirty hack
		let query = JSON.parse(JSON.stringify($ctrl.admin.query));
		query.sort = order;
		$ctrl.getAdmins(query);
	}



	//------------------------------------------------------------------------------------------------------------------

	onCustomerPagnination (page, limit) {
		let $ctrl = window._accessCtrl; // TODO: get rid of this dirty hack
		let query = JSON.parse(JSON.stringify($ctrl.customer.query));
		query.page = page;
		query.limit = limit;
		$ctrl.getCustomers(query);
	}


	onCustomerSearch() {
		this.getCustomers(this.customer.query);
	}

	// column order
	onCustomerOrder(order) {
		let $ctrl = window._accessCtrl; // TODO: get rid of this dirty hack
		let query = JSON.parse(JSON.stringify($ctrl.customer.query));
		query.sort = order;
		$ctrl.getCustomers(query);
	}

	//------------------------------------------------------------------------------------------------------------------

	// call back function after pagination and column order
	getAdmins (query) {
		let deferred = this._$q.defer();
		this.userTab.promise = deferred.promise;

		this._Admin.all(query).then( (res) => {
			this.admins = res.data;
			this.admin.count = res.count;
			deferred.resolve();
		});
	}


	// call back function after pagination and column order
	getCustomers (query) {
		let deferred = this._$q.defer();
		this.customerTab.promise = deferred.promise;


		this._Customer.list(query).then( (res) => {
			this.customers = res.data;
			this.customer.count = res.count;
			deferred.resolve();
		});
	}


	// table row click select function
	onRowSelect (record) {
		this.userTab.readonly = true; // force readonly mode when switching between users.
		this.userTab.selectedRow = _.cloneDeep(record);
		// Now populates right hand side panel
		this._Admin.get(record._id).then( (res) => {
			res.roles = _.uniq(res.roles);
			this.user = _.clone(res);
			this.clonedUser = _.clone(res);

			// translate some properties.
			this.prepareUserObject();
		});
	}

	// table row click select function for Customer Tab
	onCustomerRowSelect (record) {
		// Now populates right hand side panel
		this.customer._id = record._id;
		this.customerTab.selectedRow = _.cloneDeep(record);
	}


	//------------------------------------------------------------------------------------------------------------------


	// User tab helper function
	//------------------------------------------------------------------------------------------------------------------
	// translating the raw object from API
	prepareUserObject () {
		// We are going to prepare only for valid user object.
		if (!this.user || !this.user._id || this.user._id == 'new') return;


		// translate timezone as well
		let zoneRecord = _.find(this.timezones, {'hour': this.clonedUser.timeZoneHour});
		this.user.timezone = this.clonedUser.timeZoneHour;
		this.user.timezoneLabel = zoneRecord ? zoneRecord.name : '';
	}

	// reset User object, for create, revert it to blank, for exsiting edit, revert it to post-api state.
	resetUserObject () {
		if (!this.user || this.user._id == null) {
			this.user = {
				_id: null,
				roles: [],
				markets: [],
				allMarkets: false,
				warehouseLocation: [],
				allWarehouses: false
			};
		} else {
			this.user = _.clone(this.clonedUser);
			this.prepareUserObject();
		}
	}



	// Event Handlers for right hand side
	//------------------------------------------------------------------------------------------------------------------
	// User save
	saveUser() {
		let adminObj = _.cloneDeep(this.user);
		// Pre-Save Admin Object
		adminObj.timeZoneHour = adminObj.timezone;
		if (adminObj.allMarkets) adminObj.markets = null;
		if (adminObj.allWarehouses) adminObj.warehouseLocation = null;
		// to reduce the payload.
		adminObj.markets = _.map(adminObj.markets, '_id');
		adminObj.warehouseLocation = _.map(adminObj.warehouseLocation, '_id');
		// TODO, uncomment the below line once we have api support for associated Agent
		if (this.user._id == 'new') {
			delete adminObj._id;
			this._Admin
				.create(adminObj)
				.then( admin => {
					this.cancelEdit();
					this.getAdmins(this.admin.query);
					this._AlertService.success("A new admin has been created successfully!");
					if (adminObj.agent) {
						const personObj = { _id: admin.person, agentId: adminObj.agent._id };
						this._Person
							.update(personObj)
							.then(person => this.onRowSelect(admin));
					} else this.onRowSelect(admin);
				})
				.catch(err => this._AlertService.error(err.data.error || "Error while creating a new admin."));
		} else {
			this._Admin
				.update(adminObj)
				.then(admin => {
					this.cancelEdit();
					this.getAdmins(this.admin.query)
					this._AlertService.success("The admin has been updated successfully!");
					this.clonedUser = adminObj;
					// we probably won't need this, but let's leave it for now.
					this.clonedUser.warehouseLocation = _.cloneDeep(this.user.warehouseLocation);
					this.clonedUser.markets = _.cloneDeep(this.user.markets);
					let personObj = { _id: admin.person._id, agentId: adminObj.agent ? adminObj.agent._id : null };
					this._Person
						.update(personObj)
						.then(() => this.onRowSelect(admin));
				})
				.catch(err => this._AlertService.error(err.data.error || 'Error while updating user.'));
		}


	}

	// Delete User
	deleteUser() {
		let self = this;
		if (this.user._id) {

			this._$mdDialog.show({
				controller: 'ConfirmModalController as  $ctrl',
				templateUrl: 'templates/shared/_confirm_dialog.html',
				parent: angular.element(document.body),
				clickOutsideToClose: false,
				locals: {
					title: 'Warning',
					textContent: `Please confirm you want to delete user <${this.userTab.selectedRow.fullName}> with email address <${this.userTab.selectedRow.person.email}>`
				}
			}).then((data) => {
				self._Admin.delete(self.user._id).then( (res) => {
					self._AlertService.success("An administrator has been deleted successfully");
					self.user._id = null;
					self.getAdmins(self.admin.query);
				}, (err) => {
					self._AlertService.error(`${err.data.error} : ${err.data.message}` || "Error while deleting user.");
				});
				self.cancelEdit();
			});
		}
	}


	// Delete Customer
	deleteCustomer() {
		let self = this;
		if (this.customer._id) {
			var confirm = this._$mdDialog.confirm()
				.title('Warnning')
				.textContent('Warning: Please confirm you want to delete customer <' + this.customerTab.selectedRow.name + '> with email address <' + this.customerTab.selectedRow.email + '>')
				.ok('Confirm')
				.cancel('Cancel');
			this._$mdDialog.show(confirm).then(function() {
				self._Customer.delete(self.customer._id).then( (res) => {
					self._AlertService.success("A customer has been deleted successfully");
				}, (err) => {
					self._AlertService.error(err.data.error || "Error while deleting customer.");
				});
				self.customer._id = null;
				self.getCustomers(self.customer.query);
			}, function() {
			});
		}
	}



	// Prepare the form for a new administrator
	createNew() {
		this.user = {_id: null};
		this.resetUserObject();
		this.user._id = 'new';
		this.userTab.readonly = false;
	}

	// User tab cancel button click event handler
	cancelEdit() {
		if (this.profileForm) {
			this.profileForm.$setPristine();
			this.profileForm.$setUntouched();
		}
		this.userTab.readonly = true;
		this.resetUserObject();
	}

	//------------------------------------------------------------------------------------------------------------------




	// Event handlers which will open modals
	//------------------------------------------------------------------------------------------------------------------

	// Edit Markets button handler
	openMarketsDialog() {
		this._$mdDialog.show({
			controller: 'MarketsModalController as $ctrl',
			templateUrl: 'templates/shared/_market_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose:false,
			locals: { markets: this.user.markets }
		}).then( (res) => {
			this.user.markets = _.clone(res.markets);
			this.user.allMarkets = res.allMarkets;
		});
	}

	// Edit Warehouses button handler
	openWarehousesDialog() {
		this._$mdDialog.show({
			controller: 'WarehousesModalController as $ctrl',
			templateUrl: 'templates/system/access/_warehouses_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose:false,
			locals: { warehouses: this.user.warehouseLocation }
		}).then( (res) => {
			this.user.warehouseLocation = _.clone(res.warehouses);
			this.user.allWarehouses = res.allWarehouses;
		});
	}

	// Edit Agent button handler
	openAgentsDialog() {
		// check role first. ROLE_USER, ROLE_AGENT but NOT ROLE_CUSTOMER
		if (this._User.isAuthorized(['ROLE_USER', 'ROLE_AGENT'], ['ROLE_CUSTOMER']) === false) {
			this._AlertService.error("You are not authorized to associate a user with the agent.");
			return;
		}
		let self = this;
		this._$mdDialog.show({
			controller: 'AgentsModalController as $ctrl',
			templateUrl: 'templates/shared/_agent_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose:true,
			locals: { data: this.user.agent }
		}).then( (res) => {
			if (res.data) {
				self.user.agent = _.cloneDeep(res.data);
			}
		});
	}

	// Change Password Modal
	openPasswordModal(alias, objectType) {
		let user;
		if (this.customer._id) {
			user = _.find(this.customers, (cust)=>{return cust._id === this.customer._id});
		}
		else {
			user = this.user;
		}
		this._$mdDialog.show({
			controller: 'PasswordModalController as $ctrl',
			templateUrl: 'templates/system/access/_password_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose:false,
			locals: { user: user, objectType: objectType}
		}).then( () => {
			this._AlertService.success("Password has been updated successfully");
		});
	}

	openCustomerEditModal() {
		let user;
		if (this.customer._id) user = _.find(this.customers, customer => customer._id === this.customer._id);
		else user = this.user;
		this._EditCustomerDialog
			.withUser(user)
			.show()
			.then(() => {
				this._AlertService.success('Customer has been updated successfully');
				this.getCustomers(this.customer.query);
			});
	}

	//------------------------------------------------------------------------------------------------------------------



	prepareMarketsString (markets) {
		let marketNames = _.map(markets, 'market.name');
		return marketNames.join(", ");
	}


	// Checkbox list helper functions
	//----------------------------------------------------------------------------------
	// Check item is existing in the list with the proven key
	exists (item, list, key) {
		return (_.findIndex(this.user[list], (atom) => {
			return item[key] === atom;
		}) >=0);
	}

	// Adds or removes an item based on existence
	toggle (item, list, key) {
		const self = this;
		if (this.exists(item, list, key)) {
			if (_.indexOf(this.agentRoles, item[key]) >= 0) {
				var confirm = this._$mdDialog.confirm()
					.title('Warnning')
					.textContent('Warning: The associated agent will be removed also.')
					.ok('Confirm')
					.cancel('Cancel');
				this._$mdDialog.show(confirm).then(function() {
					_.remove(self.user[list], (atom) => item[key] === atom);
					self.user.agent = null;
				}, function() {
				});
			} else {
				_.remove(this.user[list], (atom) => item[key] === atom);
			}
		} else {
			this.user[list].push(item[key]);
		}
	}
	//------------------------------------------------------------------------------------------------------------------

	isAgentUser() {
		return _.intersection(this.user.roles, this.agentRoles).length === 2;
	}
}

AccessController.$inject = ['$q', 'User', 'Admin', 'Person', 'Customer', 'Role', 'Zones', 'Market',
							'Warehouse', '$mdDialog', 'AlertService', 'AppConstants', 'EditCustomerDialog'];

export default AccessController;
