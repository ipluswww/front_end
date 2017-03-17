import Ember from 'ember';

const {
  inject: {
    service
  }
} = Ember;

// Constant CompanyUsersListRoute
const CompanyUsersListRoute = Ember.Route.extend({
	session: service('session'),
	//get Toast
	toast: service(),
	//model
	model () {
		let userId =  this.get('session.data.authenticated.userId');
		return Ember.RSVP.hash({
			company:this.modelFor('home.company').company,
			userId:userId
	      });
	},
	//actions
	actions: {
		//Used to remove company member
		removeMember (memId) {
    		let cmember = this.store.peekRecord('companyMember', memId);
    		cmember.destroyRecord();
		}
	}
});

export default CompanyUsersListRoute;
