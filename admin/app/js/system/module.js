import angular from 'angular';
import AccessController from './controllers/access.controller.js';
import MarketsModalController from './../shared/modals/markets.modal.controller.js';
import WarehousesModalController from './controllers/warehouses.modal.controller.js';
import PasswordModalController from './controllers/password.modal.controller.js';
import SystemConfig from './system.config.js';

angular
	.module('closetboxAdmin.system', [])
	.controller('AccessController', AccessController)
	.controller('MarketsModalController', MarketsModalController)
	.controller('WarehousesModalController', WarehousesModalController)
	.controller('PasswordModalController', PasswordModalController)
	.config(SystemConfig);
