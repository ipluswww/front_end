import controller from './market-multi-select.controller';

let MarketMultiSelect = {
	controller: controller,
	templateUrl: 'templates/components/market-multi-select.component.html',
	bindings: {
		list: '=',
		ngInputMarkets: '<',
		onSelect: '&'
	}
};

export default MarketMultiSelect;
