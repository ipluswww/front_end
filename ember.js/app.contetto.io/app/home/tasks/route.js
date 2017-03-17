import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel(transition) {
  		transition.resolvedModels.home._isTopMenuOpened=false;
		transition.resolvedModels.home._isInboxNavMenuHide=true;
		transition.resolvedModels.home._isRightSideMenuOpened=false;
		transition.resolvedModels.home._isLeftSideMenuOpened=false;
		transition.resolvedModels.home._isRightFilterMenuHide=true;
	}
});
