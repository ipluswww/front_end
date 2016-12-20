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

    describe('onDiscountUpdated', ()=>{
        beforeEach(()=>{
            $event = {discount: {}};
            spyOn(OrderPickupCreationController.prototype, 'updateSpacePrice');
            spyOn(OrderPickupCreationController.prototype, 'updateItemPrice');
            order = new PickupOrderModel();
            controller = new OrderPickupCreationController($state, order, SharedOrderHelperService, SharedOrderService,
                AlertService, AppConstants, OrdersValidationService, spaceEstimators,
                currentlyStoredInventory, OrdersAddressService, OrdersCustomerService,
                customer, warehouseLocations, Payment, $rootScope, AlertDialog, backParam,
                customerPaymentHoldOrders);
            form = {};
            controller.form = form;
            controller.onDiscountUpdated($event);
        });
        it('updateItemPrice is called',()=>{
            expect(OrderPickupCreationController.prototype.updateItemPrice).toHaveBeenCalled();
        });
        it('updateSpacePrice is called',()=>{
            expect(OrderPickupCreationController.prototype.updateSpacePrice).toHaveBeenCalled();
        });
        describe('if discount from event is null',()=>{
            beforeEach(()=>{
                $event = {discount:null};
                let existingDiscount = {_id:'XYZ', code:'ABC'};
                controller.order.customer.discountsApplied = [];
                controller.order.discount = null;
                controller.order.discountCode = null;
                controller.order.customer.discountsApplied = [existingDiscount];
                controller.order.discount = existingDiscount;
                controller.order.discountCode = existingDiscount.code;
                controller.onDiscountUpdated($event);
            });
            it('discounts in discountsApplied for customer are cleared',()=>{
                expect(controller.order.customer.discountsApplied.length).toEqual(0);
            });
            it('discount on order is set to null',()=>{
                expect(controller.order.discount).toBeNull();
            });
            it('discountCode on order is set to null',()=>{
                expect(controller.order.discountCode).toBeNull();
            });
        });
        describe('if discount from event is not null',()=>{
            let newDiscount;
            beforeEach(()=>{
                controller.order.customer.discountsApplied = [];
                controller.order.discount = null;
                controller.order.discountCode = null;
                newDiscount = {_id:'XYZ', code:'ABC'};
                $event = {discount:newDiscount};
                controller.onDiscountUpdated($event);
            });
            it('discounts in discountsApplied for customer are set to 1',()=>{
                expect(controller.order.customer.discountsApplied.length).toEqual(1);
            });
            it('discount on order is set to discount',()=>{
                expect(controller.order.discount).toEqual(newDiscount);
            });
            it('discountCode on order is set to code on the discount',()=>{
                expect(controller.order.discountCode).toEqual(newDiscount.code);
            });
        });
    });
});
