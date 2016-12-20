import _ from 'lodash';

let authInterceptor = function (JWT, AppConstants, $window, $q) {

  return {
    // automatically attach Authorization header
    request: function(config) {
      if(config.url.indexOf(AppConstants.api) === 0 && JWT.get()) {
        config.headers.Authorization = 'Bearer ' + JWT.get();
        if ( _.keys(config.headers).indexOf('Content-Type') < 0 ) {
          config.headers['Content-Type'] = 'application/json';
        }
      }

      return config;
    },

    // Handle 401
    responseError: function(rejection) {
      /* We want to get rid of this unnecessary error handling
      if (rejection.status === 401) {
        // clear any JWT token being stored
        JWT.destroy();
        // do a hard page refresh
	    // TODO: should be uncommented back after test
        $window.location.reload();
      }*/
      return $q.reject(rejection);
    }

  }
}

authInterceptor.$inject = ['JWT', 'AppConstants', '$window', '$q'];

export default authInterceptor;