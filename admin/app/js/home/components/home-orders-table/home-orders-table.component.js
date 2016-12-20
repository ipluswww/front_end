import controller from './home-orders-table.controller.js'

let HomeOrdersTable = {
    bindings: {
        list: '=',
        options: '=',
        total: '<',
        onSelect: '&',
        onReload: '&'   
    },
    controller: controller,
    controllerAs:'$ctrl',
    templateUrl: 'templates/home/components/home-orders-table.component.html'
};

export default HomeOrdersTable;
