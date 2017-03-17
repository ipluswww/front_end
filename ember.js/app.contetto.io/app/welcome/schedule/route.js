import Ember from 'ember';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Route.extend({
  session: service('session'),
  actions: {
    createVertical() {
      if (this.validate()) {
        let vertical = this.currentModel.vertical;
        this.currentModel.set('isSubmitted', true);

        vertical.save().then(() => {
          this.currentModel.set('isSubmitted', false);
          this.transitionTo('home');
        }, () => {
          this.currentModel.set('isSubmitted', false);
        });
      }
    },
    transitionTo(route) {
      let session = this.get('session');
      if (session.get('fromAddBrand')) {
        this.transitionTo('home.brand.details', session.get('brandId'));
      } else {
        this.transitionTo(route);
      }
    }
  },
  validate() {
    let errors = this.currentModel.errors;

    //    if (!company.get('name')) {
    //      errors.add('name', 'Please enter company name');
    //    } else {
    //      errors.remove('name');
    //    }

    return errors.get('isEmpty');
  }
});
