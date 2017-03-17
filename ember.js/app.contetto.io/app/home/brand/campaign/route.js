import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const CampaignsRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
 model: function(param) {
  let brand_id = this.modelFor('home.brand').brand_id;
  return Ember.RSVP.hash({
   camp_id: param.camp_id,
   brand_id: brand_id
  });
 }
});

export default CampaignsRoute;