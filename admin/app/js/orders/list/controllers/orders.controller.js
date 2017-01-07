import _ from 'lodash';
import AbstractController from '../../../abstract/abstract.controller.js';
class  OrdersController extends AbstractController {
    constructor ($q, User, $state, $mdDialog, $mdToast, data){
        super($q, User, $state, $mdDialog, $mdToast);
        this._$state = $state;

        const params = data[0];
        const orders = data[1];
        this.totalCount = orders.count;
        this.orders = orders.data;

        this.init(params);
    }

    init(params) {
        this.query = params.query;
        this.marketFilter = params.markets;
        this.dispositionFilter = params.dispositions;
        this.availableOrdersFilter = params.availableOrders;
        this.assignmentsFilter = params.assignments;

        if (params.id) {
            const item = _.find(this.orders, {_id: params.id});
            if (item) {
                this.showOrder(item);
            }
        }
    }

    getData() {
        const params = {
            query: this.query,
            markets: this.marketFilter,
            dispositions: this.dispositionFilter,
            availableOrders: this.availableOrdersFilter,
            assignments: this.assignmentsFilter
        };
        this._$state.go(this._$state.current, params, {reload: true, notify: true, inherit: false});
    }

    showOrder(order) {
        this.selectedOrder = order;
    }
}

OrdersController.$inject = ['$q', 'User', '$state', '$mdDialog', '$mdToast', 'data'];
export default OrdersController;
