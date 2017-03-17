import Ember from 'ember';

const { inject: {service}} = Ember;

export default Ember.Component.extend({
  companyDetail: service('current-company'),

  actions: {
    toggleMenu() {
      let isOpened = !this.get('isOpened');
      this.set('isOpened', isOpened);

      this.sendAction('action', isOpened);
    }
  }
});
