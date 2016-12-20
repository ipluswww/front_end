import controller from './available-orders-filter.controller.js'

let AvailableOrdersFilter = {
    bindings: {
        list: "=",
        onSelect: '&'
    },
    controller: controller,
    controllerAs:'$ctrl',
    templateUrl: 'templates/orders/list/components/available-orders-filter.component.html'
};

export default AvailableOrdersFilter;
