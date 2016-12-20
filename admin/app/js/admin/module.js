import angular from 'angular';

import WarehousesController from './controllers/warehouses/warehouses.controller.js';
import WarehouseDetailController from './controllers/warehouses/warehousedetail.controller.js';


import AgentsController from './controllers/agents/agents.controller.js';
import AgentDetailController from './controllers/agents/agentdetail.controller.js';

import AgentWarehousesModalController from './controllers/agents/agent.warehouses.modal.controller.js';

import DiscountsController from './controllers/discounts/discounts.controller.js';
import DiscountDetailController from './controllers/discounts/discountdetail.controller.js';

import ParametersController from './controllers/parameters/parameters.controller.js';
import ParameterDetailController from './controllers/parameters/parameterdetail.controller.js';

import ContainersMainController from './controllers/containers/containers.main.controller.js';

import ContainerTypesController from './controllers/containers/containerTypes/containerTypes.controller.js';
import ContainerTypeDetailController from './controllers/containers/containerTypes/containerType.detail.controller.js';

import InventoryTypesController from './controllers/containers/inventoryTypes/inventoryTypes.controller.js';
import InventoryTypeDetailController from './controllers/containers/inventoryTypes/inventoryType.detail.controller.js';

import RoomTypesController from './controllers/containers/roomTypes/roomTypes.controller.js';
import RoomTypeDetailController from './controllers/containers/roomTypes/roomType.detail.controller.js';


import MarketsController from './controllers/markets/markets.controller.js';
import MarketDetailController from './controllers/markets/marketdetail.controller.js';


import MarketsModalController from './../shared/modals/markets.modal.controller.js';
import AgentsModalController from './../shared/modals/agents.modal.controller.js'
import MarketWarehouseModalController from './../shared/modals/marketWarehouse.modal.controller.js';

import QueryDataService from './services/querydata.service.js';
import AdminConfig from './admin.config.js';

angular
	.module('closetboxAdmin.admin', [])

	.controller('WarehousesController', WarehousesController)
	.controller('WarehouseDetailController', WarehouseDetailController)

	.controller('AgentsController', AgentsController)
	.controller('AgentDetailController', AgentDetailController)
	.controller('AgentWarehousesModalController', AgentWarehousesModalController)

	.controller('DiscountsController', DiscountsController)
	.controller('DiscountDetailController', DiscountDetailController)

	.controller('ParametersController', ParametersController)
	.controller('ParameterDetailController', ParameterDetailController)

	.controller('ContainersMainController', ContainersMainController)

	.controller('ContainerTypesController', ContainerTypesController)
	.controller('ContainerTypeDetailController', ContainerTypeDetailController)

	.controller('InventoryTypesController', InventoryTypesController)
	.controller('InventoryTypeDetailController', InventoryTypeDetailController)

	.controller('RoomTypesController', RoomTypesController)
	.controller('RoomTypeDetailController', RoomTypeDetailController)


	.controller('MarketsController', MarketsController)
	.controller('MarketDetailController', MarketDetailController)

	.controller('MarketsModalController', MarketsModalController)
	.controller('AgentsModalController', AgentsModalController)
	.controller('MarketWarehouseModalController', MarketWarehouseModalController)

	.service('QueryData', QueryDataService)
	.config(AdminConfig);
