import Ember from 'ember';
import DS from 'ember-data';

const {
  inject: {
    service
  }
} = Ember;

export default Ember.Route.extend({
  session: service('session'),
  model() {
      let session = this.get('session');
      let inviteId = session.get('invite');
      console.log(inviteId);
      session.set('invite','undefined');
      return Ember.RSVP.hash({
        errors: DS.Errors.create(),
        isSubmitted: false,
        invite: this.store.findRecord('invite', inviteId)
      });
  },
  actions: {
    acceptInvite (invite) {
      let user = this.store.peekRecord('user', this.get('session.data.authenticated.userId'));
      let memberObj;
      if (invite.get('type') === 'company'){
        memberObj = this.store.createRecord('companyMember');
        memberObj.set('type','companyMember');
        memberObj.set('role', invite.get('role'));
        memberObj.set('user', user);
        memberObj.set('company', invite.get('company'));
      } else {
        memberObj = this.store.createRecord('brandMember');
        memberObj.set('type','brandMember');
        memberObj.set('branRole', invite.get('role'));
        memberObj.set('user', user);
        memberObj.set('brand', invite.get('brand'));
        invite.get('company');
      }
      invite.set('status', 'accept');
      this.updateInvite(invite).then(() => {
        memberObj.save().then(() => {
          this.get('toast').success('You have been added as a member successfully');
        });
        this.get('toast').success('You have accepted invite successfully');
      });
    },
    rejectInvite (invite) {
      invite.set('status', 'reject');
      this.updateInvite(invite).then(() => {
        this.get('toast').success('You have rejected invite successfully');
      });
    },
    selectCompany (companyId) {
      let session = this.get('session');
      session.set('companyId', companyId);
      this.transitionTo('home');
    },
    selectBrand (brandId) {
      let session = this.get('session');
      session.set('brandId', brandId);
      this.transitionTo('home');
    }
  },
  updateInvite (invite) {
    return invite.save();
  }
});
