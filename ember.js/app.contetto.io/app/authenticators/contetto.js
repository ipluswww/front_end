import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from 'contetto-fe/config/environment';

const {
  isEmpty,
  inject: {
    service
  }
} = Ember;

export default Base.extend({
  store: service('store'),

  toast: service('toast'),

  restore(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!isEmpty(data['X-Session'])) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(identification, password) {
    let _this = this;
    const url = config.REST.host + '/users/v1/sessions';

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        method:'POST',
        url: url,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
          "data": {
            "type":"sessions",
            "attributes": {
              "email": identification,
              "password": password
            }
          }
        })
      }).then(function(response) {
        Ember.run(function() {
          resolve({
            'X-Session': response.data.id,
            'userId': response.data.relationships.users.data.id,
          });
        });
      }, function(response) {
        Ember.run(function() {
          _this.get('toast').error(response.responseJSON.title);
          reject(response.responseJSON.title);
        });
      });
    });
  }
});
