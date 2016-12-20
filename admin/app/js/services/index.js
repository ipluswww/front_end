import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('closetboxAdmin.services', []);

import UserService from './user.service.js';
servicesModule.service('User', UserService);


// Service objects connected with API

import PersonService from './person.service.js';
servicesModule.service('Person', PersonService);

import AdminService from './admin.service.js';
servicesModule.service('Admin', AdminService);

import CustomerService from './customer.service.js';
servicesModule.service('Customer', CustomerService);

import OrderService from './order.service.js';
servicesModule.service('Order', OrderService);

import VisitorService from './visitor.service.js';
servicesModule.service('Visitor', VisitorService);

import MarketService from './market.service.js';
servicesModule.service('Market', MarketService);

import SubMarketService from './subMarket.service.js';
servicesModule.service('SubMarket', SubMarketService);

import WarehouseService from './warehouse.service.js';
servicesModule.service('Warehouse', WarehouseService);

import AgentService from './agent.service.js';
servicesModule.service('Agent', AgentService);

import DiscountService from './discount.service.js';
servicesModule.service('Discount', DiscountService);

import ParameterService from './parameter.service.js';
servicesModule.service('Parameter', ParameterService);

import RoleService from './role.service.js';
servicesModule.service('Role', RoleService);


import ContainerTypesService from './containerTypes.service.js';
servicesModule.service('ContainerTypes', ContainerTypesService);

import ContainerSubTypes from './containerSubTypes.service.js';
servicesModule.service('ContainerSubTypes', ContainerSubTypes);

import InventoryTypesService from './inventoryTypes.service.js';
servicesModule.service('InventoryTypes', InventoryTypesService);

import RoomTypesService from './roomTypes.service.js';
servicesModule.service('RoomTypes', RoomTypesService);


import SMSService from './sms.service.js';
servicesModule.service('SMSService', SMSService);


import RoomEstimatorService from './roomEstimator.service.js';
servicesModule.service('RoomEstimator', RoomEstimatorService);

import RoomScaleService from './roomScale.service.js';
servicesModule.service('RoomScale', RoomScaleService);

import ContainerService from './container.service.js';
servicesModule.service('Container', ContainerService);

import OrderSourceService from './orderSource.service.js';
servicesModule.service('OrderSource', OrderSourceService);

// Helper services
import JwtService from './jwt.service';
servicesModule.service('JWT', JwtService);

import Base64 from './base64.service';
servicesModule.service('Base64', Base64);

import SidenavExpanded from './sidenavExpanded.service';
servicesModule.service('SidenavExpanded', SidenavExpanded);


// constant service which holds zones array.
import ZonesService from './zones.service';
servicesModule.service('Zones', ZonesService);

import GoogleApiService from './googleApi.service.js';
servicesModule.service('GoogleApi', GoogleApiService);

import PaymentService from './payment.service.js';
servicesModule.service('Payment', PaymentService);

import TransactionService from './transaction.service.js';
servicesModule.service('Transaction', TransactionService);

import BraintreeTransTypeService from './braintreeTransType.service.js';
servicesModule.service('BraintreeTransType', BraintreeTransTypeService);

import AlertService from './alert.service.js';
servicesModule.service('AlertService', AlertService);

import LocalStorageService from './local-storage.service.js';
servicesModule.service('LocalStorageService', LocalStorageService);

import OrdersValidationService from './orders.validation.service';
servicesModule.service('OrdersValidationService', OrdersValidationService);

import OrdersAddressService from './orders.address.service.js';
servicesModule.service('OrdersAddressService', OrdersAddressService);

import StoredInventoryService from './stored-inventory.service.js';
servicesModule.service('StoredInventoryService', StoredInventoryService);

import Pricing from './pricing.service.js';
servicesModule.service('Pricing', Pricing);

import OrdersCustomerService from './orders.customer.service.js';
servicesModule.service('OrdersCustomerService', OrdersCustomerService);

export default servicesModule;
