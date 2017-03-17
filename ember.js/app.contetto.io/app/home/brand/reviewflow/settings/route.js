import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const ReviewFlowSettingRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	model () {
		return Ember.RSVP.hash({
  			isSettingsTabActive: true
		});
  	}
});

export default ReviewFlowSettingRoute;
