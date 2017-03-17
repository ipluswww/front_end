/*********************
Used for Brand (Role)
**********************/

import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// Constant TeamRoleAddRoute
const TeamRoleAddRoute = Ember.Route.extend(AuthenticatedRouteMixin, {

  //get Toast
  toast: Ember.inject.service(),
  //model
  model() {
    return Ember.RSVP.hash({
      brand: this.modelFor('home.brand'),
      role: this.store.createRecord('brand-role'), //create a role
      errors: DS.Errors.create(),
      data: Ember.Object.create({
        isSubmitted: false
      })
    });
  },
  afterModel(model) {
    let brand = model.brand;

    if (brand.get('id')) {
      model.role.set('brand', brand);
    } else {
      this.transitionTo('home');
    }
  },
  //actions
  actions: {

    addRole() {
      if (this.validate()) {
        let brand = this.currentModel.brand;
        this.currentModel.data.set('isSubmitted', true);
        let roleObj = this.currentModel.role;

        roleObj.save().then(() => {
          this.currentModel.data.set('isSubmitted', false);
          this.get('toast').success('Role has been added successfully');
          this.transitionTo('home.brand.team.roles', brand.get('id')); //Redirect to roles list upon adding
        }, () => {
          this.currentModel.data.set('isSubmitted', false);
        });
      }
    }
  },
  //validate adding of roles
  validate() {
    var role = this.currentModel.role,
      errors = this.currentModel.errors;

    if (!role.get('name')) {
      errors.add('name', 'Please enter role name!');
    } else {
      errors.remove('name');
    }

    if (!role.get('createPosts') && !role.get('reviewPosts') && !role.get('viewAnalytics') && !role.get('manageSocialAccount') && !role.get('manageReviewStructure') && !role.get('overrideReviewStructure') && !role.get('manageTeam')) {
      errors.add('check', 'Select atleast a permisiion!');
    } else {
      errors.remove('check');
    }

    return errors.get('isEmpty');
  }
});

export default TeamRoleAddRoute;
