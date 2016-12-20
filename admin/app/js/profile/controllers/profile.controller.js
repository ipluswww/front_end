import _ from 'lodash';
class ProfileController {
	constructor (Person, User, Zones, $mdDialog, AlertService) {
		this._User = User;
		this._Person = Person;
		this._Zones = Zones;
		this._$mdDialog = $mdDialog;
		this._AlertService = AlertService;
		this.init();
	}

	init () {
		// Init common variables
		this.timezones = this._Zones.get();


		// Get user profile from server
		this._User.getProfile().then( (res) => {
			this.postFetch();
		});
	}

	// permission check: ROLE_AGENT && (ROLE_ADMIN and/or ROLE_SUPER_ADMIN)
	canAssociateAgent() {
		return (
			this.user && this.user.roles &&
			(this.user.roles.indexOf('ROLE_AGENT') >= 0) && 
			((this.user.roles.indexOf('ROLE_ADMIN') >= 0) || (this.user.roles.indexOf('ROLE_SUPER_ADMIN') >= 0))
		); 
	}

	// associate agent button click event handler
	openAgentModal() {
		// permission check, double make sure.
		if (this.canAssociateAgent() === false) return;
		let self = this;
		this._$mdDialog.show({
			controller: 'AgentsModalController as $ctrl',
			templateUrl: 'templates/shared/_agent_dialog.html',
			parent: angular.element(document.body),
			clickOutsideToClose:true,
			locals: { data: this.user.person ? this.user.person.agentId : null }
		}).then( (res) => {
			if (res.data && res.data._id) {
				let agentId = res.data._id;
				// when we want to save we just need _id
				self._Person.update({_id: self.user._id, agentId: agentId}).then((updatedRes) => {
					self.user.agent = _.cloneDeep(res.data);
					self.user.lastUpdated = updatedRes.lastUpdated;
					self._User.current = _.cloneDeep(self.user);
					self._AlertService.success("The agent has been associated with the user successfully!");
				});
			}
		});
	}

	// Generate UI-friend javascript object, this.user.
	// Called after api call and also in order to reset.
	postFetch () {
		// Safe cloning
		this.user = _.clone(this._User.current);
		// timezone select
		this.user.timezone = this.user.timeZoneHour + this.user.timeZoneMinute / 60;

		this.user.newPassword = null;
		this.user.rePassword = null;
	}

	// Save the result to the server.
	save () {
		// First go with pre-api work
		let newUser = _.clone(this.user);
		{
			// timezone preparation
			newUser.timeZoneHour = Math.round(this.user.timezone);
			newUser.timeZoneMinute = (this.user.timezone - newUser.timeZoneHour) * 60;
			// ignore password
			delete newUser.password;
			// and some other heavy properties
			delete newUser.agent;
			delete newUser.warehouseLocation;
			delete newUser.markets;
		}

		// update profile
		this._User.updateProfile(newUser).then((res) => {
			this._User.current = _.cloneDeep(newUser);
			this._User.current.lastUpdated = res.lastUpdated;
			this.postFetch();
			this._AlertService.success("User information has been updated successfully!");
		});
	}


	// update the password
	updatePassword() {
		// First go with password match validation
		if(this.user.newpassword !== this.user.repassword) return;

		// hide password form.
		this.showPasswordForm = false

		// update password
		this._User.updateProfile({password: this.user.newpassword}).then((res) => {
			this._AlertService.success("Password has been updated successfully!");
		})
	}

	resetPasswordForm() {
		this.showPasswordForm = false;
		this.user.newpassword = null;
		this.user.repassword = null;
	}

}

ProfileController.$inject = ['Person', 'User', 'Zones', '$mdDialog', 'AlertService'];
export default ProfileController;
