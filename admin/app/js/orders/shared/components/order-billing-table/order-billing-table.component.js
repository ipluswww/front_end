import controller from './order-billing-table.controller';

let OrderBillingTable = {
    bindings: {
        order: '<'
    },
    controller: controller,
    controllerAs:'$ctrl',
    templateUrl: 'templates/orders/shared/component/order-billing-table.component.html'
};

export default OrderBillingTable;
