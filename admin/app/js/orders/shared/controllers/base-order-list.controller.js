import _ from 'lodash';
import moment from 'moment';

let baseOrderListController;

class BaseOrderListController {
    constructor (Order, User, $mdDialog, AlertService) {
        this._Order = Order;
        this._User = User;
        this._$mdDialog = $mdDialog;
        this._AlertService = AlertService;
        baseOrderListController = this;

        this.init();
    }

    init() {
    }

    reload() {
        this.onReload();
    }

    onPagination (page, limit) {
        baseOrderListController.options.page = page;
        baseOrderListController.options.limit = limit;
        baseOrderListController.reload();
    }

    onOrder (order) {
        baseOrderListController.options.sort = order;
        baseOrderListController.reload();
    }

    selectItem(item) {
        this.onSelect({item: item});
    }

    openPhoneCallModal(item) {
        this._$mdDialog.show({
            controller: 'PhoneActionModalController as  $ctrl',
            templateUrl: '../../../templates/shared/_phone_action_dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            locals: {number: item.customer.mobile, order: item, _Service: this._Order}
        }).then((data) => {
        });
    }

}

export default BaseOrderListController;
