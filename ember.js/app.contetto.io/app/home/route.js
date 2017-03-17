import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const HomeRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return Ember.RSVP.hash({
      _isTopMenuOpened: false,
      _isLeftSideMenuOpened: false,
      _isRightSideMenuOpened: false,
      _isInboxNavMenuHide: false,
      _isRightFilterMenuHide: false,
      // company: this.store.createRecord('company'),
      companies: this.store.findAll('company'),
      errors: DS.Errors.create(),
      brands: this.store.findAll('brand')
    });

  },

  actions: {
    toggleTopMenu(isOpened) {
      this.controller.set('_isTopMenuOpened', isOpened);
    },
    toggleLeftSideMenu(isOpened) {
      this.controller.set('_isLeftSideMenuOpened', isOpened);
    },
    toggleRightSideMenu(isOpened) {
      this.currentModel.set('_isRightSideMenuOpened', isOpened);
    },
    gotoCompany(companyId){
      this.transitionTo('home.company',companyId);
      this.controller.set('_isRightSideMenuOpened', isOpened);
    }
  }
});

export default HomeRoute;
