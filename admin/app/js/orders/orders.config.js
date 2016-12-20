import PickupOrderModel from '../abstract/model/pickup-order.js';
import DeliveryOrderModel from '../abstract/model/delivery-order.js';

let PickupOrdersResolve = {
	auth: (User) => {
		return User.ensureAuthIs(true);
	},
	order: (AppConstants, Order, SharedOrderService, $stateParams, $state,
			OrdersValidationService)=> {
		let order = SharedOrderService.getOrder(AppConstants.orderTypes.pickup);
		if ($stateParams.id)
			if (order && order._id === $stateParams.id)
				return order;
			else
				return Order.get($stateParams.id).then(model => {
					if(!OrdersValidationService.isPickup(model)){
						$state.go('app.orders.delivery.detail',
						{ id:model._id, customerId:model.customer._id});
					}
					else {
						return model;
					}
				});
		else {
			if (angular.isDefined(order) && order !=null && !order._id){

				if(!OrdersValidationService.isPickup(order)){
					$state.go('app.orders.delivery.detail',
					{ id:order._id, customerId:order.customer._id});
				}
				return order;
			}

			return new PickupOrderModel();
		}
	},
	customer:(Customer, $stateParams)=> {
		if(!$stateParams.customerId){
			return undefined;
		}
		return Customer.get($stateParams.customerId).then(model => model);
	},
	currentlyStoredInventory: (Container, customer) => {
		if(!customer){
			return [];
		}
		return Container.getCurrentlyStoredItemsForCustomer(customer).then(res => res.data);
	},
	spaceEstimators: (RoomScale) => {
		return RoomScale.all().then(model => model.data);
	},
	warehouseLocations: (Warehouse) => {
		return Warehouse.all().then(res => res.data);
	},
	backParam: ($stateParams) => {
		return $stateParams.back;
	},
	customerPaymentHoldOrders: (Order, customer)=>{
		return Order.getPaymentHoldOrdersForCustomer(customer).then(res => res.data);
	}
};

let DeliveryOrderResolve = {
	auth: (User) => {
		return User.ensureAuthIs(true);
	},
	order: (AppConstants, Order, SharedOrderService, OrdersValidationService, $stateParams)=> {
		let order = SharedOrderService.getOrder(AppConstants.orderTypes.delivery);
		if ($stateParams.id)
			if (order && order._id === $stateParams.id)
				return order;
			else
				return Order.get($stateParams.id).then(model => {
					if(OrdersValidationService.isPickup(model)){
						$state.go('app.orders.pickup.detail',
						{ id:model._id, customerId:model.customer._id});
					}
					else {
						return model;
					}
				});
		else {
			if (angular.isDefined(order) && order !=null && !order._id){

				if(OrdersValidationService.isPickup(order)){
					$state.go('app.orders.pickup.detail',
					{ id:order._id, customerId:order.customer._id});
				}
				return order;
			}

			return new DeliveryOrderModel();
		}
	},
	customer:(Customer, $stateParams)=> {
		if(!$stateParams.customerId){
			return undefined;
		}
		return Customer.get($stateParams.customerId).then(model => model);
	},
	currentlyStoredInventory: (Container, customer) => {
		if(!customer){
			return [];
		}
		return Container.getCurrentlyStoredItemsForCustomer(customer).then(res => res.data);
	},
	spaceEstimators: (RoomScale) => {
		return RoomScale.all().then(model => model.data);
	},
	warehouseLocations: (Warehouse) => {
		return Warehouse.all().then(res => res.data);
	},
	backParam: ($stateParams) => {
		return $stateParams.back;
	},
	customerPaymentHoldOrders: (Order, customer)=>{
		return Order.getPaymentHoldOrdersForCustomer(customer).then(res => res.data);
	}
};

let OrdersConfig = ($stateProvider, $urlRouterProvider) => {
	$stateProvider
		.state('app.orders', {
			url: '/orders',
			abstract: true,
			title: 'Orders',
			template: '<ui-view/>',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			onExit: (SharedOrderService) => {
				SharedOrderService.clear();
            }
		})

		.state('app.orders.list', {
			url: '/list',
			templateUrl: 'templates/orders/list/index.html',
			title: 'Orders',
			controller: 'OrdersController',
			controllerAs: '$ctrl',
			params: {
				id: null,
				query: {
					sort: "-requestedDate1",
					limit: 10,
					page: 1,
					search: null
				},
				markets: null,
				dispositions: null,
				availableOrders: null,
				assignments: null,
			},
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				},
				data: function(Order, OrdersHelperService, $stateParams) {
					const filter = OrdersHelperService.generateFilter($stateParams);
					return Promise.all([
						$stateParams,
						Order.list($stateParams.query, filter),
					]);
				}
			}
		})

		.state('app.orders.pickup', {
			url: '/pickup',
			abstract: true,
			template: '<ui-view />',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			}
		})
		.state('app.orders.pickup.detail', {
			url: '/detail/:id?',
			templateUrl: 'templates/orders/pickup/orders.detail.html',
			title: 'Orders',
			controller: 'OrderPickupDetailController',
			controllerAs: 'detail',
			params: {
				back: null
			},
			resolve: PickupOrdersResolve
		})
		.state('app.orders.pickup.create', {
			url: '/create/:id?',
			templateUrl: 'templates/orders/pickup/orders.creation.html',
			title: 'Orders',
			controller: 'OrderPickupCreationController',
			controllerAs: 'orderCreation',
			params: {
				back: null
			},
			resolve: PickupOrdersResolve
		})


		.state('app.orders.delivery', {
			url: '/delivery/:customerId',
			abstract: true,
			template: '<ui-view />',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			}
		})

		.state('app.orders.delivery.detail', {
			url: '/detail/:id?',
			templateUrl: 'templates/orders/delivery/orders.detail.html',
			controller: 'OrderDeliveryDetailController',
      		controllerAs: 'detail',
			title: 'Orders',
			params: {
				back: null
			},
			resolve: DeliveryOrderResolve
		})
		.state('app.orders.delivery.create', {
			url: '/create/:id?',
			templateUrl: 'templates/orders/delivery/orders.creation.html',
			title: 'Orders',
			controller: 'OrderDeliveryCreationController',
			controllerAs: 'orderCreation',
			params: {
				back: null
			},
			resolve: DeliveryOrderResolve
		});
};

OrdersConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default OrdersConfig;
