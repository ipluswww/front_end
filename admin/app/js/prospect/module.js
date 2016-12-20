import angular from 'angular';

import NewCustomersFilter from './components/new-customers-filter/new-customers-filter.component';
import ProspectTable from './components/prospect-table/prospect-table.component';
import InquiriesTable from './components/inquiries-table/inquiries-table.component';
import EditProspectComponent from './components/edit-prospect/edit-prospect.component';
import CallProspectComponent from './components/call-prospect/call-prospect.component';

import ProspectListController from './controllers/prospect.list.controller.js';
import PhoneActionModalController from '../shared/modals/phonemodal.controller.js';
import CancelDialogController from '../shared/modals/cancel.dialog.controller.js';
import ConvertDialogController from './controllers/convert.dialog.controller.js';

import SelectedProspectService from './services/selectedProspect.service.js';
import ProspectHelperService from './services/prospect.helper.service.js';

import orderidifyFilter from './filter/orderidify.filter.js';

import ProspectConfig from './prospect.config.js';

angular
	.module('closetboxAdmin.prospect', [])

	.component('cbNewCustomersFilter', NewCustomersFilter)
	.component('cbProspectTable', ProspectTable)
	.component('cbInquiriesTable', InquiriesTable)
	.component('cbEditProspect', EditProspectComponent)
	.component('cbCallProspect', CallProspectComponent)

	.controller('ProspectListController', ProspectListController)

	.controller('PhoneActionModalController', PhoneActionModalController)
	.controller('CancelDialogController', CancelDialogController)
	.controller('ConvertDialogController', ConvertDialogController)

	.service('SelectedProspectService', SelectedProspectService)
	.service('ProspectHelperService', ProspectHelperService)
	.filter('orderidify', orderidifyFilter)

	.config(ProspectConfig);
