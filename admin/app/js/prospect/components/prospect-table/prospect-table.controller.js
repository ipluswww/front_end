import _ from 'lodash';
import moment from 'moment';
import BaseOrderListController from '../../../orders/shared/controllers/base-order-list.controller';

class ProspectTableController extends BaseOrderListController {
    constructor(Order, User, $mdDialog, AlertService) {
        super(Order, User, $mdDialog, AlertService);
        this._Order = Order;
        this._User = User;
        this._$mdDialog = $mdDialog;
        this._AlertService = AlertService;
        this.init();
    }

    init() {
    }

    toggleEmail(item, field) {
        let self = this;
        let object = {_id: item._id};
        let fieldSent = field + "Sent";
        let fieldUsername = field + "Username";

        if (item[fieldSent]) {
            // if we are going to unset the existing called flag, first make double sure.
            var confirm = this._$mdDialog.confirm()
                .textContent('Are you sure you want to disable the ' + field + ' flag?')
                .ok('Yes')
                .cancel('No');
            this._$mdDialog.show(confirm).then(function() {
                // once confirm, call to api.
                object[fieldSent]= null;
                object[fieldUsername] = null;

                self._Order.update(object).then((res) => {
                    item[fieldSent] = object[fieldSent];
                    item[fieldUsername] = object[fieldUsername];
                    self._AlertService.success("The record has been successfully updated with the " + field + " information.");
                }).catch(err => {
                    this._AlertService.error(err.data.message);
                });
            }, function() {
            });

        } else {
            // reduce the payload as much as possible, only required information shall be sent.
            object[fieldSent] = new Date();
            object[fieldUsername] = this._User.current.username;
            this._Order.update(object).then((res) => {
                item[fieldSent] = object[fieldSent];
                item[fieldUsername]= object[fieldUsername];
                self._AlertService.success("The record has been successfully updated with the " + field + " information.");
            }).catch(err => {
                this._AlertService.error(err.data.message);
            });
        }
    }

    cancelItem (item) {
        const self = this;
        this._$mdDialog.show({
            controller: 'CancelDialogController as  $ctrl',
            templateUrl: 'templates/shared/_cancel_dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false
        }).then((data) => {
            let object = {
                _id: item._id,
                disposition: "CANCELLED",
                reasonCancellationDisposition: data
            };

            this._Order.update(object).then((res) => {
                item.disposition = "CANCELLED";
                self._AlertService.success("The record has been successfully marked as 'canceled'").then(res => {
                    // canceling is different, once after this, we are even going to refresh the list.
                    self.onReload();                    
                });

            }).catch(err => {
                this._AlertService.error(err.data.message);
            });
        });
    }
};

ProspectTableController.$inject = ['Order', 'User', '$mdDialog', 'AlertService'];

export default ProspectTableController;
