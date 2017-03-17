import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel(transition) {
    Ember.setProperties(transition.resolvedModels.home, {
      '_isTopMenuOpened': false,
      '_isInboxNavMenuHide': true,
      '_isRightSideMenuOpened': false,
      '_isLeftSideMenuOpened': false,
      '_isRightFilterMenuHide': true
    });
  },

  model() {
    const brandId = this.paramsFor('home.brand').brand_id;

    return Ember.RSVP.hash({
      brandId: brandId,
      post: this.store.createRecord('post'),
      campaigns: this.store.query('campaign', {brandId: brandId}),
      accounts: this.store.query('social-account', {brandId: brandId}),
      categories: this.store.query('category', {brandId: brandId})
    });
  }
});
