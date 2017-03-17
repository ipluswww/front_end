/*********************
Used for Brand (Add)
**********************/

import Ember from 'ember';
import DS from 'ember-data';

import ErrorHandler from 'contetto-fe/mixins/error-handler';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


const {
  inject: {service},
} = Ember;

// Constant BrandsAddRoute
const BrandsAddRoute = Ember.Route.extend(ErrorHandler, AuthenticatedRouteMixin, {
  //get storage session
  companyDetail: service('current-company'),
  //get Toast
  toast: Ember.inject.service(),
  //model
  model() {
    return Ember.RSVP.hash({
      brand: this.store.createRecord('brand'), //Create brand record
      errors: DS.Errors.create(),
      data: Ember.Object.create({
        isSubmitted: false
      })
    });
  },
  afterModel(model) {
    const companyId = this.get('companyDetail.data.companyId');

    if (companyId) {
      this.store.findRecord('company', companyId).then((res) => {
        model.brand.setProperties({
          'company': res,
          'companyId': companyId
        });
      });
      model.brand.set('companyId', companyId);
    } else {
      this.transitionTo('home');
    }
  },
  //actions
  actions: {
    //Used to update Brand Information
    addBrand() {
      this.currentModel.brand.validate('name').then(() => {
        this.currentModel.data.set('isSubmitted', true);
        let brandObj = this.currentModel.brand;
        brandObj.save().then((data) => {
          this.currentModel.data.set('isSubmitted', false);
          this.get('toast').success('Brand details added successfully');
          this.transitionTo('home.brand.details', data.get('id'));
        }, () => {
          this.currentModel.data.set('isSubmitted', false);
        });
      }).catch(err => this.handleErrors(err));
    }
  },
});

export default BrandsAddRoute;
