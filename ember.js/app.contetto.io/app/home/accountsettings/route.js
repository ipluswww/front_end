import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const AccountSettingRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
 beforeModel(transition) {
  Ember.set(transition.resolvedModels.home, '_isTopMenuOpened', false);
  Ember.set(transition.resolvedModels.home, '_isInboxNavMenuHide', true);
  Ember.set(transition.resolvedModels.home, '_isRightSideMenuOpened', false);
  Ember.set(transition.resolvedModels.home, '_isLeftSideMenuOpened', false);
  Ember.set(transition.resolvedModels.home, '_isRightFilterMenuHide', true);
 }
});

export default AccountSettingRoute;