import controller from './disposition-multi-select.controller';

let DispositionMultiSelect = {
	controller: controller,
	templateUrl: 'templates/components/disposition-multi-select.component.html',
	bindings: {
		list: '=',
		onSelect: '&'
	}
};

export default DispositionMultiSelect;
