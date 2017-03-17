/*********************
Used for Company (Role)
**********************/

import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// Constant CompanyRoleEditRoute
const CompanyRoleEditRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	//get Toast
	toast: Ember.inject.service(),
	//model
	model (param) {
	return Ember.RSVP.hash({
			company:this.modelFor('home.company').company,
	      	role:this.store.findRecord('company-role',param.role_id),
	      	errors: DS.Errors.create(),
	      	isRolesTabActive: true,
	      	data: Ember.Object.create({
		        isSubmitted: false
		    })
	      });
	},
	afterModel (model) {
	    let companyId = this.modelFor('home.company').comp_id;
	    let company = this.store.peekRecord('company', companyId);
	    if (companyId) {
			model.role.set('company', company);
		} else {
	      this.transitionTo('home.companies.add');
	    }
	},
	//actions
	actions: {
		//Used to edit company role
		editRole () {
			if(this.validate()){
				this.currentModel.data.set('isSubmitted',true);
				let roleObj = this.currentModel.role;

				roleObj.save().then((res) => {
					this.currentModel.data.set('isSubmitted',false);
					this.get('toast').success('Company role has been updated successfuly');
					this.transitionTo('home.company.roles' );
					console.log(res);
		        }, (err) => {
		        	console.log(err);
		        	this.currentModel.data.set('isSubmitted',false);
		        });
			}
		}
	},
	//validate
	validate () {
		let role = this.currentModel.role;
		let errors = this.currentModel.errors;

	    if (!role.get('name')) {
	      errors.add('name', 'Please enter role name!');
	    } else {
	      errors.remove('name');
	    }

	    return errors.get('isEmpty');
	}
});

export default CompanyRoleEditRoute;
