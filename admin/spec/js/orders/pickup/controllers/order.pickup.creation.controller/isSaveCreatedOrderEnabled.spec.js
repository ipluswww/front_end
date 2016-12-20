import OrderPickupCreationController from '../../../../../../app/js/orders/pickup/controllers/order.pickup.creation.controller.js';
import PickupOrderModel from '../../../../../../app/js/abstract/model/pickup-order.js';

describe('OrderPickupCreationController', () => {
    let controller, form;
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
            'isSpacePrice', 'hasItemPriceSelection', 'hasValidPricePlanSelection','isPickup']);
        Payment = jasmine.createSpyObj('Payment', ['isDefaultPaymentMethodExpired']);
        spaceEstimators = [];
        currentlyStoredInventory= [];
        OrdersAddressService = jasmine.createSpyObj('OrdersAddressService', ['copyAddressForCustomerItemsToCustomer']);
        controller = new OrderPickupCreationController($state, order, SharedOrderHelperService, SharedOrderService,
            AlertService, AppConstants, OrdersValidationService, spaceEstimators,
            currentlyStoredInventory, OrdersAddressService, OrdersCustomerService,
            customer, warehouseLocations, Payment, $rootScope, AlertDialog, backParam,
            customerPaymentHoldOrders);
        form = {};
        controller.form = form;
    });

    describe('isSaveCreatedOrderEnabled', ()=>{
        describe('when form is valid', ()=>{
            beforeEach(()=>{
                form.$valid = true;
                OrdersValidationService.isSpacePrice.and.returnValue(true);
                OrdersValidationService.hasItemPriceSelection.and.returnValue(true);
            });
            describe('and OrdersValidationService.canOrderBeSavedToCreatedDisposition returns true',
            ()=>{
                beforeEach(()=>{
                    OrdersValidationService.canOrderBeSavedToCreatedDisposition.and.returnValue(true);
                });
                describe('and OrdersValidationService.doesOrderHaveEditableDisposition returns true',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.doesOrderHaveEditableDisposition.and.returnValue(true);
                    });
                    it('returns true', ()=>{
                        expect(controller.isSaveCreatedOrderEnabled()).toBeTruthy();
                    })
                });
                describe('and OrdersValidationService.doesOrderHaveEditableDisposition returns false',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.doesOrderHaveEditableDisposition.and.returnValue(false);
                    });
                    it('returns false', ()=>{
                        expect(controller.isSaveCreatedOrderEnabled()).toBeFalsy();
                    })
                });
            });
            describe('and OrdersValidationService.canOrderBeSavedToCreatedDisposition returns false',
            ()=>{
                beforeEach(()=>{
                    OrdersValidationService.canOrderBeSavedToCreatedDisposition.and.returnValue(false);
                });
                describe('and OrdersValidationService.doesOrderHaveEditableDisposition returns true',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.doesOrderHaveEditableDisposition.and.returnValue(true);
                    });
                    it('returns false', ()=>{
                        expect(controller.isSaveCreatedOrderEnabled()).toBeFalsy();
                    })
                });
                describe('and OrdersValidationService.doesOrderHaveEditableDisposition returns false',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.doesOrderHaveEditableDisposition.and.returnValue(false);
                    });
                    it('returns false', ()=>{
                        expect(controller.isSaveCreatedOrderEnabled()).toBeFalsy();
                    })
                });
            });
        })
        describe('when form is invalid', ()=>{
            beforeEach(()=>{
                form.$valid = false;
    });
            describe('and OrdersValidationService.canOrderBeSavedToCreatedDisposition returns true',
            ()=>{
                beforeEach(()=>{
                    OrdersValidationService.canOrderBeSavedToCreatedDisposition.and.returnValue(true);
                });
                describe('and OrdersValidationService.doesOrderHaveEditableDisposition returns true',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.doesOrderHaveEditableDisposition.and.returnValue(true);
                    });
                    it('returns false', ()=>{
                        expect(controller.isSaveCreatedOrderEnabled()).toBeFalsy();
                    })
                });
                describe('and OrdersValidationService.doesOrderHaveEditableDisposition returns false',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.doesOrderHaveEditableDisposition.and.returnValue(false);
                    });
                    it('returns false', ()=>{
                        expect(controller.isSaveCreatedOrderEnabled()).toBeFalsy();
                    })
                });
            });
            describe('and OrdersValidationService.canOrderBeSavedToCreatedDisposition returns false',
            ()=>{
                beforeEach(()=>{
                    OrdersValidationService.canOrderBeSavedToCreatedDisposition.and.returnValue(false);
                });
                describe('and OrdersValidationService.doesOrderHaveEditableDisposition returns true',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.doesOrderHaveEditableDisposition.and.returnValue(true);
                    });
                    it('returns false', ()=>{
                        expect(controller.isSaveCreatedOrderEnabled()).toBeFalsy();
                    })
                });
                describe('and OrdersValidationService.doesOrderHaveEditableDisposition returns false',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.doesOrderHaveEditableDisposition.and.returnValue(false);
                    });
                    it('returns false', ()=>{
                        expect(controller.isSaveCreatedOrderEnabled()).toBeFalsy();
                    })
                });
            });
        })
    });
});
