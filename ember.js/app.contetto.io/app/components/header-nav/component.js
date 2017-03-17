import Ember from 'ember';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Component.extend({
  store: service('store'),

  session: service('session'),

  init() {
    this._super(...arguments);

    const currentUserId = this.get('session.data.authenticated.userId');

    this.get('store').findRecord('user', currentUserId).then((user) => {
      this.set('fullUserName', user.get('fullName'));
      this.set('userEmail', user.get('email'));
    });
  },

  actions: {
    logout() {
      this.sendAction('clickLogout');
    },
    toggleMenu() {
      let isTopOpened = !this.get('isTopOpened');
      this.set('isTopOpened', isTopOpened);

      this.sendAction('clickToggle', isTopOpened);
    }
  }
});
