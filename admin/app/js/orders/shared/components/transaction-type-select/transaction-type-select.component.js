import controller from './transaction-type-select.controller';

let TransactionTypeSelect = {
	controller: controller,
	templateUrl: 'templates/orders/shared/component/transaction-type-select.component.html',
	bindings: {
		ngModel: '='
	}
};

export default TransactionTypeSelect;
