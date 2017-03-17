import Ember from 'ember';
import DS from 'ember-data';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Route.extend({
  session: service('session'),
  model(params) {
    return Ember.Object.create({
      invite: this.store.createRecord('invite'),
      user: this.store.createRecord('user'),
      session: this.store.createRecord('session'),
      errors: DS.Errors.create(),
      token: params.token,
      isSubmitted: false
    });
  },
  afterModel(model) {
    let session = this.get('session');
    this.store.queryRecord('invite-confirm', {
      token : model.token
    }).then((inviteConfirm) => {
     model.set('invite', inviteConfirm);
     model.user.set('email', model.invite.get('email'));
     session.set('invite',model.invite.get('id'));
    });
  },
  actions: {
      signup () {
        if (this.validate()) {
          this.currentModel.set('isSubmitted', true);
          this.currentModel.user.save().then(() => {
            this.currentModel.set('isSubmitted', false);
            this.send('login');
          }, () => {
            this.currentModel.set('isSubmitted', false);
          });
          }
      },
      login () {
        let session = this.get('session');
        let sessionObj = this.currentModel.session;
        sessionObj.set('email', this.currentModel.user.get('email'));
        sessionObj.set('password', this.currentModel.user.get('password'));
        this.currentModel.set('isSubmitted', true);
        sessionObj.save().then((res) => {
          session.set('isAuthenticated', true);
          session.set('X-Session', res.get('id'));
          res.get('users').then((userRes) => {
            this.currentModel.set('isSubmitted', false);
            session.set('userId', userRes.get('id'));
            this.transitionTo('auth.invite-sign.step-2');
          });
        });
      }
    },
    validate () {
      let user = this.currentModel.user;
      let errors = this.currentModel.errors;

      if (!user.get('email')) {
        errors.add('email', 'Please enter your email');
      } else {
        errors.remove('email');
      }

      if (!user.get('password')) {
        errors.add('password', 'Please enter your password');
      } else {
        errors.remove('password');
      }

      if (!user.get('firstName')) {
        errors.add('firstName', 'Please enter your first name');
      } else {
        errors.remove('firstName');
      }

      if (!user.get('lastName')) {
        errors.add('lastName', 'Please enter your last name');
      } else {
        errors.remove('lastName');
      }

      if (!user.get('phoneNumber')) {
        errors.add('phoneNumber', 'Please enter your phone number');
      } else {
        errors.remove('phoneNumber');
      }

      return errors.get('isEmpty');
    }

});
