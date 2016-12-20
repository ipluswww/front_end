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

    describe('autoAssignSpaceOrItemPriceSelection', ()=>{
        beforeEach(()=>{
            OrdersValidationService.isSpacePrice.and.returnValue(true);
            OrdersValidationService.hasItemPriceSelection.and.returnValue(true);
            OrdersValidationService.hasSpacePriceSelection.and.returnValue(true);
            OrdersValidationService.hasStorageUnit.and.returnValue(true);
            controller.order.spacePriceSelection.price = 1;
            controller.order.itemPriceSelection.price = 2;
        });
        describe('when OrdersValidationService.hasManuallySelectedPrice is false', ()=>{
            beforeEach(()=>{
                OrdersValidationService.hasManuallySelectedPrice.and.returnValue(false);
            });
            describe('and OrdersValidationService.isSpacePrice is true',
            ()=>{
                beforeEach(()=>{
                    order.spacePrice = true;
                    OrdersValidationService.isSpacePrice.and.returnValue(true);
                });
                describe('and OrdersValidationService.hasItemPriceSelection is true',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.hasItemPriceSelection.and.returnValue(true);
                    });
                    describe('and OrdersValidationService.hasSpacePriceSelection is true',
                    ()=>{
                        beforeEach(()=>{
                            OrdersValidationService.hasSpacePriceSelection.and.returnValue(true);
                        });
                        describe('and itemPrice is zero',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=0;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                        });
                        describe('and itemPrice is one',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=1;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                        });
                    });
                });
                describe('and OrdersValidationService.hasItemPriceSelection is false',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.hasItemPriceSelection.and.returnValue(false);
                    });
                    describe('and OrdersValidationService.hasSpacePriceSelection is true',
                    ()=>{
                        beforeEach(()=>{
                            OrdersValidationService.hasSpacePriceSelection.and.returnValue(true);
                        });
                        describe('and itemPrice is zero',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=0;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                        });
                        describe('and itemPrice is one',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=1;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                        });
                    });
                });
            });
            describe('and OrdersValidationService.isSpacePrice is false',
            ()=>{
                beforeEach(()=>{
                    order.spacePrice = false;
                    OrdersValidationService.isSpacePrice.and.returnValue(false);
                });
                describe('and OrdersValidationService.hasItemPriceSelection is true',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.hasItemPriceSelection.and.returnValue(true);
                    });
                    describe('and OrdersValidationService.hasSpacePriceSelection is true',
                    ()=>{
                        beforeEach(()=>{
                            OrdersValidationService.hasSpacePriceSelection.and.returnValue(true);
                        });
                        describe('and itemPrice is zero',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=0;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should have not space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should not have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                        });
                        describe('and itemPrice is one',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=1;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should have not space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should not have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                        });
                    });
                });
                describe('and OrdersValidationService.hasItemPriceSelection is false',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.hasItemPriceSelection.and.returnValue(false);
                    });
                    describe('and OrdersValidationService.hasSpacePriceSelection is true',
                    ()=>{
                        beforeEach(()=>{
                            OrdersValidationService.hasSpacePriceSelection.and.returnValue(true);
                        });
                        describe('and itemPrice is zero',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=0;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should not have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should not have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                        });
                        describe('and itemPrice is one',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=1;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should not have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should not have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                        });
                    });
                });
            });
        });
        describe('when OrdersValidationService.hasManuallySelectedPrice is true', ()=>{
            beforeEach(()=>{
                OrdersValidationService.hasManuallySelectedPrice.and.returnValue(true);
            });
            describe('and OrdersValidationService.isSpacePrice is true',
            ()=>{
                beforeEach(()=>{
                    order.spacePrice = true;
                    OrdersValidationService.isSpacePrice.and.returnValue(true);
                });
                describe('and OrdersValidationService.hasItemPriceSelection is true',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.hasItemPriceSelection.and.returnValue(true);
                    });
                    describe('and OrdersValidationService.hasSpacePriceSelection is true',
                    ()=>{
                        beforeEach(()=>{
                            OrdersValidationService.hasSpacePriceSelection.and.returnValue(true);
                        });
                        describe('and itemPrice is zero',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=0;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                        });
                        describe('and itemPrice is one',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=1;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                        });
                    });
                });
                describe('and OrdersValidationService.hasItemPriceSelection is false',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.hasItemPriceSelection.and.returnValue(false);
                    });
                    describe('and OrdersValidationService.hasSpacePriceSelection is true',
                    ()=>{
                        beforeEach(()=>{
                            OrdersValidationService.hasSpacePriceSelection.and.returnValue(true);
                        });
                        describe('and itemPrice is zero',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=0;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                        });
                        describe('and itemPrice is one',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=1;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeTruthy();
                                });
                            });
                        });
                    });
                });
            });
            describe('and OrdersValidationService.isSpacePrice is false',
            ()=>{
                beforeEach(()=>{
                    order.spacePrice = false;
                    OrdersValidationService.isSpacePrice.and.returnValue(false);
                });
                describe('and OrdersValidationService.hasItemPriceSelection is true',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.hasItemPriceSelection.and.returnValue(true);
                    });
                    describe('and OrdersValidationService.hasSpacePriceSelection is true',
                    ()=>{
                        beforeEach(()=>{
                            OrdersValidationService.hasSpacePriceSelection.and.returnValue(true);
                        });
                        describe('and itemPrice is zero',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=0;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should not have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should have not space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                        });
                        describe('and itemPrice is one',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=1;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should have not space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should not have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                        });
                    });
                });
                describe('and OrdersValidationService.hasItemPriceSelection is false',
                ()=>{
                    beforeEach(()=>{
                        OrdersValidationService.hasItemPriceSelection.and.returnValue(false);
                    });
                    describe('and OrdersValidationService.hasSpacePriceSelection is true',
                    ()=>{
                        beforeEach(()=>{
                            OrdersValidationService.hasSpacePriceSelection.and.returnValue(true);
                        });
                        describe('and itemPrice is zero',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=0;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should not have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should not have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                        });
                        describe('and itemPrice is one',
                        ()=>{
                            beforeEach(()=>{
                                order.itemPriceSelection.price=1;
                            });
                            describe('and spacePrice is zero',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=0;
                                });
                                it('order should not have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                            describe('and spacePrice is one',
                            ()=>{
                                beforeEach(()=>{
                                    order.spacePriceSelection.price=1;
                                });
                                it('order should not have space sprice selected', ()=>{
                                    controller.autoAssignSpaceOrItemPriceSelection(order);
                                    expect(order.spacePrice).toBeFalsy();
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
