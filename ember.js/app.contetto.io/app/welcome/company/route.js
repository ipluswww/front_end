import Ember from 'ember';
import DS from 'ember-data';

import ErrorHandler from 'contetto-fe/mixins/error-handler';

const {
  inject: {
    service
  }
} = Ember;

const WelcomeCompanyRoute = Ember.Route.extend(ErrorHandler, {
  session: service('session'),
  model () {
    return Ember.RSVP.hash({
      company: this.store.createRecord('company'),
      companyInvites: this.store.query('invite', {
        type : 'company'
      }),
      brandInvites: this.store.query('invite', {
        type : 'brand'
      }),
      errors: DS.Errors.create(),
      isSubmitted: false,
      data: Ember.Object.create({
        isSubmitted: false
      })
    });
  },
  afterModel() {
    // If user has invite for brand there is no need to create a company
    if (this.modelFor("welcome.company").companyInvites.get('length') === 0 &&
        this.modelFor("welcome.company").brandInvites.get('length') !== 0 ) {
      this.transitionTo('welcome.brand');
    }
  },
  actions : {
    createCompany () {
      this.currentModel.company.validate('name').then(() => {
        let company = this.currentModel.company;
        this.currentModel.data.set('isSubmitted', true);
        company.save().then((res) => {
          this.currentModel.data.set('isSubmitted', false);
          /* calling another action requires send */
          this.send('selectCompany', res.id);
        }, () => {
          this.currentModel.data.set('isSubmitted', false);
        });
        }).catch(err => this.handleErrors(err));
    },
    acceptInvite (invite) {
      let memberObj = this.store.createRecord('companyMember');
      memberObj.set('type','companyMember');
      memberObj.set('role', invite.get('role'));
      memberObj.set('user', invite.get('user'));
      memberObj.set('company', invite.get('company'));
      invite.set('status', 'accept');
      this.updateInvite(invite).then(() => {
        memberObj.save().then(() => {
          this.get('toast').success('You have been added as member successfully');
        });
        this.get('toast').success('You have accepted request successfully');
      });
    },
    rejectInvite (invite) {
      invite.set('status', 'reject');
      this.updateInvite(invite).then(() => {
        this.get('toast').success('You have rejected request successfully');
      });
    },
    selectCompany (companyId) {
      let session = this.get('session');
      session.set('companyId', companyId);
      this.transitionTo('welcome.brand');
    }
  },
  updateInvite (invite) {
    return invite.save();
  },
  validate() {
    let company = this.currentModel.company;
    let errors = this.currentModel.errors;

    if (!company.get('name')) {
      errors.add('name', 'Please enter company name');
    } else {
      errors.remove('name');
    }

    return errors.get('isEmpty');
  }
});

export default WelcomeCompanyRoute;
