import angular from 'angular';

/* Orders */
/* orders controllers */
import ConfirmModalController from './modals/confirm.modal.controller.js';
import ParentMarketModalController from './modals/parent-market.modal.controller.js';
angular
  .module('closetboxAdmin.shared', ['closetboxAdmin.services'])
  .controller('ConfirmModalController', ConfirmModalController)
  .controller('ParentMarketModalController', ParentMarketModalController);
  