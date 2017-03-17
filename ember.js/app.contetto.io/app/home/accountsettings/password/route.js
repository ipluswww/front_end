/*********************
Used for Account Settings (Password)
**********************/

import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
 inject: {
  service
 }
} = Ember;

// Constant AccountSettingPasswordRoute
const AccountSettingPasswordRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
 session: service('session'),
 //get Toast
 toast: service(),
 
 //model
 model() {
  let userId = this.get('session.data.authenticated.userId');
  return Ember.RSVP.hash({
   user: this.store.findRecord('user', userId),
   errors: DS.Errors.create(),
   isPasswordTabActive: true,
   data: Ember.Object.create({
    isSubmitted: false
   })
  });
 },

 //actions
 actions: {
  //Used to reset password
  updatePassword() {
   if (this.validate()) {
    this.currentModel.data.set('isSubmitted', true);

    let userObj = this.currentModel.user;
    userObj.save().then(() => {
     userObj.set('oldPassword', '');
     userObj.set('newPassword', '');
     userObj.set('cnfPassword', '');
     this.currentModel.data.set('isSubmitted', false);
     this.get('toast').success('Your password has been reset! Please login again');
     this.get('session').clear();
     this.transitionTo('auth');
    }, () => {
     this.currentModel.data.set('isSubmitted', false);
     userObj.set('oldPassword', '');
     userObj.set('newPassword', '');
     userObj.set('cnfPassword', '');
    });
   }
  }
 },

 //validate
 validate() {
  let user = this.currentModel.user;
  let errors = this.currentModel.errors;

  if (!user.get('oldPassword')) {
   errors.add('oldPassword', 'Please enter old password!');
  } else {
   errors.remove('oldPassword');
  }

  if (!user.get('newPassword')) {
   errors.add('newPassword', 'Please enter new password!');
  } else {
   errors.remove('newPassword');
  }

  if (user.get('cnfPassword') !== user.get('newPassword')) {
   errors.add('cnfPassword', 'Entered password does not match!');
  } else {
   errors.remove('cnfPassword');
  }


  return errors.get('isEmpty');
 }

});

export default AccountSettingPasswordRoute;