/*********************
Used for Brand (Role)
**********************/

import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// Constant TeamRoleAddRoute
const TeamRoleEditRoute = Ember.Route.extend(AuthenticatedRouteMixin, {

  //get Toast
  toast: Ember.inject.service(),
  //model
  model(params) {
    return Ember.RSVP.hash({
      brand: this.modelFor('home.brand'),
      role: this.store.findRecord('brand-role', params.role_id), //fetch role from existing
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

    editRole() {
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
    let role = this.currentModel.role;
    let errors = this.currentModel.errors;

    if (!role.get('name')) {
      errors.add('name', 'Please enter role name!');
    } else {
      errors.remove('name');
    }

    return errors.get('isEmpty');
  }
});

export default TeamRoleEditRoute;
