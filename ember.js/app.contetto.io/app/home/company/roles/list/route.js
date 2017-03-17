/*********************
Used for Company (Roles)
**********************/

import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// Constant CompanyRolesRoute
const CompanyRolesRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	//get Toast
	toast: Ember.inject.service(),
	//model
	model () {
    const companyId = this.paramsFor('home.company').comp_id;

		return Ember.RSVP.hash({
			company:this.store.query('company-role', {id: companyId}),
	      	errors: DS.Errors.create(),
	      	isRolesTabActive: true
	      });
	},
	//actions
	actions: {
		//Used to remove company role
		removeRole (roleid) {
	    		let role = this.store.peekRecord('company-role', roleid);
	    		role.destroyRecord();
		}
	}
});

export default CompanyRolesRoute;
