import Ember from 'ember';

export default Ember.Service.extend({
  data: null,

  init() {
    this._super(...arguments);
    this.set('data', []);
  },

  add(data) {

    if(data['oauth_token']) {
      Ember.set(data, 'token', data['oauth_token']);
    }

    if(data['oauth_token_secret']) {
      Ember.set(data, 'tokenSecret', data['oauth_token_secret']);
    }

    this.get('data').pushObject(data);
  },

  clear() {
    this.set('data', []);
  }
});
