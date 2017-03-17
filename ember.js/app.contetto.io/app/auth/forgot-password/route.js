import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Route.extend({
  model() {
    return Ember.Object.create({
      forgot: this.store.createRecord('forgot-password'),
      success: false,
      errors: DS.Errors.create(),
      isSubmitted: false
    });
  },

  actions: {
    resetPassword() {
      let errors = this.currentModel.errors;

      if(this.validate()) {
        this.currentModel.set('isSubmitted', true);

        this.currentModel.forgot.save().then(() => {
          this.currentModel.set('success', true);
          this.currentModel.set('isSubmitted', false);
          errors.remove('email');
        }, () => {
          this.currentModel.set('success', false);
          this.currentModel.set('isSubmitted', false);
          errors.add('email', 'Unable to reset password.');
        });
      }
    }
  },

  validate() {
    let errors = this.currentModel.errors;

    if(Ember.isEmpty(this.currentModel.forgot.get('email'))) {
      errors.add('email', 'Email should not be empty');
      return false;
    } else {
      return true;
    }
  }
});
