import _ from 'lodash';
class User {
	constructor(Base64, JWT, AppConstants, $http, $state, $q, LocalStorageService) {
		this._JWT = JWT;
		this._AppConstants = AppConstants;
		this._$http = $http;
		this._$state = $state;
		this._$q = $q;
		this._Base64 = Base64;
		this._LocalStorageService = LocalStorageService;

		// Object to store our user properties
		this.current = null;
		this.roles = null;

	}

	// Try to authenticate by registering or logging in
	attemptAuth(type, credentials) {
		let route = (type === 'login') ? '/login' :'';
		let authdata = this._Base64.encode(credentials.email+ ':' + credentials.password);

		let self = this;

		this._$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

		return this._$http({
			url:	this._AppConstants.api + route,
			method: 'GET',
			data: {
				user: credentials
			}
		}).then(
			// On success...
			(res) => {
				if (res.data && res.data.person && res.data.admin) {
					// Set the JWT token
					self._JWT.save(res.data.person.token);
					return this.verifyAuth(true).then(() => {
						return res;
					});
				} else {
					return this._$q.reject();
				}
			},

			(err) => {
				return this._$q.reject(err);
			}
		);
	}


	logout() {
		this.current = null;
		this._LocalStorageService.clear();
		// Do a hard reload of current state to ensure all data is flushed
		this._$state.go('app.login', null, { reload: true });
	}


	verifyAuth(needsAuthenticatedAndAuthorizedUser) {
		let deferred = this._$q.defer();
		let self = this;
		// Check for JWT token first
		if (!this.hasJwt()) {
			if(needsAuthenticatedAndAuthorizedUser){
				deferred.reject();
			}
			else {
				deferred.resolve(needsAuthenticatedAndAuthorizedUser);
			}
			return deferred.promise;
		}

		// If there's a JWT & user is already set
		if (this.current) {
			deferred.resolve(true);
			// If current user isn't set, get it from the server.
			// If server doesn't 401, set current user & resolve promise.
		} else {

			this._$http({
				url: this._AppConstants.api + '/profile',
				method: 'GET'
			}).then(
				(res) => {
					self.current = res.data;
					let roles = res.data.roles;
					if (roles && roles.length > 0) {
						roles =	_.uniq(_.map(roles, 'authority.authority'));
					} else {
						roles = [];
					}

					self.current.roles = roles;

					deferred.resolve(true);
				},
				// If an error happens, that means the user's token was invalid.
				() => {
					self._JWT.destroy();
					deferred.resolve(false); 
				}
				// Reject automatically handled by auth interceptor
				// Will boot them to homepage
			);
		}

		return deferred.promise;
	}

	 // This method will be used by UI-Router resolves
	ensureAuthIs(needsAuthenticatedAndAuthorizedUser) {
		let deferred = this._$q.defer();
		let self = this;
		this.verifyAuth(needsAuthenticatedAndAuthorizedUser).then((authValid) => {
			// if it's the opposite, redirect home
			if (authValid !== needsAuthenticatedAndAuthorizedUser) {
				deferred.resolve(false);
				self._$state.go('app.home.list');
			} else {
				deferred.resolve(true);
			}
		},
			()=>{
				deferred.reject();
			});

		return deferred.promise;
	}


	// get /profile request
	getProfile() {
		let self = this;
		return this._$http({
			url: this._AppConstants.api + '/profile',
			method: 'GET'
		}).then(
			(res) => {

				self.current = res.data;
				let roles = res.data.roles;
				if (roles && roles.length > 0) {
					roles =	_.uniq(_.map(roles, 'authority.authority'));
				} else {
					roles = [];
				}

				self.current.roles = roles;
				return(res);
			},
			// If an error happens, that means the user's token was invalid.
			(err) => {
				return self._$q.reject(err);
			}
		);
	}

	// called from profile page
	updateProfile(user) {
		 // Update password shall be handled in another method.
		return this._$http({
			url: this._AppConstants.api + '/profile',
			method: 'PUT',
			data: user
		}).then(
			(res) => {
				console.log(res);
				self.current = res.data;
				return res.data;
			},
			// If an error happens, that means the user's token was invalid.
			(err) => {
				return err;
			}
		);
	}

	forgotPassword(email) {

		return this._$http({
			url:	this._AppConstants.api + '/forgot',
			method: 'POST',
			data: {
				email: email
			}
		}).then(
			// On success...
			(res) => {
				console.log(res);
				return res;
			}
		);
	}


	// Role based control
	isAuthorized(roles, excludeRoles = []) {
		let currentRoles = [];
		if (this.current && this.current.roles) {
			currentRoles = this.current.roles || [];
		}

		// First if it's super admin, yes, all can be accessed
		if (currentRoles.indexOf('ROLE_SUPER_ADMIN') >= 0) return true;
		if (currentRoles.indexOf('ROLE_USER') < 0) return false;

		if (!roles) return false;

		if(roles || excludeRoles) {
			return (_.intersection(currentRoles, roles).length === roles.length) && (_.intersection(currentRoles, excludeRoles).length === 0);
		} else {
			return true;
		}
	}

	// User write access check
	isAllowedEdit() {
		let currentRoles = [];
		if (this.current && this.current.roles) {
			currentRoles = this.current.roles || [];
		}

		return (currentRoles.indexOf('ROLE_ALLOW_EDIT') >= 0) || (currentRoles.indexOf('ROLE_SUPER_ADMIN') >= 0);
	}

	setPageRoles(roles) {
		this.roles = _.clone(roles);
	}

	isPageAccessible() {
		return this.isAuthorized(this.roles);
	}

	hasJwt(){
		try {
            return this._JWT.get();
		}
		catch (ex) {
			return false;
		}
	}

	logoutIfNoJwt(){
		if(!this.hasJwt()){
			this.logout();
		}
	}

}

User.$inject = ['Base64', 'JWT', 'AppConstants', '$http', '$state', '$q',
	'LocalStorageService'];
export default User;
