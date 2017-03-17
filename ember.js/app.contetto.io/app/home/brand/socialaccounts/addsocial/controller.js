import Ember from 'ember';

const {inject: {service}} = Ember;

export default Ember.Controller.extend({
  tokenParser: service('token-parser'),

  changeStatus: false,

  showButton: Ember.computed.notEmpty('tokenParser.data'),

  checkPages: Ember.computed('tokenParser.data.[]', function() {

    if(!Ember.isEmpty(this.get('tokenParser.data'))) {
      const data = this.get('tokenParser.data.0');

      return (!Ember.isEmpty(data.pages)) ? true : false;
    } else {
      return false;
    }
  }),

  isFacebook: Ember.computed.equal('tokenParser.data.0.type', 'facebook'),

  showAddPage: Ember.computed('checkPages', 'isFacebook', 'changeStatus', function() {
    if(this.get('isFacebook')) {

      if(this.get('changeStatus')) {
        return false;
      }

      if(this.get('checkPages')) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  })
});
