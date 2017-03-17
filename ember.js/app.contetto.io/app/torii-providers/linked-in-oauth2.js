import Ember from 'ember';
import Oauth2 from 'torii/providers/oauth2-code';
import {configurable} from 'torii/configuration';

const {inject: { service}} = Ember;

export default Oauth2.extend({
  tokenParser: service('token-parser'),

  name:       'linked-in-oauth2',

  baseUrl:    'https://gke.contetto.io/social-auth/v1/social-auth/linkedin?state=add',

  responseParams: ['code', 'state', 'oauth_token', 'pageId'],

  redirectUri: configurable('redirectUri', function(){
    return this._super();
  }),

  open(options){
    let _this = this;
    let url = this.get('baseUrl');
    let responseParams = this.get('responseParams');

    return this.get('popup').open(url, responseParams, options).then(function(res) {
      Ember.set(res, 'type', 'linkedin');

      _this.get('tokenParser').add(res);
    });
  },

  fetch(session) {
    return session;
  }
});
