/*********************
Used for Company (Add)
**********************/

import Ember from 'ember';
import DS from 'ember-data';

import ErrorHandler from 'contetto-fe/mixins/error-handler';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// Constant CompaniesAddRoute
const CompaniesAddRoute = Ember.Route.extend(ErrorHandler, AuthenticatedRouteMixin, {
  //get Toast
  toast: Ember.inject.service(),
  //model
  model() {
    return Ember.RSVP.hash({
      company: this.store.createRecord('company'),
      errors: DS.Errors.create(),
      data: Ember.Object.create({
        isSubmitted: false
      })
    });
  },
  //actions
  actions: {
    //Used to update Company Information
    addCompany() {
      this.currentModel.company.validate('name').then(() => {
        this.currentModel.data.set('isSubmitted', true);
        let compObj = this.currentModel.company;
        compObj.save().then((data) => {
          this.currentModel.data.set('isSubmitted', false);
          this.get('toast').success('Company has been added!');
          this.transitionTo('home.company.details', data.get('id'));
        }, () => {
          this.currentModel.data.set('isSubmitted', false);
        });
      }).catch(err => this.handleErrors(err));
    }
  }
});

export default CompaniesAddRoute;
