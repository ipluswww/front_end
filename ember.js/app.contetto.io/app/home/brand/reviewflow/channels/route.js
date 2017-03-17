import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const ReviewFlowChannelRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	model () {
		return Ember.RSVP.hash({
  			isChannelTabActive: true
		});
  	}
});

export default ReviewFlowChannelRoute;
