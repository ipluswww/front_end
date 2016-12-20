import controller from './edit-prospect.controller.js'

let EditProspect = {
	bindings: {
		data: '=',
        onClosePanel: '&'
	},
	controller: controller,
	controllerAs: '$editCtrl',
	templateUrl: 'templates/prospect/components/edit-prospect.component.html'
};

export default EditProspect;
