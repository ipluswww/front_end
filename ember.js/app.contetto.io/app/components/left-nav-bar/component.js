import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleMenu() {
      let isOpened = !this.get('isOpened');
      this.set('isOpened', isOpened);

      this.sendAction('action', isOpened);
    }
  }
});
