import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const CampaignRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
 beforeModel(transition) {
  transition.resolvedModels.home._isTopMenuOpened = false;
  transition.resolvedModels.home._isInboxNavMenuHide = true;
  transition.resolvedModels.home._isRightSideMenuOpened = false;
  transition.resolvedModels.home._isLeftSideMenuOpened = false;
  transition.resolvedModels.home._isRightFilterMenuHide = true;
 },
 model: function() {
  let brand_id = this.modelFor('home.brand').brand_id;
  return Ember.RSVP.hash({
   brand_id: brand_id
  });
 }
});

export default CampaignRoute;