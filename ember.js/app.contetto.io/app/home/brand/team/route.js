import Ember from 'ember';
const BrandTeamRoute = Ember.Route.extend({
  model() {
		var brand = this.modelFor('home.brand');
    return Ember.RSVP.hash({
			members: brand.get('brandMembers'),
      isTeamTabActive: true,
    });
  }
});
export default BrandTeamRoute;
