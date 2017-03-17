import Ember from 'ember';
import ErrorHandler from 'contetto-fe/mixins/error-handler';

const AuthSignupStep2Route = Ember.Route.extend(ErrorHandler, {
  afterModel (model) {
    if (!model ||
          !model.user ||
          !model.user.get('email') ||
          !model.user.get('password')) {
      this.transitionTo('auth.signup.index');
    }
  },
  actions: {
    updateSignUp () {
      this.currentModel.user.validate('firstName', 'lastName', 'phoneNumber').then(() => {
        this.currentModel.set('isSubmitted', true);
        this.currentModel.user.save().then(() => {
          this.currentModel.user.set('email','');
          this.currentModel.user.set('password','');
          this.currentModel.set('isSubmitted', false);
          this.transitionTo('auth.index');
        }, () => {
          this.currentModel.set('isSubmitted', false);
        });
      }).catch(err => this.handleErrors(err));
    }
  }
});

export default AuthSignupStep2Route;
