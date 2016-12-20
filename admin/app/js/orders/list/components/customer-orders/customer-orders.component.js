import controller from './customer-orders.controller.js'

let OrderDetailView = {
    bindings: {
        customer: '<',
        except: '<'
    },
    controller: controller,
    controllerAs:'$ctrl',
    templateUrl: 'templates/orders/list/components/customer-orders.component.html'
};

export default OrderDetailView;
