import controller from './discount-code.controller.js';

let DiscountCode = {
	bindings: {
		order:'<',
		isLocked:'<',
		onDiscountChanged:'&'
	},
  controller: controller,
  controllerAs:'discountCode',
	templateUrl: 'templates/orders/shared/component/discount-code.component.html'
};

export default DiscountCode;
