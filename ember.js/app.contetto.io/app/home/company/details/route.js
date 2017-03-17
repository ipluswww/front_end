/*********************
Used for Company (Details)
**********************/

import Ember from 'ember';
import DS from 'ember-data';
import ErrorHandler from 'contetto-fe/mixins/error-handler';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// Constant CompanyDetailsRoute
const CompanyDetailsRoute = Ember.Route.extend(ErrorHandler, AuthenticatedRouteMixin, {
  //get Toast
  toast: Ember.inject.service(),
  //model
  model() {
    let comp_id = this.modelFor('home.company').comp_id;
    return Ember.RSVP.hash({
      company: this.store.findRecord('company', comp_id),
      errors: DS.Errors.create(),
      isDetailsTabActive: true,
      data: Ember.Object.create({
        isSubmitted: false
      })
    });
  },
  //actions
  actions: {
    //Used to update Company Information
    updateCompany() {
      this.currentModel.company.validate('name').then(() => {
        this.currentModel.data.set('isSubmitted', true);
        let compObj = this.currentModel.company;
        compObj.save().then(() => {
          this.currentModel.data.set('isSubmitted', false);
          this.get('toast').success('Company details has been updated!');
        }, () => {
          this.currentModel.data.set('isSubmitted', false);
        });
      }).catch(err => this.handleErrors(err));
    }
  }
});

export default CompanyDetailsRoute;
