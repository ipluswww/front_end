import Ember from 'ember';
import DS from 'ember-data';

const {
  inject: {
    service
  }
} = Ember;

const WelcomeBrandRoute = Ember.Route.extend({
  session: service('session'),
  model () {
    return Ember.RSVP.hash({
      brand: this.store.createRecord('brand'),
      brandInvites: this.store.query('invite', {
        type : 'brand'
      }),
      errors: DS.Errors.create(),
      data: Ember.Object.create({
        isSubmitted: false
      })
    });
  },
  afterModel (model) {
    let session = this.get('session');
    let companyId = session.get('companyId');

    if (companyId) {
      this.store.findRecord('company', companyId).then((res)=>{
        model.brand.set('company', res);
      });
      model.brand.set('companyId', companyId);
    } else if ( this.modelFor("welcome.brand").brandInvites.get('length') === 0 ) {
      this.transitionTo('welcome.company');
    }
  },
  actions : {
    createBrand () {
      if (this.validate()) {
        let brand = this.currentModel.brand;
        this.currentModel.data.set('isSubmitted', true);
        brand.save().then((res) => {
          this.currentModel.data.set('isSubmitted', false);
          /* calling another action requires send */
          this.send('selectBrand', res.id);
        }, () => {
          this.currentModel.data.set('isSubmitted', false);
        });
      }
    },
    acceptInvite (invite) {
      invite.set('status', 'accept');
      this.updateInvite(invite).then(() => {
        let brandMemberObj = this.store.createRecord('brandMember');
        brandMemberObj.set('type','brandMember');
        brandMemberObj.set('role', invite.get('role'));
        brandMemberObj.set('user', invite.get('user'));
        brandMemberObj.set('brand', invite.get('brand'));
        brandMemberObj.save().then(() => {
          this.get('toast').success('You have been added as a brand member successfully');
        });
        this.get('toast').success('You have accepted request successfully');
      });
    },
    rejectInvite (invite) {
      invite.set('status', 'reject');
      this.updateInvite(invite).then(() => {
        this.get('toast').success('You have rejected invite successfully');
      });
    },
    selectBrand (brandId) {
      let session = this.get('session');
      session.set('brandId', brandId);
      if ( this.modelFor("welcome.brand").brandInvites.get('length') !== 0 ) {
        this.transitionTo('home');
      } else {
        this.transitionTo('welcome.targetaudience');
      }
    }
  },
  updateInvite (invite) {
    return invite.save();
  },
  validate() {
    let brand = this.currentModel.brand;
    let errors = this.currentModel.errors;

    if (!brand.get('name')) {
      errors.add('name', 'Please enter brand name');
    } else {
      errors.remove('name');
    }
    return errors.get('isEmpty');
  }
});

export default WelcomeBrandRoute;
