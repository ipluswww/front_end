let AdminConfig = function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('app.admin', {
			abstract: true,
			url: '/admin',
			template: '<ui-view />'
		})


		.state('app.admin.warehouse', {
			abstract: true,
			url: '/warehouses',
			template: '<ui-view />'
		})
		.state('app.admin.warehouse.list', {
			url: '/list',
			templateUrl: 'templates/admin/warehouse/list.html',
			title: 'Admin / Warehouses',
			controller: 'WarehousesController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			}
		})
		.state('app.admin.warehouse.new', {
			url: '/new',
			templateUrl: 'templates/admin/warehouse/detail.html',
			title: 'Admin / Warehouse',
			controller: 'WarehouseDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true
			}
		})
		.state('app.admin.warehouse.detail', {
			url: '/:id',
			templateUrl: 'templates/admin/warehouse/detail.html',
			title: 'Admin / Warehouse',
			controller: 'WarehouseDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: false
			}
		})
		.state('app.admin.warehouse.edit', {
			url: '/:id/edit',
			templateUrl: 'templates/admin/warehouse/detail.html',
			title: 'Admin / Warehouse',
			controller: 'WarehouseDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true
			}
		})



		.state('app.admin.agent', {
			abstract: true,
			url: '/agents',
			template: '<ui-view />'
		})
		.state('app.admin.agent.list', {
			url: '/list',
			templateUrl: 'templates/admin/agent/list.html',
			title: 'Admin / Agents',
			controller: 'AgentsController as $ctrl',
			params: {
				sort: "",
				limit: 10,
				page: 1,
				search: null
			},
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				},
				data: function(Agent, $stateParams) {
					return Agent.list($stateParams);
				}
			}
		})
		.state('app.admin.agent.new', {
			url: '/new',
			templateUrl: 'templates/admin/agent/detail.html',
			title: 'Admin / Agent',
			controller: 'AgentDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true
			}
		})
		.state('app.admin.agent.detail', {
			url: '/:id',
			templateUrl: 'templates/admin/agent/detail.html',
			title: 'Admin / Agent',
			controller: 'AgentDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: false
			}
		})
		.state('app.admin.agent.edit', {
			url: '/:id/edit',
			templateUrl: 'templates/admin/agent/detail.html',
			title: 'Admin / Agent',
			controller: 'AgentDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true
			}
		})



		.state('app.admin.discount', {
			abstract: true,
			url: '/discounts',
			template: '<ui-view />'
		})
		.state('app.admin.discount.list', {
			url: '/list',
			templateUrl: 'templates/admin/discount/list.html',
			title: 'Admin / Discounts',
			controller: 'DiscountsController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			}
		})
		.state('app.admin.discount.new', {
			url: '/new',
			templateUrl: 'templates/admin/discount/detail.html',
			title: 'Admin / Discount',
			controller: 'DiscountDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true
			}
		})
		.state('app.admin.discount.detail', {
			url: '/:id',
			templateUrl: 'templates/admin/discount/detail.html',
			title: 'Admin / Discount',
			controller: 'DiscountDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: false
			}
		})
		.state('app.admin.discount.edit', {
			url: '/:id/edit',
			templateUrl: 'templates/admin/discount/detail.html',
			title: 'Admin / Discount',
			controller: 'DiscountDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true
			}
		})



		.state('app.admin.parameter', {
			abstract: true,
			url: '/parameters',
			template: '<ui-view />'
		})
		.state('app.admin.parameter.list', {
			url: '/list',
			templateUrl: 'templates/admin/parameter/list.html',
			title: 'Admin / Parameters',
			controller: 'ParametersController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			}
		})
		.state('app.admin.parameter.new', {
			url: '/new',
			templateUrl: 'templates/admin/parameter/detail.html',
			title: 'Admin / Parameter',
			controller: 'ParameterDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true
			}
		})
		.state('app.admin.parameter.detail', {
			url: '/:id',
			templateUrl: 'templates/admin/parameter/detail.html',
			title: 'Admin / Parameter',
			controller: 'ParameterDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: false
			}
		})
		.state('app.admin.parameter.edit', {
			url: '/:id/edit',
			templateUrl: 'templates/admin/parameter/detail.html',
			title: 'Admin / Parameter',
			controller: 'ParameterDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true
			}
		})


		.state('app.admin.containerTypes', {
			url: '/container-types',
			abstract: true,
			templateUrl: 'templates/admin/containers/main.html',
			controller: 'ContainersMainController as $ctrl'
		})
		.state('app.admin.containerTypes.list', {
			url: '/list',
			templateUrl: 'templates/admin/containers/containerTypes/list.html',
			title: 'Admin / Container Types',
			controller: 'ContainerTypesController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			}
		})
		.state('app.admin.containerTypes.new', {
			url: '/new',
			templateUrl: 'templates/admin/containers/containerTypes/detail.html',
			title: 'Admin / Container Types',
			controller: 'ContainerTypeDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true
			}
		})
		.state('app.admin.containerTypes.detail', {
			url: '/:id',
			templateUrl: 'templates/admin/containers/containerTypes/detail.html',
			title: 'Admin / Container Types',
			controller: 'ContainerTypeDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: false
			}
		})
		.state('app.admin.containerTypes.edit', {
			url: '/:id/edit',
			templateUrl: 'templates/admin/containers/containerTypes/detail.html',
			title: 'Admin / Container Types',
			controller: 'ContainerTypeDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true
			}
		})








		.state('app.admin.inventoryTypes', {
			url: '/inventory-types',
			abstract: true,
			templateUrl: 'templates/admin/containers/main.html',
			controller: 'ContainersMainController as $ctrl'
		})
		.state('app.admin.inventoryTypes.list', {
			url: '/list',
			templateUrl: 'templates/admin/containers/inventoryTypes/list.html',
			title: 'Admin / Inventory Types',
			controller: 'InventoryTypesController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			}
		})
		.state('app.admin.inventoryTypes.new', {
			url: '/new',
			templateUrl: 'templates/admin/containers/inventoryTypes/detail.html',
			title: 'Admin / Inventory Types',
			controller: 'InventoryTypeDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true
			}
		})
		.state('app.admin.inventoryTypes.detail', {
			url: '/:id',
			templateUrl: 'templates/admin/containers/inventoryTypes/detail.html',
			title: 'Admin / Inventory Types',
			controller: 'InventoryTypeDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: false
			}
		})
		.state('app.admin.inventoryTypes.edit', {
			url: '/:id/edit',
			templateUrl: 'templates/admin/containers/inventoryTypes/detail.html',
			title: 'Admin / Inventory Types',
			controller: 'InventoryTypeDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true
			}
		})





		.state('app.admin.roomTypes', {
			url: '/room-types',
			abstract: true,
			templateUrl: 'templates/admin/containers/main.html',
			controller: 'ContainersMainController as $ctrl'
		})
		.state('app.admin.roomTypes.list', {
			url: '/list',
			templateUrl: 'templates/admin/containers/roomTypes/list.html',
			title: 'Admin / Room Types',
			controller: 'RoomTypesController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			}
		})
		.state('app.admin.roomTypes.new', {
			url: '/new',
			templateUrl: 'templates/admin/containers/roomTypes/detail.html',
			title: 'Admin / Room Types',
			controller: 'RoomTypeDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true
			}
		})
		.state('app.admin.roomTypes.detail', {
			url: '/:id',
			templateUrl: 'templates/admin/containers/roomTypes/detail.html',
			title: 'Admin / Room Types',
			controller: 'RoomTypeDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: false
			}
		})
		.state('app.admin.roomTypes.edit', {
			url: '/:id/edit',
			templateUrl: 'templates/admin/containers/roomTypes/detail.html',
			title: 'Admin / Room Types',
			controller: 'RoomTypeDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true
			}
		})



		.state('app.admin.market', {
			abstract: true,
			url: '/markets',
			template: '<ui-view />'
		})
		.state('app.admin.market.list', {
			url: '/list',
			templateUrl: 'templates/admin/market/list.html',
			title: 'Admin / Markets',
			controller: 'MarketsController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			}
		})
		.state('app.admin.market.new', {
			url: '/new',
			templateUrl: 'templates/admin/market/detail.html',
			title: 'Admin / Markets',
			controller: 'MarketDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true,
				subMarket: false
			}
		})
		.state('app.admin.market.detail', {
			url: '/:id',
			templateUrl: 'templates/admin/market/detail.html',
			title: 'Admin / Markets',
			controller: 'MarketDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: false,
				subMarket: false
			}
		})
		.state('app.admin.market.edit', {
			url: '/:id/edit',
			templateUrl: 'templates/admin/market/detail.html',
			title: 'Admin / Markets',
			controller: 'MarketDetailController as $ctrl',
			resolve:{
				auth: function(User) {
					return User.ensureAuthIs(true);
				}
			},
			data: {
				edit: true,
				subMarket: false
			}
		})


	;

};

AdminConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

export default AdminConfig;
