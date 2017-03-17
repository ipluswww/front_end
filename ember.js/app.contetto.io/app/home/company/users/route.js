import Ember from 'ember';

// Constant CompanyUsersRoute
const CompanyUsersRoute = Ember.Route.extend({
	model () {
		let comp_id = this.modelFor('home.company').comp_id;
		return Ember.RSVP.hash({
			isUsersTabActive: true,
			comp_id: comp_id
	      });
	}
});

export default CompanyUsersRoute;
