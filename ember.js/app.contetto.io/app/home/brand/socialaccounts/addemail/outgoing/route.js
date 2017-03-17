import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const EmailOutgoingAccountsRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
});

export default EmailOutgoingAccountsRoute;
