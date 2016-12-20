import OrderPickupCreationController from '../../../../../../app/js/orders/pickup/controllers/order.pickup.creation.controller.js';
import PickupOrderModel from '../../../../../../app/js/abstract/model/pickup-order.js';

describe('OrderPickupCreationController', () => {
    let controller, form, $event;
    let $state, order, SharedOrderHelperService, SharedOrderService,
        AlertService, AppConstants, OrdersValidationService, spaceEstimators,
        currentlyStoredInventory, OrdersAddressService, OrdersCustomerService,
        customer, warehouseLocations, Payment, $rootScope, AlertDialog, backParam,
        customerPaymentHoldOrders;
    beforeEach(()=>{
        $state = jasmine.createSpyObj('$state', ['go']);
        order = new PickupOrderModel();
        SharedOrderHelperService = jasmine.createSpyObj('SharedOrderHelperService', ['saveOrder']);
        SharedOrderService = jasmine.createSpyObj('SharedOrderService', ['setOrder', 'getOrder']);
        AlertService = jasmine.createSpyObj('AlertService', ['error', 'success']);
        AppConstants = jasmine.createSpyObj('AppConstants', ['saveOrder']);
        OrdersValidationService = jasmine.createSpyObj('OrdersValidationService',
            ['hasSpacePriceSelection', 'canOrderBeSavedToCreatedDisposition', 'doesOrderHaveEditableDisposition',
                'isSpacePrice', 'hasItemPriceSelection', 'hasValidPricePlanSelection','isPickup',
            'hasValidZipCode', 'hasExistingCustomer']);
        Payment = jasmine.createSpyObj('Payment', ['isDefaultPaymentMethodExpired']);
        spaceEstimators = [];
        currentlyStoredInventory= [];
        OrdersAddressService = jasmine.createSpyObj('OrdersAddressService', ['copyAddressForCustomerItemsToCustomer']);
        OrdersCustomerService = jasmine.createSpyObj('OrdersCustomerService', ['setCustomerValuationFromCustomer']);
    });

    describe('onCustomerValuationUpdated', ()=>{
        beforeEach(()=>{
            $event = {customerValuation: 1000};
            spyOn(OrderPickupCreationController.prototype, 'updateSpacePrice');
            spyOn(OrderPickupCreationController.prototype, 'updateItemPrice');
            controller = new OrderPickupCreationController($state, order, SharedOrderHelperService, SharedOrderService,
                AlertService, AppConstants, OrdersValidationService, spaceEstimators,
                currentlyStoredInventory, OrdersAddressService, OrdersCustomerService,
                customer, warehouseLocations, Payment, $rootScope, AlertDialog, backParam,
                customerPaymentHoldOrders);
            form = {};
            controller.form = form;
            controller.onCustomerValuationUpdated($event);

        });
        it('customerValuation from event is placed on customer',()=>{
            expect(controller.order.customer.customerValuation).toEqual($event.customerValuation);
        });
        it('OrdersCustomerService.setCustomerValuationFromCustomer is called',()=>{
            expect(OrdersCustomerService.setCustomerValuationFromCustomer.calls.count()).toEqual(1);
        });
        it('updateItemPrice is called',()=>{
            expect(OrderPickupCreationController.prototype.updateItemPrice).toHaveBeenCalled();
        });
        it('updateSpacePrice is called',()=>{
            expect(OrderPickupCreationController.prototype.updateSpacePrice).toHaveBeenCalled();
        });

    });
});
