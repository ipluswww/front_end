import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const BrandTargetAudienceRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	model () {
    		return Ember.RSVP.hash({
      			isTargetAudiencTabActive: true
    		});
  	}
});

export default BrandTargetAudienceRoute;
