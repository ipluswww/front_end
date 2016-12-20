import controller from './simple-search-box.controller';

let SimpleSearchBox = {
	controller: controller,
	controllerAs: 'searchCtrl',
	templateUrl: 'templates/components/simple-search-box.component.html',
	bindings: {
		ngModel: '=',
		onSearch: '&'
	}
};

export default SimpleSearchBox;
