import controller from './new-customers-filter.controller.js'

let NewCustomersFilter = {
    bindings: {
        list: "=",
        onSelect: '&'
    },
    controller: controller,
    controllerAs:'$ctrl',
    templateUrl: 'templates/prospect/components/new-customers-filter.component.html'
};

export default NewCustomersFilter;
