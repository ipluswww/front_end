/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'contetto-fe',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    REST: {
      host: 'https://gke.contetto.io',
//      host: 'http://localhost:4200/api/',
      namespace: 'v1'
    },

    'ember-simple-auth': {
      authenticationRoute: 'auth',
      routeAfterAuthentication: 'home',
      routeIfAlreadyAuthenticated: 'home'
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV['ember-cli-mirage'] = {
      enabled: false
    }

    ENV['torii'] = {
      providers: {
        'facebook-oauth2': {
          apiKey: '1039694122720349',
          redirectUri: 'http://localhost:4200'
        },
        'twitter-oauth1': {
          requestTokenUri: 'https://gke.contetto.io/social-auth/v1/social-auth/twitter?state=add',
        },
        'reddit-oauth2': {
          requestTokenUri: 'https://gke.contetto.io/social-auth/v1/social-auth/reddit?state=add',
        },
        'google-oauth2': {
          requestTokenUri: 'https://gke.contetto.io/social-auth/v1/social-auth/gplus?state=add',
        },
        'linked-in-oauth2': {
          redirectUri: 'http://localhost:4200'
        },
        'youtube-oauth2': {
          requestTokenUri: 'https://gke.contetto.io/social-auth/v1/social-auth/youtube?state=add',
        }
      }
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
