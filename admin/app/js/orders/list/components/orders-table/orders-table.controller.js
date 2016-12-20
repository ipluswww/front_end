import _ from 'lodash';
import moment from 'moment';
import BaseOrderListController from '../../../shared/controllers/base-order-list.controller';

class OrdersTableController extends BaseOrderListController {
    constructor(Order, User, $mdDialog, AlertService) {
        super(Order, User, $mdDialog, AlertService);
        this.init();
    }

    init() {
    }

};

OrdersTableController.$inject = ['Order', 'User', '$mdDialog', 'AlertService'];

export default OrdersTableController;
