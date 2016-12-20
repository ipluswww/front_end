import OrderPickupDetailController from '../../../../../../app/js/orders/pickup/controllers/order.pickup.detail.controller.js';
import PickupOrderModel from '../../../../../../app/js/abstract/model/pickup-order.js';
import DeliveryOrderModel from '../../../../../../app/js/abstract/model/delivery-order.js';
import AppConstants from '../../../../../../app/js/config/app.constants.js';

describe('OrderPickupDetailController', () => {
    let controller;
    let $Order, SharedOrderService, AppConstants,
        $state, order, AlertService, spaceEstimators,
        Pricing, OrdersValidationService, currentlyStoredInventory,
        Market, SubMarket, Container, SharedOrderHelperService,
        OrdersAddressService, StoredInventoryService, customer, form,
        OrdersCustomerService;

    beforeEach(()=>{
        $state = jasmine.createSpyObj('$state', ['go']);
        order = new PickupOrderModel();
        customer = {};
        SharedOrderHelperService = jasmine.createSpyObj('SharedOrderHelperService', ['saveOrder']);
        SharedOrderService = jasmine.createSpyObj('SharedOrderService', ['setOrder', 'getOrder']);
        AlertService = jasmine.createSpyObj('AlertService', ['error', 'success']);
        AppConstants = jasmine.createSpyObj('AppConstants', ['saveOrder']);
        StoredInventoryService = jasmine.createSpyObj('StoredInventoryService',
            ['setInventoryIndexAndQtyOnItems']);
        OrdersValidationService = jasmine.createSpyObj('OrdersValidationService',
            ['canOrderBeSavedToCreatedDisposition', 'doesOrderHaveEditableDisposition',
            'hasValidZipCodeAndMarket', 'hasExistingCustomer', 'isItemPrice', 'hasItemPriceSelection',
            'isSpacePrice', 'hasSpacePriceSelection', 'hasMetMinimumInventoryRequirements', 'hasStorageUnit',
            'hasCustomerEmail', 'hasManuallySelectedPrice', 'hasValidPricePlanSelection']);
        OrdersCustomerService = jasmine.createSpyObj('OrdersCustomerService',
            ['setCustomerOnOrderIfNotExists']);
        spaceEstimators = [];
        currentlyStoredInventory= [];
        OrdersAddressService = jasmine.createSpyObj('OrdersAddressService', ['copyAddressForCustomerItemsToCustomer']);
        controller = new OrderPickupDetailController($Order, SharedOrderService, AppConstants,
            $state, order, AlertService, spaceEstimators,
            Pricing, OrdersValidationService, currentlyStoredInventory,
            Market, SubMarket, Container, SharedOrderHelperService,
            OrdersAddressService, StoredInventoryService, customer, OrdersCustomerService);
        form = {};
        controller.form = form;
        controller.order = order;
    });

    describe('selectPricePlanOption()', ()=>{
        beforeEach(()=>{
            order.hasManuallySelectedPrice = false;
        });
        describe('when controller.isLocked returns false', ()=>{
            beforeEach(()=>{
                controller.isLocked = ()=>{ return false};
            });
            describe('and order.hasManuallySelectedPrice is undefined', ()=>{
                beforeEach(()=>{
                    delete order.hasManuallySelectedPrice;
                });
                describe('and OrdersValidationService.isSpacePrice returns true', ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.isSpacePrice.and.returnValue(true);
                        order.spacePrice = true;
                    });
                    describe('and Method selectPricePlanOption() was called with value true', ()=>{
                        beforeEach(()=>{
                            controller.selectPricePlanOption(true);
                        });
                        it('order.hasManuallySelectedPrice returns true', ()=>{
                            expect(order.hasManuallySelectedPrice).toBeTruthy();
                        });
                        it('order.spacePrice returns true', ()=>{
                            expect(order.spacePrice).toBeTruthy();
                        });
                    });
                    describe('and Method selectPricePlanOption() was called with value false', ()=>{
                        beforeEach(()=>{
                            controller.selectPricePlanOption(false);
                        });
                        it('order.hasManuallySelectedPrice returns true', ()=>{
                            expect(order.hasManuallySelectedPrice).toBeTruthy();
                        });
                        it('order.spacePrice returns false', ()=>{
                            expect(order.spacePrice).toBeFalsy();
                        });
                    });
                });
                describe('and OrdersValidationService.isSpacePrice returns false', ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.isSpacePrice.and.returnValue(false);
                        order.spacePrice = false;
                    });
                    describe('and Method selectPricePlanOption() was called with value true', ()=>{
                        beforeEach(()=>{
                            controller.selectPricePlanOption(true);
                        });
                        it('order.hasManuallySelectedPrice returns true', ()=>{
                            expect(order.hasManuallySelectedPrice).toBeTruthy();
                        });
                        it('order.spacePrice returns true', ()=>{
                            expect(order.spacePrice).toBeTruthy();
                        });
                    });
                    describe('and Method selectPricePlanOption() was called with value false', ()=>{
                        beforeEach(()=>{
                            controller.selectPricePlanOption(false);
                        });
                        it('order.hasManuallySelectedPrice returns true', ()=>{
                            expect(order.hasManuallySelectedPrice).toBeTruthy();
                        });
                        it('order.spacePrice returns false', ()=>{
                            expect(order.spacePrice).toBeFalsy();
                        });
                    });
                });

            });
            describe('and order.hasManuallySelectedPrice is false', ()=>{
                beforeEach(()=>{
                    order.hasManuallySelectedPrice = false;
                });
                describe('and OrdersValidationService.isSpacePrice returns true', ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.isSpacePrice.and.returnValue(true);
                        order.spacePrice = true;
                    });
                    describe('and Method selectPricePlanOption() was called with value true', ()=>{
                        beforeEach(()=>{
                            controller.selectPricePlanOption(true);
                        });
                        it('order.hasManuallySelectedPrice returns true', ()=>{
                            expect(order.hasManuallySelectedPrice).toBeTruthy();
                        });
                        it('order.spacePrice returns true', ()=>{
                            expect(order.spacePrice).toBeTruthy();
                        });
                    });
                    describe('and Method selectPricePlanOption() was called with value false', ()=>{
                        beforeEach(()=>{
                            controller.selectPricePlanOption(false);
                        });
                        it('order.hasManuallySelectedPrice returns true', ()=>{
                            expect(order.hasManuallySelectedPrice).toBeTruthy();
                        });
                        it('order.spacePrice returns false', ()=>{
                            expect(order.spacePrice).toBeFalsy();
                        });
                    });

                });
                describe('and OrdersValidationService.isSpacePrice returns false', ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.isSpacePrice.and.returnValue(false);
                        order.spacePrice = false;
                    });
                    describe('and Method selectPricePlanOption() was called with value true', ()=>{
                        beforeEach(()=>{
                            controller.selectPricePlanOption(true);
                        });
                        it('order.hasManuallySelectedPrice returns true', ()=>{
                            expect(order.hasManuallySelectedPrice).toBeTruthy();
                        });
                        it('order.spacePrice returns true', ()=>{
                            expect(order.spacePrice).toBeTruthy();
                        });
                    });
                    describe('and Method selectPricePlanOption() was called with value false', ()=>{
                        beforeEach(()=>{
                            controller.selectPricePlanOption(false);
                        });
                        it('order.hasManuallySelectedPrice returns true', ()=>{
                            expect(order.hasManuallySelectedPrice).toBeTruthy();
                        });
                        it('order.spacePrice returns false', ()=>{
                            expect(order.spacePrice).toBeFalsy();
                        });
                    });
                });
            });
            describe('and order.hasManuallySelectedPrice is true', ()=>{
                beforeEach(()=>{
                    order.hasManuallySelectedPrice = true;
                });
                describe('and OrdersValidationService.isSpacePrice returns true', ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.isSpacePrice.and.returnValue(true);
                        order.spacePrice = true;
                    });
                    describe('and Method selectPricePlanOption() was called with value true', ()=>{
                        beforeEach(()=>{
                            controller.selectPricePlanOption(true);
                        });
                        it('order.hasManuallySelectedPrice returns true', ()=>{
                            expect(order.hasManuallySelectedPrice).toBeTruthy();
                        });
                        it('order.spacePrice returns true', ()=>{
                            expect(order.spacePrice).toBeTruthy();
                        });
                    });
                    describe('and Method selectPricePlanOption() was called with value false', ()=>{
                        beforeEach(()=>{
                            controller.selectPricePlanOption(false);
                        });
                        it('order.hasManuallySelectedPrice returns true', ()=>{
                            expect(order.hasManuallySelectedPrice).toBeTruthy();
                        });
                        it('order.spacePrice returns false', ()=>{
                            expect(order.spacePrice).toBeFalsy();
                        });
                    });
                });
                describe('and OrdersValidationService.isSpacePrice returns false', ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.isSpacePrice.and.returnValue(false);
                        order.spacePrice = false;
                    });
                    describe('and Method selectPricePlanOption() was called with value true', ()=>{
                        beforeEach(()=>{
                            controller.selectPricePlanOption(true);
                        });
                        it('order.hasManuallySelectedPrice returns true', ()=>{
                            expect(order.hasManuallySelectedPrice).toBeTruthy();
                        });
                        it('order.spacePrice returns true', ()=>{
                            expect(order.spacePrice).toBeTruthy();
                        });
                    });
                    describe('and Method selectPricePlanOption() was called with value false', ()=>{
                        beforeEach(()=>{
                            controller.selectPricePlanOption(false);
                        });
                        it('order.hasManuallySelectedPrice returns true', ()=>{
                            expect(order.hasManuallySelectedPrice).toBeTruthy();
                        });
                        it('order.spacePrice returns false', ()=>{
                            expect(order.spacePrice).toBeFalsy();
                        });
                    });
                });
            });
        });
        describe('when controller.isLocked returns true', ()=>{
            beforeEach(()=>{
                controller.isLocked = ()=>{ return true};
            });
            describe('and OrdersValidationService.isSpacePrice returns true', ()=>{
                beforeEach(()=>{
                    OrdersValidationService.isSpacePrice.and.returnValue(true);
                    order.spacePrice = true;
                    controller.selectPricePlanOption(false);
                });
                it('order.hasManuallySelectedPrice returns false', ()=>{
                    expect(order.hasManuallySelectedPrice).toBeFalsy();
                });
                it('order.spacePrice returns true', ()=>{
                    expect(order.spacePrice).toBeTruthy();
                });
            });
            describe('and OrdersValidationService.isSpacePrice returns false', ()=>{
                beforeEach(()=>{
                    OrdersValidationService.isSpacePrice.and.returnValue(false);
                    order.spacePrice = false;
                    controller.selectPricePlanOption(true);
                });
                it('order.hasManuallySelectedPrice returns false', ()=>{
                    expect(order.hasManuallySelectedPrice).toBeFalsy();
                });
                it('order.spacePrice returns false', ()=>{
                    expect(order.spacePrice).toBeFalsy();
                });
            });
        });
    });
});
