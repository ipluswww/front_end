import controller from './order-requested-dates-picker.controller';

let OrderRequestedDatesPicker = {
	controller: controller,
	templateUrl: 'templates/orders/shared/component/order-requested-dates-picker.component.html',
	bindings: {
		order: '='
	}
};

export default OrderRequestedDatesPicker;
