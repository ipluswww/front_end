import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const BrandTeamPostsRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	model () {
    		return Ember.RSVP.hash({
      			isTeamPostsActive: true,
            brandId: this.paramsFor('home.brand')
    		});
  	}
});

export default BrandTeamPostsRoute;
