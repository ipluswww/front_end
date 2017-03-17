import Ember from 'ember';
import ErrorHandler from 'contetto-fe/mixins/error-handler';

const AuthSignupIndexRoute = Ember.Route.extend(ErrorHandler, {
  actions: {
    signup () {
      this.currentModel.user.validate('email', 'password').then(() => {
        this.transitionTo('auth.signup.step2');
      }).catch(err => this.handleErrors(err));
    }
  }
});

export default AuthSignupIndexRoute;
