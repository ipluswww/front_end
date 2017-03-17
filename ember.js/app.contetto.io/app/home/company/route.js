import Ember from 'ember';

const {
  inject: {
    service
  }
} = Ember;

const CompanyRoute = Ember.Route.extend({
  //get storage session
  session: service('session'),
  beforeModel(transition) {
    let session = this.get('session');

    if (!session.get('isAuthenticated')) {
      this.transitionTo('auth.index');
    }

    Ember.setProperties(transition.resolvedModels.home, {
      '_isTopMenuOpened': true,
      '_isInboxNavMenuHide': true,
      '_isRightSideMenuOpened': false,
      '_isLeftSideMenuOpened': false,
      '_isRightFilterMenuHide': false
    });

  },

  model(param) {
    let session = this.get('session'),
      companyId = param.comp_id;
    session.set('companyId', companyId);
    return {
      company: this.store.findRecord('company', companyId),
      comp_id: companyId
    };
  }
});

export default CompanyRoute;
