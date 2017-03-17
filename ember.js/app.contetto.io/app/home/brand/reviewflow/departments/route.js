import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const ReviewFlowDepartmentRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	model () {
		return Ember.RSVP.hash({
  			isDepartTabActive: true
		});
  	}
});

export default ReviewFlowDepartmentRoute;
