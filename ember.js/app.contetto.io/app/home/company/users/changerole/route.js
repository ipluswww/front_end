import Ember from 'ember';
import DS from 'ember-data';

// Constant CompanyUsersChangeRoute
const CompanyUsersChangeRoute = Ember.Route.extend({
	//get Toast
	toast: Ember.inject.service(),
	//model
	model (param) {
		return Ember.RSVP.hash({
			company:this.modelFor('home.company').company,
			companyMember: this.store.findRecord('companyMember',param.mem_id),
			errors: DS.Errors.create(),
	      	data: Ember.Object.create({
		        isSubmitted: false
		    })
	      });
	},
	afterModel (model) {
	    let roleId = model.companyMember.get('role').get('id');
	    if (roleId) {
			model.companyMember.set('roleId', roleId);
		}
	},
	//actions
	actions: {
		//Used to add company member
		changeRole () {
			if(this.validate()){
				this.currentModel.data.set('isSubmitted',true);
				let memberObj = this.currentModel.companyMember;
				let roleId = this.currentModel.companyMember.get('roleId');
			  let role = this.store.peekRecord('companyRole', roleId);
			  if (roleId) {
					memberObj.set('role', role);
				}
				console.log(JSON.stringify(memberObj));
				memberObj.set('type','companyMember');

				memberObj.save().then((res) => {
					this.currentModel.data.set('isSubmitted',false);
					this.get('toast').success('Member role has been updated!');
					this.transitionTo('home.company.users' );
					console.log(res);
		        }, (err) => {
		        	memberObj.rollbackAttributes();
		        	console.log(err);
		        	this.currentModel.data.set('isSubmitted',false);
		        });
			}
		}
	},
	//validate
	validate () {
		let member = this.currentModel.companyMember;
		let errors = this.currentModel.errors;

		if (!member.get('roleId')) {
	      errors.add('role', 'Please select a role!');
	    } else {
	      errors.remove('role');
	    }

	    return errors.get('isEmpty');
	}
});

export default CompanyUsersChangeRoute;
