/*********************
Used for Account Settings (Notification settings)
**********************/

import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// Constant AccountSettingNotificationRoute
const AccountSettingNotificationRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
 //model
 model() {
  return Ember.RSVP.hash({
   isNotificationTabActive: true
  });
 },
 //actions
 actions: {}
});

export default AccountSettingNotificationRoute;