import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const BrandTeamNotesRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	model () {
    		return Ember.RSVP.hash({
      			isTeamNotesActive: true
    		});
  	}
});

export default BrandTeamNotesRoute;
