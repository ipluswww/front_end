/*********************
Used for Brand (Role)
**********************/

import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// Constant TeamRoleListRoute
const TeamRoleListRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    const brandId = this.paramsFor('home.brand').brand_id;

    return Ember.RSVP.hash({
      roles: this.store.query('brand-role', {id: brandId})
    });
  },

  actions: {
    removeRole(roleId) {
      let role = this.store.peekRecord('brand-role', roleId);

      role.destroyRecord();
    }
  }

});

export default TeamRoleListRoute;
