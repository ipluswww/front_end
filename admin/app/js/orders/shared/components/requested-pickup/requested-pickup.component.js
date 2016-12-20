import controller from './requested-pickup.controller.js'

let RequestedPickup = {
	bindings: {
		order:'=',
		isLocked:'<'
	},
  controller: controller,
  controllerAs:'requestedPickup',
	templateUrl: 'templates/orders/shared/component/requested-pickup.component.html'
};



export default RequestedPickup;
