import _ from 'lodash';
import moment from 'moment';
import BaseOrderListController from '../../../orders/shared/controllers/base-order-list.controller';

class HomeOrdersTableController extends BaseOrderListController {
// class HomeOrdersTableController {
    constructor(Order, User, $mdDialog, AlertService) {
        super(Order, User, $mdDialog, AlertService);
        this.init();
    }

    init() {
    }

    openScheduleModal(item) {
        this._$mdDialog.show({
            controller: 'ScheduleModalController as  $ctrl',
            templateUrl: 'templates/shared/_schedule_dialog.html',
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            locals: {order: item}
        }).then((data) => {
            this.reload();
        });
    }

    addressString(item) {
        if (item.goingToWarehouse === true) {
            if (item.tasks && item.tasks['Customer Dropoff/Pickup'] === true) {
                return "Drop Off Access: " + (item.terminalLocation.address || "") + " / " + (item.originationLocation.address || "");
            } else {
                return "Pickup At: " + item.customer.location.address;
            }
        } else {
            if (item.tasks && item.tasks['Customer Dropoff/Pickup'] === true) {
                return "Pick Up Access: " + (item.originationLocation.address || "") + " / " + (item.terminalLocation.address || "");
            } else {
                return "Deliver To: " + item.customer.location.address;
            }
        }
    }
};

HomeOrdersTableController.$inject = ['Order', 'User', '$mdDialog', 'AlertService'];

export default HomeOrdersTableController;
