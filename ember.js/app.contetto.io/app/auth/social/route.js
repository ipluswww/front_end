import Ember from 'ember';

const AuthSocialRoute = Ember.Route.extend({
  beforeModel(transition) {
    window.opener.socialLoginResponse(transition.queryParams.token);
    window.close();
  }
});

export default AuthSocialRoute;
