import angular from 'angular';
import ProfileController from './controllers/profile.controller.js';
import AgentsModalController from '../shared/modals/agents.modal.controller.js';
import ProfileConfig from './profile.config.js';

angular
  .module('closetboxAdmin.profile', [])
  .controller('ProfileController', ProfileController)
  .controller('AgentsModalController', AgentsModalController)
  .config(ProfileConfig);
