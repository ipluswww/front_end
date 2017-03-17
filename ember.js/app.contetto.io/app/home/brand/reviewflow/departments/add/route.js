import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const DepartmentAddRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
});

export default DepartmentAddRoute;
