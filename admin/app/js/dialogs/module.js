import angular from 'angular';
import BaseDialog from './base/dialog.base.js';
import ConfirmDialog from './confirm/dialog.confirm.js';
import ConfirmDialogCtrl from './confirm/dialog.confirm.controller.js';
import AlertDialog from './alert/dialog.alert.js';
import AlertDialogCtrl from './alert/dialog.alert.controller.js';
import EditCustomerDialog from './edit-customer/dialog.edit-customer';
import EditCustomerDialogCtrl from './edit-customer/dialog.edit-customer.controller';

angular
	.module('closetboxAdmin.dialogs', [])
    .service('BaseDialog', BaseDialog)
    .service('ConfirmDialog', ConfirmDialog)
    .controller('ConfirmDialogCtrl', ConfirmDialogCtrl)
    .service('AlertDialog', AlertDialog)
    .controller('AlertDialogCtrl', AlertDialogCtrl)
	.service('EditCustomerDialog', EditCustomerDialog)
	.controller('EditCustomerDialogCtrl', EditCustomerDialogCtrl);
