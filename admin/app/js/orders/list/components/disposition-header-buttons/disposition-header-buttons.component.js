import controller from './disposition-header-buttons.controller.js'

let DispositionHeaderButtons = {
    bindings: {
        order: "="
    },
    controller: controller,
    controllerAs:'$ctrl',
    templateUrl: 'templates/orders/list/components/disposition-header-buttons.component.html'
};

export default DispositionHeaderButtons;
