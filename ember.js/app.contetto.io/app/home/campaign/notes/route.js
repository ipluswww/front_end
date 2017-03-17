import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const BrandCampaignNotesRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	//get Toast
	toast: Ember.inject.service(),
	//model
	model () {
    	return Ember.RSVP.hash({
			errors: DS.Errors.create(),
	      	isNotesTabActive: true,
		    data: Ember.Object.create({
		        isSubmitted: false
		    })
	    });
	},
	//actions
	actions: {

	},
	//validate
	validate () {
		return 1;
	}
});

export default BrandCampaignNotesRoute;
