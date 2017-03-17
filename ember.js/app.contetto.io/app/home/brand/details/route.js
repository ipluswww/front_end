import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ErrorHandler from 'contetto-fe/mixins/error-handler';

const BrandDetailsRoute = Ember.Route.extend(ErrorHandler, AuthenticatedRouteMixin, {
  //get Toast
  toast: Ember.inject.service(),
  model() {
    return Ember.RSVP.hash({
      isDetailsTabActive: true,
      brand: this.modelFor('home.brand'),
      errors: DS.Errors.create(),
      data: Ember.Object.create({
        isSubmitted: false
      })
    });
  },
  actions: {
    updateBrand() {
      this.currentModel.brand.validate('name').then(() => {
        this.currentModel.data.set('isSubmitted', true);
        let brand = this.currentModel.brand;
        brand.save().then(() => {
          this.currentModel.data.set('isSubmitted', false);
          this.get('toast').success('Brand has been updated successfully');
        }, () => {
          this.currentModel.data.set('isSubmitted', false);
        });
      }).catch(err => this.handleErrors(err));
    }
  }
});

export default BrandDetailsRoute;
