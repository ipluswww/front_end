import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  inject: {
    service
  }
} = Ember;

const BrandRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
  //get storage session
  session: service('session'),

  beforeModel(transition) {
    Ember.setProperties(transition.resolvedModels.home, {
      '_isTopMenuOpened': false,
      '_isInboxNavMenuHide': true,
      '_isRightSideMenuOpened': false,
      '_isLeftSideMenuOpened': false,
      '_isRightFilterMenuHide': true
    });
  },

  model(params) {
    var brandId = params.brand_id,
      session = this.get('session');
    session.set('brandId', brandId);
    return this.store.findRecord('brand', brandId);
  }
});

export default BrandRoute;
