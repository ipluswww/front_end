/*********************
Used for Company (Role)
**********************/

import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// Constant CompanyRolesRoute
const CompanyRolesRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	model: function() {
		let comp_id = this.modelFor('home.company').comp_id;
	    return Ember.RSVP.hash({
			isRolesTabActive: true,
			comp_id: comp_id
	      });
	}
});

export default CompanyRolesRoute;
