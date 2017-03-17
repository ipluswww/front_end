import Ember from 'ember';
import DS from 'ember-data';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const CampaignPostsRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	//get Toast
	toast: Ember.inject.service(),
	//model
	model () {
    	return Ember.RSVP.hash({
    		date:new Date(),
			errors: DS.Errors.create(),
	      	isPostsTabActive: true,
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

export default CampaignPostsRoute;
