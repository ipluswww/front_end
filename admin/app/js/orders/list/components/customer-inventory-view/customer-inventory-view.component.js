import controller from './customer-inventory-view.controller.js'

let CustomerInventoryView = {
    bindings: {
        inventory: "<",
        space: "<"
    },
    controller: controller,
    controllerAs:'$ctrl',
    templateUrl: 'templates/orders/list/components/customer-inventory-view.component.html'
};

export default CustomerInventoryView;
