import controller from './order-notes.controller';

let OrderNotes = {
	controller: controller,
	templateUrl: 'templates/orders/shared/component/order-notes.component.html',
	bindings: {
		order: '='
	}
};

export default OrderNotes;
