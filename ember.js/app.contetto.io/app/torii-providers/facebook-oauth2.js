import Ember from 'ember';
import {configurable} from 'torii/configuration';
import Oauth2 from 'torii/providers/oauth2-code';

const {inject: { service}} = Ember;

export default Oauth2.extend({
  tokenParser: service('token-parser'),

  name:    'facebook-oauth2',

  baseUrl: 'https://gke.contetto.io/social-auth/v1/social-auth/facebook?state=add',

  // Additional url params that this provider requires
  requiredUrlParams: ['display'],

  responseParams: ['code', 'state', 'token'],

  display: 'popup',

  redirectUri: configurable('redirectUri', function(){
    // A hack that allows redirectUri to be configurable
    // but default to the superclass
    return this._super();
  }),

  open: function(options){
    let _this = this;
    let url = this.get('baseUrl');
    let responseParams = this.get('responseParams');

    return this.get('popup').open(url, responseParams, options).then(function(res){
      Ember.set(res, 'type', 'facebook');
      Ember.set(res, 'token', res.token);

      return new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.ajax({
          type: "GET",
          url: "https://gke.contetto.io/social-auth/v1/social-auth/fbpages?token=" + res.token,
          headers: {
            'Accept': "application/json",
          },
          contentType: 'application/json',
          data: ''
        }).then(function(response) {
           Ember.set(res, 'pages', response.data);

          _this.get('tokenParser').add(res);
        }, function(err) {
          reject(err);
        });
      });

    });
  },

  fetch(session) {
    return session;
  }
});
