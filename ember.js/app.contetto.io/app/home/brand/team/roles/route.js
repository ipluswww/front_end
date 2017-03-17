/*********************
Used for Brand / Team (Role)
**********************/

import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// Constant TeamRolesRoute
const TeamRolesRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	model: function() {
		return Ember.RSVP.hash({
				isTeamRolesActive: true
		});
	}
});

export default TeamRolesRoute;
