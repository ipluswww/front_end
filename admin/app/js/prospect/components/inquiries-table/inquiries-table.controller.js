import _ from 'lodash';
import moment from 'moment';

let inquiriesTableController;
class InquiriesTableController {
    constructor(Visitor, User, $mdDialog, $mdEditDialog, AlertService) {
        inquiriesTableController = this;
        this._Visitor = Visitor;
        this._User = User;
        this._$mdDialog = $mdDialog;
        this._$mdEditDialog = $mdEditDialog;
        this._AlertService = AlertService;
        this.init();
    }

    init() {
        this.expandedEntries = {
            note: [],
            message: []
        }
    }

    reload() {
        this.onReload();
    }

    onPagination (page, limit) {
        inquiriesTableController.options.page = page;
        inquiriesTableController.options.limit = limit;
        inquiriesTableController.reload();
    }

    onOrder (order) {
        inquiriesTableController.options.sort = order;
        inquiriesTableController.reload();
    }

    openPhoneCallModal(item) {
        this._$mdDialog.show({
            controller: 'PhoneActionModalController as  $ctrl',
            templateUrl: 'templates/shared/_phone_action_dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            locals: {number: item.mobile, order: null, _Service: this._Visitor}
        }).then((data) => {
        });
    }

    isEntryExpanded (item, type) {
        return (_.indexOf(this.expandedEntries[type], item._id) >= 0);
    }

    expandTextWrapper(item, type) {
        this.expandedEntries[type].push(item._id);
    }

    editCellValue (event, item) {
        let self = this;
        event.stopPropagation();
        // prepare edit dialog
        let editDialog = {
            modelValue: item.notesVisitor,
            placeholder: 'Input note',
            save: function (input) {
                // upon losing focus
                item.notesVisitor = input.$modelValue;

                let object = {
                    _id: item._id,
                    notesVisitor: input.$modelValue
                };
                self._Visitor.update(object).then((res) => {
                    self._AlertService.success("The visitor record has been successfully updated with the note information.")
                })
            },
            targetEvent: event,
            title: 'Input note'
        };

        // Open the edit dialog
        this._$mdEditDialog.small(editDialog);
    }

    toggleCall(item) {
        let self = this;
        if (item.called) {
            // if we are going to unset the existing called flag, first make double sure.
            var confirm = this._$mdDialog.confirm()
                .textContent('Are you sure you want to disable the called flag?')
                .ok('Yes')
                .cancel('No');
            this._$mdDialog.show(confirm).then(function() {
                // reduce the payload as much as possible, only required information shall be sent.
                let object = {
                    called: null,
                    calledUser: null,
                    _id: item._id
                }
                self._Visitor.update(object).then((res) => {
                    item.called = null;
                    item.calledUser = null;
                    self._AlertService.success("The record has been successfully updated with the call information.");
                }).catch(err => {
                    this._AlertService.error(err.data.message);
                });
            }, function() {
            });

        } else {
            // reduce the payload as much as possible, only required information shall be sent.
            let object = {
                called: new Date(),
                calledUser: this._User.current.username,
                _id: item._id
            }
            self._Visitor.update(object).then((res) => {
                item.called = res.called;
                item.calledUser = res.calledUser;
                self._AlertService.success("The record has been successfully updated with the call information.");
            }).catch(err => {
                this._AlertService.error(err.data.message);
            });
        }
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

                self._Visitor.update(object).then((res) => {
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
            this._Visitor.update(object).then((res) => {
                item[fieldSent] = object[fieldSent];
                item[fieldUsername]= object[fieldUsername];
                self._AlertService.success("The record has been successfully updated with the " + field + " information.");
            }).catch(err => {
                this._AlertService.error(err.data.message);
            });
        }
    }

    convertInquiry(item) {
        this._$mdDialog.show({
            controller: 'ConvertDialogController as  $ctrl',
            templateUrl: 'templates/prospect/_convert_dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true
        }).then((data) => {
            if (data === 'order') {
                // start to convert it to order
                // Not this straightforward yet.
                // this._$state.go('app.orders', {id: item._id});
            }

            if (data === 'prospect') {
                // start to convert it to prospect
                alert('TODO: convert it to prospect');
            }
        });
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

            this._Visitor.update(object).then((res) => {
                item.disposition = "CANCELLED";
                self._AlertService.success("The record has been successfully marked as 'canceled'");

                // canceling is different, once after this, we are even going to refresh the list.
                self.reload();
            }).catch(err => {
                this._AlertService.error(err.data.message);
            });
        });
    }
};

InquiriesTableController.$inject = ['Visitor', 'User', '$mdDialog', '$mdEditDialog', 'AlertService'];

export default InquiriesTableController;
