import angular from 'angular';
import AuthController from './controllers/auth.controller.js';
import PasswordController from './controllers/password.controller.js';
import AuthConfig from './auth.config.js';

angular
  .module('closetboxAdmin.auth', [])
  .config(AuthConfig)
  .controller('AuthController', AuthController)
  .controller('PasswordController', PasswordController);
