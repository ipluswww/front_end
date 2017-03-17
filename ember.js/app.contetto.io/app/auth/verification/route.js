import Ember from 'ember';

const AuthVerificationRoute = Ember.Route.extend({
  model () {
    return Ember.Object.create({
      isValid: true,
      isLoading: false
    });
  },
  afterModel (model, transition) {
    let token = transition.queryParams.token;

    if (!token) {
      model.set('isValid', false);
    } else {
      model.set('isLoading', true);
      this.store.query('verification', {
        token: token
      }).then(() => {
        model.set('isValid', true);
        model.set('isLoading', false);
      }, () => {
        model.set('isValid', false);
        model.set('isLoading', false);
      });
    }
  }
});

export default AuthVerificationRoute;
