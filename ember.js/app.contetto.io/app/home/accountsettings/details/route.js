/*********************
Used for Account Settings (Details)
**********************/

import Ember from 'ember';
import DS from 'ember-data';
import ErrorHandler from 'contetto-fe/mixins/error-handler';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  inject: {
    service
  }
} = Ember;

// Constant AccountSettingDetailsRoute
const AccountSettingDetailsRoute = Ember.Route.extend(ErrorHandler, AuthenticatedRouteMixin, {
  session: service('session'),
  //get Toast
  toast: service(),
  //model
  model() {
    let userId = this.get('session.data.authenticated.userId');
    return Ember.RSVP.hash({
      user: this.store.findRecord('user', userId),
      errors: DS.Errors.create(),
      isDetailsTabActive: true,
      data: Ember.Object.create({
        isSubmitted: false
      })
    });
  },
  //actions
  actions: {
    //Used to update Information
    updateInfo() {
      this.currentModel.user.validate('firstName', 'lastName').then(() => {
        this.currentModel.data.set('isSubmitted', true);
        let userObj = this.currentModel.user;
        userObj.save().then(() => {
          this.currentModel.data.set('isSubmitted', false);
          this.get('toast').success('Account details has been updated');
        }, () => {
          this.currentModel.data.set('isSubmitted', false);
        });
      }).catch(err => this.handleErrors(err));
    }
  }
});

export default AccountSettingDetailsRoute;
