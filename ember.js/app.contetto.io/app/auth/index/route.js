import Ember from 'ember';
import DS from 'ember-data';

const AuthIndexRoute = Ember.Route.extend({
  session: Ember.inject.service('session'),
	model() {
    return Ember.RSVP.hash({
      session: {
        email: null,
        password: null,
      },
      errors: DS.Errors.create(),
      data: Ember.Object.create({
          isSubmitted: false
      })
    });
	},
  actions: {
    login () {
      if (this.validate()) {
        const {
          email,
          password
        } = this.currentModel.session;
        window.meudeus = this.get('session');
        this.currentModel.data.set('isSubmitted', true);
        // this.get('session').authorize('authorizer:contetto', (data, header) => { })
        this.get('session').authenticate('authenticator:contetto', email, password).then(() => {
          this.store.query('company', {}).then((res) => {
            if (res.get('length') !== 0) {
              this.transitionTo('home');
            } else {
              this.transitionTo('welcome.company');
            }
          }, () => {
            this.currentModel.data.set('isSubmitted', false);
            this.transitionTo('welcome.company');
          });
        }, () => {
          this.currentModel.data.set('isSubmitted', false);
        });
      }
    }
  },
  validate () {
    let session = this.currentModel.session;
    let errors = this.currentModel.errors;

    if (!session.email) {
      errors.add('email', 'Please enter your email');
    } else {
      errors.remove('email');
    }

    if (!session.password) {
      errors.add('password', 'Please enter your password');
    } else {
      errors.remove('password');
    }

    return errors.get('isEmpty');
  }
});

export default AuthIndexRoute;
