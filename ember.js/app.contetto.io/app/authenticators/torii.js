import Ember from 'ember';
import Torii from 'ember-simple-auth/authenticators/torii';

export default Torii.extend({
  torii: Ember.inject.service()
});
