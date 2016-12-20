import controller from './call-prospect.controller.js'

let CallProspect = {
    bindings: {
        order: '='
    },
    controller: controller,
    controllerAs: '$ctrl',
    templateUrl: 'templates/prospect/components/call-prospect.component.html'
};

export default CallProspect;
