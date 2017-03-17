import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const HomeIndexRoute = Ember.Route.extend(AuthenticatedRouteMixin, {

});

export default HomeIndexRoute;
