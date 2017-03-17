import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const TeamIniviteUserRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
  //get Toast
  toast: Ember.inject.service(),

  model() {
    var brand = this.modelFor('home.brand');

    return Ember.RSVP.hash({
      roles: this.store.query('brand-role', {id: brand.get('id')}),
      brandInvite: this.store.createRecord('invite', {
        type: 'brand'
      }),
      brandId: brand.get('id'),
      roleId: '',
      errors: DS.Errors.create(),
      data: Ember.Object.create({
        isSubmitted: false
      })
    });

  },
  afterModel(model) {
    let brandId = this.modelFor('home.brand').id;
    let brand = this.store.peekRecord('brand', brandId);

    if (brandId) {
      model.brandInvite.set('brand', brand);
    } else {
      this.transitionTo('home');
    }
  },
  actions: {
    addMember() {

      if (this.validate()) {
        let brandInvite = this.currentModel.brandInvite;
        let roleId = this.currentModel.roleId;
        let brandRole = this.store.peekRecord('brand-role', roleId);

        brandInvite.set('role', brandRole);

        brandInvite.save().then((res) => {
          this.setSuccessMessage();
          console.log(res);
        }, (err) => {
          brandInvite.deleteRecord();
          console.log(err);
          this.currentModel.data.set('isSubmitted', false);
        });
      }
    },
  },

  setSuccessMessage() {
    let brandId = this.currentModel.brandId;
    this.currentModel.data.set('isSubmitted', false);
    this.get('toast').success('Member has been invited successfuly');
    this.transitionTo('home.brand.team', brandId);
  },

  validate() {
    let member = this.currentModel.brandInvite;
    let errors = this.currentModel.errors;

    if (!member.get('email')) {
      errors.add('email', 'Please enter user email!');
    } else {
      errors.remove('email');
    }

    if (!this.currentModel.roleId) {
      errors.add('role', 'Please select a role!');
    } else {
      errors.remove('role');
    }

    return errors.get('isEmpty');
  }
});

export default TeamIniviteUserRoute;
