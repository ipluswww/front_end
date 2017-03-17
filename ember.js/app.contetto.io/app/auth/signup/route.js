import Ember from 'ember';
import DS from 'ember-data';

const AuthSignupRoute = Ember.Route.extend({
  model () {
    return Ember.Object.create({
      user: this.store.createRecord('user'),
      errors: DS.Errors.create(),
      isSubmitted: false
    });
  }
});

export default AuthSignupRoute;
