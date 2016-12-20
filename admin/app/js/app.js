import angular from 'angular';
import 'angular-sanitize';
import 'angular-ui-router';
import 'angular-messages';
import 'angular-material';
import 'angular-material-icons';
import 'angular-material-data-table';
import 'ng-tags-input';
import 'ng-file-upload';
import 'v-accordion';
import 'd3';
import 'nvd3';
import 'angular-nvd3';
import 'trix';
import 'angular-trix';
import 'angular-simple-logger';
import 'angular-google-maps';
import './angular-material-datetimepicker'; // due to its internal bug of library itself, we had to go with manual copy
import '@iamadamjowett/angular-click-outside/clickoutside.directive.js';
import 'ng-sortable';
import constants from './config/app.constants.js'
import appConfig from './config/app.config.js';
import stateDecorator from './config/state.decorator.js';
import './services';
import './components';
import './shared/module.js';
import './layouts/module.js';
import './dialogs/module.js';
import './home/module.js';
import './auth/module.js';
import './profile/module.js';
import './system/module.js';
import './admin/module.js';
import './reports/module.js';
import './prospect/module.js';
import './logistics/module.js';
import './orders/module.js';

let dependencies = [
  'ngSanitize',
  'ui.router',
  'ngMaterial',
  'ngMessages',
  'md.data.table',
  'nvd3',
  'ngTagsInput',
  'vAccordion',
  'angularTrix',
  'uiGmapgoogle-maps',
  'ngMaterialDatePicker',
  'ngFileUpload',
  'angular-click-outside',
  'as.sortable',
  'closetboxAdmin.shared',
  'closetboxAdmin.layout',
  'closetboxAdmin.services',
  'closetboxAdmin.components',
  'closetboxAdmin.home',
  'closetboxAdmin.auth',
  'closetboxAdmin.profile',
  'closetboxAdmin.system',
  'closetboxAdmin.admin',
  'closetboxAdmin.report',
  'closetboxAdmin.prospect',
  'closetboxAdmin.logistics',
  'closetboxAdmin.dialogs',
  'closetboxAdmin.orders'
];

angular
  .module('closetboxAdmin', dependencies)
  .constant('AppConstants', constants)
  .config(appConfig)
  .decorator("$state", stateDecorator)
  .run(['$rootScope','User', ($rootScope, User)=>{
      $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error)=> {
            console.log('ROUTE ERROR:');
            console.log({event:event, toState:toState, toParams:toParams, fromState, fromParams, error:error});
            User.logoutIfNoJwt();
          });
  }]);
