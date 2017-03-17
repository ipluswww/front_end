import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const EmailIncomingAccountsRoute = Ember.Route.extend(AuthenticatedRouteMixin, {
});

export default EmailIncomingAccountsRoute;
