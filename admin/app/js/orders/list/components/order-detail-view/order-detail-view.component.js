import controller from './order-detail-view.controller.js'

let OrderDetailView = {
    bindings: {
        order: '=',
        onUpdate: '&'
    },
    controller: controller,
    controllerAs:'$ctrl',
    templateUrl: 'templates/orders/list/components/order-detail-view.component.html'
};

export default OrderDetailView;
