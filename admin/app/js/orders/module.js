import angular from 'angular';
import OrdersConfig from './orders.config.js';

/* Orders */
/* orders controllers */
import OrdersController from './list/controllers/orders.controller.js';

/* orders components */
import AvailableOrdersFilter from './list/components/available-orders-filter/available-orders-filter.component';
import AssignmentsFilter from './list/components/assignments-filter/assignments-filter.component';
import OrdersTable from './list/components/orders-table/orders-table.component';
import OrderDetailView from './list/components/order-detail-view/order-detail-view.component';
import CustomerOrders from './list/components/customer-orders/customer-orders.component';
import DispositionHeaderButtons from './list/components/disposition-header-buttons/disposition-header-buttons.component';
import CustomerInventoryView from './list/components/customer-inventory-view/customer-inventory-view.component';

/* orders services */
import OrdersHelperService from './list/services/orders.helper.service.js';

/* Shared */
/* Shared component */
import CustomerOrderAccountInfo from './shared/components/customer-order-account-info/customer-order-account-info.component';
import RequestedPickup from './shared/components/requested-pickup/requested-pickup.component';

import CustomerEmailLookup from './shared/components/customer-email-lookup/customer-email-lookup.component';
import ZipcodeLookup from './shared/components/zipcode-lookup/zipcode-lookup.component';

import PaymentMethod from './shared/components/payment-method/payment-method.component';
import DefaultPaymentMethod from './shared/components/payment-method/default-payment-method.component';
import AddPaymentMethod from './shared/components/payment-method/add-payment-method.component';
import PaymentMethodSelection from './shared/components/payment-method/payment-method-selection.component';

import CustomerDropoffPickup from './shared/components/customer-dropoff-pickup/customer-dropoff-pickup.component';
import DiscountCode from './shared/components/discount-code/discount-code.component';
import OrderParameterAdditions from './shared/components/order-parameter-additions/order-parameter-additions.component';
import InventoryToCapacityDisplay from './shared/components/inventory-to-capacity-display/inventory-to-capacity-display.component';
import CurrentlyStoredItemCount from './shared/components/currently-stored-count/currently-stored-count.component';
import SubscriptionSummary from './shared/components/subscription-summary/subscription-summary.component';
import ItemPriceDisplay from './shared/components/item-price-display/item-price-display.component';
import SpacePriceDisplay from './shared/components/space-price-display/space-price-display.component';
import JumpToInventory from './shared/components/jump-to-inventory/jump-to-inventory.component';
import AssignOrder from './shared/components/assign-order/assign-order.component';

import TransactionTypeSelect from './shared/components/transaction-type-select/transaction-type-select.component';
import OrderRequestedDatesPicker from './shared/components/order-requested-dates-picker/order-requested-dates-picker.component';
import OrderNotes from './shared/components/order-notes/order-notes.component';
import OrderEvents from './shared/components/order-events/order-events.component';
import OrderInventories from './shared/components/order-inventories/order-inventories.component';
import OrderBillingTable from './shared/components/order-billing-table/order-billing-table.component'
import OrderPayment from './shared/components/order-payment/order-payment.component';
import AdditionalInsurance from './shared/components/additional-insurance/additional-insurance.component';
import InsuranceCoverage from './shared/components/insurance-coverage/insurance-coverage.component';
import OrderTitle from './shared/components/order-title/order-title.component';


/* shared services */
import SharedOrderService from './shared/services/shared.order.service.js';
import SharedOrderHelperService from './shared/services/shared.order.helper.service.js';

/* Pickups */
/* pickup controllers */
import OrderPickupCreationController from './pickup/controllers/order.pickup.creation.controller.js';
import OrderPickupDetailController from './pickup/controllers/order.pickup.detail.controller.js';

/* pickup components */
import InventoryFilter from './pickup/components/inventory-filter/inventory-filter.component';
import ActualInventoriesList from './pickup/components/actual-inventories-list/actual-inventories-list.component';
import OrderSource from './pickup/components/order-source/order-source.component';


