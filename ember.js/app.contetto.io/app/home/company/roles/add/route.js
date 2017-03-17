/*********************
Used for Company (Role)
**********************/

import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// Constant CompanyRoleAddRoute
const CompanyRoleAddRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	//get Toast
	toast: Ember.inject.service(),
	//model
	model () {
		return Ember.RSVP.hash({
			company:this.modelFor('home.company').company,
			role: this.store.createRecord('company-role'), //create a role
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
	    //set current company relation while creating Role Object
	    if (companyId) {
			model.role.set('company', company);
		} else {
	        this.transitionTo('home.companies.add');
	    }
	},
	//actions
	actions: {
		//Used to add company role
		addRole () {
			if(this.validate()){
				this.currentModel.data.set('isSubmitted',true);
				let roleObj = this.currentModel.role;

				roleObj.save().then(() => {
					this.currentModel.data.set('isSubmitted',false);
					this.get('toast').success('Role has been added successfully');
					this.transitionTo('home.company.roles' ); //Redirect to roles list upon adding
				}, () => {
		        	this.currentModel.data.set('isSubmitted',false);
		        });
			}
		}
	},
	//validate adding of roles
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

export default CompanyRoleAddRoute;
