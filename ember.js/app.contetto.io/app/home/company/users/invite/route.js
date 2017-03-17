import Ember from 'ember';
import DS from 'ember-data';

// Constant CompanyUsersInviteRoute
const CompanyUsersInviteRoute = Ember.Route.extend({
	//get Toast
	toast: Ember.inject.service(),
	//model
	model () {
		return Ember.RSVP.hash({
			company:this.modelFor('home.company').company,
			//companyMember: this.store.createRecord('companyMember'),
			companyInvites: this.store.createRecord('companyInvite', {
		        type : 'company'
		    }),
		    roleId:'',
			errors: DS.Errors.create(),
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
			model.companyInvites.set('company', company);
		} else {
	        this.transitionTo('home.companies.add');
	    }
	},
	//actions
	actions: {
		onSelectRoles:function(){
		  //insert the code that needs to be excuted on change here
			console.log(this.currentModel.roleId);
		},

		inviteMember () {
			if(this.validate()){
				this.currentModel.data.set('isSubmitted',true);
				let inviteObj = this.currentModel.companyInvites;
				let roleId = this.currentModel.roleId;
			  let role = this.store.peekRecord('companyRole', roleId);
			  if (roleId) {
					inviteObj.set('role', role);
				}
				inviteObj.save().then((res) => {
					this.currentModel.data.set('isSubmitted',false);
					this.get('toast').success('Member has been invited successfuly');
					this.transitionTo('home.company.users' );
					console.log(res);
		        }, (err) => {
		        	inviteObj.deleteRecord();
		        	console.log(err);
		        	this.currentModel.data.set('isSubmitted',false);
		        });
			}
		}
	},
	//validate
	validate () {
		let invite = this.currentModel.companyInvites;
		let errors = this.currentModel.errors;

	    if (!invite.get('email')) {
	      errors.add('email', 'Please enter user email!');
	    } else {
	      errors.remove('email');
	    }

	    if (!this.currentModel.roleId) {
	      errors.add('role', 'Please select a role!');
	    } else {
	      errors.remove('role');
	    }

	    return errors.get('isEmpty');
	}
});

export default CompanyUsersInviteRoute;
