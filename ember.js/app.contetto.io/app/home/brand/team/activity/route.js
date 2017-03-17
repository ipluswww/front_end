import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

var _act=[{Name:"James",Activity:"Approved post for contetto",Date:"03-17-16"},
{Name:"Amy M",Activity:"Uploaded 3 new files",Date:"03-16-16"},
{Name:"Jamie D",Activity:"Made new notes on Gorgeous",Date:"03-15-16"},
{Name:"Frank H",Activity:"Assigned 2 new tasks",Date:"03-15-16"}];
const TeamActivityRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	model () {
    		return Ember.RSVP.hash({
      			activity:_act,
      			isTeamActivityActive: true
    		});
  	}
});

export default TeamActivityRoute;
