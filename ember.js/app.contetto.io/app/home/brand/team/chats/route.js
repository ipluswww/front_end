import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

var details=[{"participant":"Jenna A & You","chatName":"Contetto","dateRange":"01-14-16 to Now"},
{"participant":"Sam H & You","chatName":"Content for GC","dateRange":"02-04-16 to 02-05-16"},
{"participant":"Dan L & You","chatName":"Staff Training","dateRange":"02-12-16 to 02-14-16"},
{"participant":"Taylor M & You","chatName":"New Ideas for Contetto","dateRange":"02-05-16 to 02-06-16"},
{"participant":"Eric M & You","chatName":"Staff Training","dateRange":"02-05-16 to 02-06-16"}];

const BrandTeamChatRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
	model () {
    		return Ember.RSVP.hash({
      			chatDetails:details,
      			isTeamChatsActive:true
    		});
  	}
});

export default BrandTeamChatRoute;
