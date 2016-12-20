import controller from './assignments-filter.controller.js'

let AssignmentsFilter = {
    bindings: {
        list: "=",
        onSelect: '&'
    },
    controller: controller,
    controllerAs:'$ctrl',
    templateUrl: 'templates/orders/list/components/assignments-filter.component.html'
};

export default AssignmentsFilter;
