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
            'hasCustomerEmail', 'hasManuallySelectedPrice', 'hasValidPricePlanSelection',
            'hasValidPricePlanSelection']);
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

    describe('isOrderValidForCreateStep', ()=>{
        beforeEach(()=>{
            OrdersValidationService.hasStorageUnit.and.returnValue(true);
            OrdersValidationService.hasCustomerEmail.and.returnValue(true);
            OrdersValidationService.canOrderBeSavedToCreatedDisposition.and.returnValue(true);
            OrdersValidationService.hasValidZipCodeAndMarket.and.returnValue(true);
            OrdersValidationService.isItemPrice.and.returnValue(true);
            OrdersValidationService.hasItemPriceSelection.and.returnValue(true);
            OrdersValidationService.isSpacePrice.and.returnValue(true);
            OrdersValidationService.hasSpacePriceSelection.and.returnValue(true);
            OrdersValidationService.hasMetMinimumInventoryRequirements.and.returnValue(true);
            OrdersValidationService.hasManuallySelectedPrice.and.returnValue(false);
            OrdersValidationService.hasValidPricePlanSelection.and.returnValue(true);
        });

        describe('and OrdersValidationService.hasValidZipCodeAndMarket is true',
        ()=>{
            beforeEach(()=>{
                OrdersValidationService.hasValidZipCodeAndMarket.and.returnValue(true);
            });
            describe('and OrdersValidationService.hasMetMinimumInventoryRequirements is true',
            ()=>{
                beforeEach(()=>{
                    OrdersValidationService.hasMetMinimumInventoryRequirements.and.returnValue(true);
                });
                describe('and OrdersValidationService.hasValidPricePlanSelection is true',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.hasValidPricePlanSelection.and.returnValue(true);
                    });
                    it('returns true', ()=>{
                        expect(controller.isOrderValidForCreateStep()).toBeTruthy();
                    })

                });
                describe('and OrdersValidationService.hasValidPricePlanSelection is false',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.hasValidPricePlanSelection.and.returnValue(false);
                    });
                    it('returns false', ()=>{
                        expect(controller.isOrderValidForCreateStep()).toBeFalsy();
                    })

                });

            });
            describe('and OrdersValidationService.hasMetMinimumInventoryRequirements is false',
            ()=>{
                beforeEach(()=>{
                    OrdersValidationService.hasMetMinimumInventoryRequirements.and.returnValue(false);
                });
                describe('and OrdersValidationService.hasValidPricePlanSelection is true',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.hasValidPricePlanSelection.and.returnValue(true);
                    });
                    it('returns false', ()=>{
                        expect(controller.isOrderValidForCreateStep()).toBeFalsy();
                    })

                });
                describe('and OrdersValidationService.hasValidPricePlanSelection is false',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.hasValidPricePlanSelection.and.returnValue(false);
                    });
                    it('returns false', ()=>{
                        expect(controller.isOrderValidForCreateStep()).toBeFalsy();
                    })

                });
            });
        });
        describe('and OrdersValidationService.hasValidZipCodeAndMarket is false',
        ()=>{
            beforeEach(()=>{
                OrdersValidationService.hasValidZipCodeAndMarket.and.returnValue(false);
            });
            describe('and OrdersValidationService.hasMetMinimumInventoryRequirements is true',
            ()=>{
                beforeEach(()=>{
                    OrdersValidationService.hasMetMinimumInventoryRequirements.and.returnValue(true);
                });
                describe('and OrdersValidationService.hasValidPricePlanSelection is true',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.hasValidPricePlanSelection.and.returnValue(true);
                    });
                    it('returns false', ()=>{
                        expect(controller.isOrderValidForCreateStep()).toBeFalsy();
                    })

                });
                describe('and OrdersValidationService.hasValidPricePlanSelection is false',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.hasValidPricePlanSelection.and.returnValue(false);
                    });
                    it('returns false', ()=>{
                        expect(controller.isOrderValidForCreateStep()).toBeFalsy();
                    })

                });

            });
            describe('and OrdersValidationService.hasMetMinimumInventoryRequirements is false',
            ()=>{
                beforeEach(()=>{
                    OrdersValidationService.hasMetMinimumInventoryRequirements.and.returnValue(false);
                });
                describe('and OrdersValidationService.isSpacePrice is true',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.isSpacePrice.and.returnValue(true);
                    });
                    describe('and OrdersValidationService.hasStorageUnit is true',
                    ()=>{
                        beforeEach(()=>{
                            OrdersValidationService.hasStorageUnit.and.returnValue(true);
                        });
                        describe('and OrdersValidationService.hasSpacePriceSelection is true',
                        ()=>{
                            beforeEach(()=>{
                                OrdersValidationService.hasSpacePriceSelection.and.returnValue(true);
                            });
                            it('should return false', ()=>{
                                expect(controller.isOrderValidForCreateStep(order)).toBeFalsy();
                            });
                        });
                        describe('and OrdersValidationService.hasSpacePriceSelection is false',
                        ()=>{
                            beforeEach(()=>{
                                OrdersValidationService.hasSpacePriceSelection.and.returnValue(false);
                            });
                            it('should return false', ()=>{
                                expect(controller.isOrderValidForCreateStep(order)).toBeFalsy();
                            });
                        });
                    });
                    describe('and OrdersValidationService.isSpacePrice is false',
                    ()=>{
                        beforeEach(()=>{
                            OrdersValidationService.isSpacePrice.and.returnValue(false);
                        });
                        describe('and OrdersValidationService.hasStorageUnit is true',
                        ()=>{
                            beforeEach(()=>{
                                OrdersValidationService.hasStorageUnit.and.returnValue(true);
                            });
                            describe('and OrdersValidationService.hasItemPriceSelection is true',
                            ()=>{
                                beforeEach(()=>{
                                    OrdersValidationService.hasItemPriceSelection.and.returnValue(true);
                                });
                                it('should return false', ()=>{
                                    expect(controller.isOrderValidForCreateStep(order)).toBeFalsy();
                                });
                            });
                            describe('and OrdersValidationService.hasItemPriceSelection is false',
                            ()=>{
                                beforeEach(()=>{
                                    OrdersValidationService.hasItemPriceSelection.and.returnValue(false);
                                });
                                it('should return false', ()=>{
                                    expect(controller.isOrderValidForCreateStep(order)).toBeFalsy();
                                });
                            });
                        });
                    });
                });
                describe('and OrdersValidationService.isSpacePrice is false',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.isSpacePrice.and.returnValue(false);
                    });
                    describe('and OrdersValidationService.hasItemPriceSelection is true',
                    ()=>{
                        beforeEach(()=>{
                            OrdersValidationService.hasItemPriceSelection.and.returnValue(true);
                        });
                        it('should return false', ()=>{
                            expect(controller.isOrderValidForCreateStep(order)).toBeFalsy();
                        });
                    });
                    describe('and OrdersValidationService.hasItemPriceSelection is false',
                    ()=>{
                        beforeEach(()=>{
                            OrdersValidationService.hasItemPriceSelection.and.returnValue(false);
                        });
                        it('should return false', ()=>{
                            expect(controller.isOrderValidForCreateStep(order)).toBeFalsy();
                        });
                    });
                });

            });
        });
    });
});