/* Delivery */
/* delivery controllers */
import OrderDeliveryDetailController from './delivery/controllers/order.delivery.detail.controller.js';
import InventoryPhotoModalController from './delivery/controllers/modal/inventory.photo.modal.controller.js';
import OrderDeliveryCreationController from './delivery/controllers/order.delivery.creation.controller.js';

/* delivery components */
import AvailableInventoriesList from './delivery/components/available-inventories-list/available-inventories-list.component';
import DeliveryItemsList from './delivery/components/delivery-items-list/delivery-items-list.component';
import InventoryHeaderComponent from './delivery/components/inventory-header-component/inventory-header-component.component';


angular
  .module('closetboxAdmin.orders', [])
  .controller('OrdersController', OrdersController)
  .component('cbAvailableOrdersFilter', AvailableOrdersFilter)
  .component('cbAssignmentsFilter', AssignmentsFilter)
  .component('cbOrdersTable', OrdersTable)
  .component('cbOrderDetailView', OrderDetailView)
  .component('cbCustomerOrders', CustomerOrders)
  .component('cbDispositionHeaderButtons', DispositionHeaderButtons)
  .component('cbCustomerInventoryView', CustomerInventoryView)
  .service('OrdersHelperService', OrdersHelperService)
  .controller('OrderPickupCreationController', OrderPickupCreationController)
  .controller('OrderPickupDetailController', OrderPickupDetailController)
  .controller('OrderDeliveryDetailController', OrderDeliveryDetailController)
  .controller('InventoryPhotoModalController', InventoryPhotoModalController)
  .controller('OrderDeliveryCreationController', OrderDeliveryCreationController)
  .service('SharedOrderService', SharedOrderService)
  .service('SharedOrderHelperService', SharedOrderHelperService)
  .component('cbSpacePriceDisplay', SpacePriceDisplay)
  .component('cbItemPriceDisplay', ItemPriceDisplay)
  .component('cbZipcodeLookup', ZipcodeLookup)
  .component('cbCustomerEmailLookup', CustomerEmailLookup)
  .component('cbActualInventoriesList', ActualInventoriesList)
  .component('cbInventoryFilter', InventoryFilter)
  .component('cbCustomerOrderAccountInfo', CustomerOrderAccountInfo)
  .component('cbInsuranceCoverage', InsuranceCoverage)
  .component('cbRequestedPickup', RequestedPickup)
  .component('cbAdditionalInsurance', AdditionalInsurance)
  .component('cbOrderParameterAdditions', OrderParameterAdditions)
  .component('cbPaymentMethod', PaymentMethod)
  .component('cbDiscountCode', DiscountCode)
  .component('cbCustomerDropoffPickup', CustomerDropoffPickup)
  .component('cbDefaultPaymentMethod', DefaultPaymentMethod)
  .component('cbAddPaymentMethod', AddPaymentMethod)
  .component('cbPaymentMethodSelection', PaymentMethodSelection)
  .component('cbOrderSource', OrderSource)
  .component('cbAvailableInventoriesList', AvailableInventoriesList)
  .component('cbDeliveryItemsList', DeliveryItemsList)
  .component('cbInventoryHeaderComponent', InventoryHeaderComponent)
  .component('cbInventoryToCapacityDisplay', InventoryToCapacityDisplay)
  .component('cbCurrentlyStoredItemCount', CurrentlyStoredItemCount)
  .component('cbSubscriptionSummary', SubscriptionSummary)
  .component('cbJumpToInventory', JumpToInventory)
  .component('cbTransactionTypeSelect', TransactionTypeSelect)
  .component('cbOrderRequestedDatesPicker', OrderRequestedDatesPicker)
  .component('cbOrderNotes', OrderNotes)
  .component('cbOrderEvents', OrderEvents)
  .component('cbOrderInventories', OrderInventories)
  .component('cbOrderBillingTable', OrderBillingTable)
  .component('cbOrderPayment', OrderPayment)
  .component('cbAssignOrder', AssignOrder)
    .component('cbOrderTitle', OrderTitle)
  .config(OrdersConfig);
