import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const ApplicationRoute = Ember.Route.extend(ApplicationRouteMixin, {
 session: Ember.inject.service('session'),

 setupController(controller) {
  controller.set('session', this.get('session'));
 },

 actions: {
  logout() {
   this.get('session').invalidate();
  },
  transitionTo(to) {
   this.transitionTo(to);
  }
 }
});

export default ApplicationRoute;