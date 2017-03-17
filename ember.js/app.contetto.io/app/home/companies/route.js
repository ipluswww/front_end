import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const CompaniesRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel(transition) {
    Ember.setProperties(transition.resolvedModels.home, {
      '_isTopMenuOpened': false,
      '_isInboxNavMenuHide': true,
      '_isRightSideMenuOpened': false,
      '_isLeftSideMenuOpened': false,
      '_isRightFilterMenuHide': true
    });

  }
});

export default CompaniesRoute;
